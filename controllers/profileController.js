const User = require('../models/User');
const bcrypt = require('bcryptjs');


// exports.showProfile = (req, res) => {
//   console.log('User in session:', req.session.user);
//   res.render('profile.njk', { user: req.session.user });
// };


exports.updateProfile = async (req, res) => {
  // const { firstname, lastname, email, mobile } = req.body;

  // if (!firstname || !lastname || !email || !mobile) {
  //   return res.status(400).json({
  //     success: false,
  //     message: "Please provide all fields: firstname, lastname, email, mobile, country."
  //   });
  // }

  // const updatedUser = await User.findByIdAndUpdate(
  //   req.session.user._id,
  //   { firstname, lastname, email, mobile },
  //   { new: true }
  // );

  // Object.assign(req.session.user, {
  //   firstname,
  //   lastname,
  //   email,
  //   mobile,
  // });
  res.json({"message":"ok"});
  // res.json({
  //   success: true,
  //   message: "Profile updated successfully.",
  //   user: {
  //     _id: updatedUser._id,
  //     firstname: updatedUser.firstname,
  //     lastname: updatedUser.lastname,
  //     email: updatedUser.email,
  //     mobile: updatedUser.mobile,
  //   }
  // });
};



// exports.changePassword = async (req, res) => {
//   const { oldpass, newpass } = req.body;
//   const user = await User.findById(req.session.user._id);
//   if (await bcrypt.compare(oldpass, user.password)) {
//     user.password = await bcrypt.hash(newpass, 12);
//     await user.save();
//     res.redirect('/profile');
//   } else {
//     res.send('Incorrect old password');
//   }
// };
