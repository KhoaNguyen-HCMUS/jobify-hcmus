const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile.controller');
const authenticateToken = require('../middlewares/auth.middleware');

router.get('/me', authenticateToken, profileController.getMyProfile);
router.put('/me', authenticateToken, profileController.updateMyProfile);

router.get('/company', authenticateToken, profileController.getCompanyProfiles);
router.put('/company', authenticateToken, profileController.updateCompanyProfile);

router.get('/:id', profileController.getProfileById);

module.exports = router;
