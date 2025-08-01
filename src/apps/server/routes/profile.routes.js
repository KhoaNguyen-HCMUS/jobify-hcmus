const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile.controller');
const authenticateToken = require('../middlewares/auth.middleware');
const authorizeRoles = require('../middlewares/checkRole.middleware');

router.get('/candidate/me', authenticateToken, profileController.getMyProfile);
router.put('/candidate/me', authenticateToken, profileController.updateMyProfile);

router.get('/company/me', authenticateToken, profileController.getCompanyProfiles);
router.put('/company/me', authenticateToken, profileController.updateCompanyProfile);

router.get('/candidate/:id', authenticateToken, authorizeRoles(['admin', 'moderator', 'company']), profileController.getCandidateProfileById);
router.get('/company/:id', profileController.getCompanyProfileById);

module.exports = router;
