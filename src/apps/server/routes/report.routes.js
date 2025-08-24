const express = require('express');
const router = express.Router();
const reportController = require('../controllers/report.controller');
const authenticateToken = require('../middlewares/auth.middleware');
const authorizeRoles = require('../middlewares/checkRole.middleware');

router.post('/', authenticateToken, authorizeRoles(['candidate']), reportController.createReport);
router.get('/', authenticateToken, authorizeRoles(['admin', 'moderator']), reportController.getReports);
router.patch('/:id', authenticateToken, authorizeRoles(['admin', 'moderator']), reportController.updateReportStatus);

module.exports = router;
