const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { authenticateJWT } = require('../middlewares/auth');
const profileController = require('../controllers/profileController');

// router.get('/', auth, profileController.showProfile);
// router.get('/me', authenticateJWT, profileController.getProfile);
// router.post('/update', auth, profileController.updateProfile);
// router.post('/changepass', auth, profileController.changePassword);


module.exports = router;
