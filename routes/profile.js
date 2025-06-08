const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const profileController = require('../controllers/profileController');

// router.get('/', auth, profileController.showProfile);
router.post('/update', auth, profileController.updateProfile);
// router.post('/changepass', auth, profileController.changePassword);

module.exports = router;
