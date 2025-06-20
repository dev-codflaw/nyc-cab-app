const User = require('../models/User');
const bcrypt = require('bcryptjs');


exports.showProfile = (req, res) => {
  res.render('profile.njk', { user: req.session.user });
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).lean();
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.updateProfile = async (req, res) => {
  
  const { firstname, lastname, email, mobile } = req.body;

  if (!firstname || !lastname || !email || !mobile) {
    return res.status(400).json({
      success: false,
      message: 'Please provide all fields: firstname, lastname, email, mobile.'
    });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { firstname, lastname, email, mobile },
      { new: true }
    );

    res.json({
      success: true,
      message: 'Profile updated successfully.',
      user: {
        _id: updatedUser._id,
        firstname: updatedUser.firstname,
        lastname: updatedUser.lastname,
        email: updatedUser.email,
        mobile: updatedUser.mobile,
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error updating profile' });
  }
};



exports.changePassword = async (req, res) => {
  const { oldpass, newpass } = req.body;
  const user = await User.findById(req.session.user._id);
  if (await bcrypt.compare(oldpass, user.password)) {
    user.password = await bcrypt.hash(newpass, 12);
    await user.save();
    res.redirect('/profile');
  } else {
    res.send('Incorrect old password');
  }
};
