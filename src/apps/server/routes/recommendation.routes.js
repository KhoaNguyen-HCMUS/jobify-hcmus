const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendation.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');
const authorizeRoles = require('../middlewares/checkRole.middleware');

router.get( '/recommendations', authenticateToken, authorizeRoles(['candidate']), recommendationController.getRecommendedJobs );

module.exports = router;
