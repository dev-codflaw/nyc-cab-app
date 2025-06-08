const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateJWT } = require('../middlewares/auth');

router.get('/register', authController.showRegister);
router.post('/register', authController.register);

router.get('/login', authController.showLogin);
router.post('/login', authController.login);

router.get('/email', authController.showLogin);
router.post('/email', authController.login);

router.get('/mobile', authController.mobileLogin);
// router.post('/send-otp', authController.sendOTP);

router.get('/login-methods', authController.showLoginMethods);

router.get('/make-profile', (req, res) => {
  res.render('make-profile.njk');
});

router.get('/otp-login', (req, res) => {
  res.render('otp_login.njk');
});

router.post('/send-otp', authController.sendOtp);


router.post('/verify-otp', authController.verifyOtp);


router.get('/logout', authController.logout);

router.get('/forgot', authController.showForgot);
router.post('/forgot', authController.forgot);

router.get('/reset/:token', authController.showReset);
router.post('/reset/:token', authController.reset);

router.get('/profile', (req, res) => {
    res.json({"message":"ok"});
});

router.post('/profile', authenticateJWT, authController.updateProfile);



module.exports = router;
