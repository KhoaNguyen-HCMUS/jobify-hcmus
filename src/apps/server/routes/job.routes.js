const express = require('express');
const router = express.Router();
const jobController = require('../controllers/job.controller');
const applicationController = require('../controllers/application.controller');
const authenticateToken = require('../middlewares/auth.middleware');
const authorizeRoles = require('../middlewares/checkRole.middleware');

router.get('/', jobController.getJobs);
router.post('/', authenticateToken, authorizeRoles(['company']), jobController.createJob);
router.get('/saved', authenticateToken, jobController.getSavedJobs);
router.get('/recommended', authenticateToken, jobController.getRecommendedJobs);

router.get('/:id', jobController.getJobById);
router.put('/:id', authenticateToken, authorizeRoles(['admin', 'moderator', 'company']), jobController.updateJob);
router.delete('/:id', authenticateToken, authorizeRoles(['admin', 'moderator', 'company']), jobController.deleteJob);
router.post('/:id/save', authenticateToken, jobController.saveJob);
router.delete('/:id/save', authenticateToken, jobController.unsaveJob);

router.post('/:id/apply', authenticateToken, authorizeRoles(['candidate']), applicationController.applyJob);
router.delete('/:id/apply', authenticateToken, authorizeRoles(['candidate']), applicationController.cancelApplication);
router.get('/:id/applications', authenticateToken, authorizeRoles(['admin', 'moderator', 'company']), applicationController.getJobApplications);

module.exports = router;
