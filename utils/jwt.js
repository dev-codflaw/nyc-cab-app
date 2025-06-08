const jwt = require('jsonwebtoken');

exports.generateToken = (user) => {
  return jwt.sign(
    { _id: user._id, mobile: user.mobile },
    process.env.JWT_SECRET,
    { expiresIn: '7d' } // adjust expiry as needed
  );
};

exports.verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
