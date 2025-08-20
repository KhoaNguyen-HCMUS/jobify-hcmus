const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendation.controller');
const jobController = require('../controllers/job.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');
const authorizeRoles = require('../middlewares/checkRole.middleware');

router.post( '/generate', authenticateToken, authorizeRoles(['candidate']), recommendationController.generateJobMatchesForUser );

module.exports = router;
