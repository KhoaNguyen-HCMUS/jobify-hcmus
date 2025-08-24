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

router.get('/:id', jobController.getJobDetail);
router.put('/:id', authenticateToken, authorizeRoles(['company', 'admin', 'moderator']), jobController.updateJob);
router.delete('/:id', authenticateToken, authorizeRoles(['company', 'admin', 'moderator']), jobController.deleteJob);
router.post('/:id/save', authenticateToken, jobController.saveJob);
router.delete('/:id/save', authenticateToken, jobController.unsaveJob);

router.post('/:id/apply', authenticateToken, applicationController.applyJob);
router.delete('/:id/apply', authenticateToken, applicationController.cancelApplication);
router.get('/:id/applications', authenticateToken, applicationController.getJobApplications);

module.exports = router;
