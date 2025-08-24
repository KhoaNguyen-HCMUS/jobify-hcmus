const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notification.controller');
const authenticateToken = require('../middlewares/auth.middleware');

router.get('/', authenticateToken, notificationController.getNotifications);

module.exports = router;
