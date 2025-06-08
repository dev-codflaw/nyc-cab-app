const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../middlewares/auth');
const profileController = require('../controllers/profileController');

router.get('/me', authenticateJWT, profileController.getProfile);
router.post('/update', authenticateJWT, profileController.updateProfile);
// router.post('/changepass', auth, profileController.changePassword);

module.exports = router;
