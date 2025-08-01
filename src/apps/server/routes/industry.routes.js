const express = require('express');
const router = express.Router();
const jobController = require('../controllers/job.controller');
const authenticateToken = require('../middlewares/auth.middleware');
const authorizeRoles = require('../middlewares/checkRole.middleware');

router.get('/', jobController.getIndustry);
router.get('/:id', jobController.getIndustryById);
router.post('/', authenticateToken, authorizeRoles(['admin', 'moderator', 'company']), jobController.createIndustry);

module.exports = router;