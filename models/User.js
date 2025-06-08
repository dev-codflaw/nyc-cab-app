const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstname: { type:String },
  lastname: { type: String },
  password: { type: String },
  email: { type: String, unique: true, sparse: true },
  mobile: { type: String, unique: true, sparse: true },
  country: String,
  otp: String,
  otpExpires: Date,
  resetToken: String,
  resetTokenExpiry: Date,
  verified: { type: Boolean, default: false },
  status: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }

});

module.exports = mongoose.model('User', UserSchema);
