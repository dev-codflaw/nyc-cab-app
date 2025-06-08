const User = require('../models/User');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const twilio = require('twilio');
const { generateToken } = require('../utils/jwt');

// Twilio config (replace with your actual credentials)
const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);


exports.showRegister = (req, res) => {
  res.render('register.njk');
};

exports.register = async (req, res) => {
  const { email, password } = req.body;
  const hashed = await bcrypt.hash(password, 12);
  try {
    await User.create({ email, password: hashed });
    res.redirect('/auth/login');
  } catch (err) {
    res.send('Error: ' + err.message);
  }
};

exports.showLogin = (req, res) => {
  res.render('login.njk');
};

exports.showLoginMethods = (req, res) => {
  res.render('login-method.njk');
};

exports.mobileLogin = (req, res) => {
  res.render('login-mobile.njk');
};

exports.sendOTP = (req, res) => {
  console.log('OTP sent successfully');
  res.render('verify-otp.njk');
};



exports.sendOtp = async (req, res) => {
  const { mobile } = req.body;

  if (!mobile) {
    return res.status(400).json({ success: false, message: 'Mobile number required' });
  }

  // Find or create user
  let user = await User.findOne({ mobile });
  if (!user) user = new User({ mobile });

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  user.otp = otp;
  user.otpExpires = Date.now() + 300000; // 5 minutes
  await user.save();

  // Send OTP via Twilio
  try {
    await twilioClient.messages.create({
      body: `Your OTP is: ${otp}`,
      from: process.env.TWILIO_PHONE,
      to: mobile
    });

    res.json({ success: true, message: 'OTP sent' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
};



exports.verifyOtp = async (req, res) => {
  const { mobile, otp } = req.body;
  const user = await User.findOne({
    mobile,
    otp,
    otpExpires: { $gt: Date.now() }
  });

  if (!user) {
    return res.status(400).json({ success: false, message: 'Invalid or expired OTP.' });
  }

  // Clear OTP
  user.otp = undefined;
  user.otpExpires = undefined;
  await user.save();

  // Generate JWT
  const token = generateToken(user);

  res.json({
    success: true,
    message: 'OTP verified. Login successful.',
    token,
    user: {
      _id: user._id,
      mobile: user.mobile
    }
  });
};



exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && await bcrypt.compare(password, user.password)) {
    req.session.user = user;
    res.redirect('/profile');
  } else {
    res.send('Invalid credentials');
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};

exports.showForgot = (req, res) => {
  res.render('forgot.njk');
};

exports.forgot = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.send('No user found');

  const token = crypto.randomBytes(20).toString('hex');
  user.resetToken = token;
  user.resetTokenExpiry = Date.now() + 3600000; // 1 hour
  await user.save();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });

  const mailOptions = {
    to: user.email,
    from: process.env.EMAIL_USER,
    subject: 'Password Reset',
    text: `Click to reset: http://localhost:3000/auth/reset/${token}`,
  };

  await transporter.sendMail(mailOptions);
  res.send('Reset email sent');
};

exports.showReset = async (req, res) => {
  const user = await User.findOne({ resetToken: req.params.token, resetTokenExpiry: { $gt: Date.now() } });
  if (!user) return res.send('Invalid or expired token');
  res.render('reset.njk', { token: req.params.token });
};

exports.reset = async (req, res) => {
  const user = await User.findOne({ resetToken: req.params.token, resetTokenExpiry: { $gt: Date.now() } });
  if (!user) return res.send('Invalid or expired token');

  user.password = await bcrypt.hash(req.body.password, 12);
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;
  await user.save();

  res.redirect('/auth/login');
};

exports.updateProfile = async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({
      success: false,
      message: "Not authenticated. Please login first."
    });
  }

  const { firstname, lastname, email, mobile } = req.body;

  if (!firstname || !lastname || !email || !mobile ) {
    return res.status(400).json({
      success: false,
      message: "Please provide all fields: firstname, lastname, email, mobile."
    });
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.session.user._id,
    { firstname, lastname, email, mobile },
    { new: true }
  );

  Object.assign(req.session.user, {
    firstname,
    lastname,
    email,
    mobile,
  });

  res.json({
    success: true,
    message: "Profile updated successfully.",
    user: {
      _id: updatedUser._id,
      firstname: updatedUser.firstname,
      lastname: updatedUser.lastname,
      email: updatedUser.email,
      mobile: updatedUser.mobile,
    }
  });
};

