const express = require('express');
const router = express.Router();
const announcementController = require('../controllers/announcement.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');
const authorizeRoles = require('../middlewares/checkRole.middleware');

router.get('/', authenticateToken, announcementController.getAnnouncements);
router.post('/', authenticateToken, authorizeRoles(['admin']), announcementController.createAnnouncement);
router.get('/:id', authenticateToken, announcementController.getAnnouncementById);

module.exports = router;
