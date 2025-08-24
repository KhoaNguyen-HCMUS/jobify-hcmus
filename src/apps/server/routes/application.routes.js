const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/application.controller');
const authenticateToken = require('../middlewares/auth.middleware');
const authorizeRoles = require('../middlewares/checkRole.middleware');

router.get('/:id', authenticateToken, applicationController.getApplicationDetail);
router.patch('/:id/status', authenticateToken, authorizeRoles(['company']), applicationController.updateApplicationStatus);

module.exports = router;
