const express = require('express');
const router = express.Router();
const jobController = require('../controllers/job.controller');
const applicationController = require('../controllers/application.controller');
const { authenticateToken, optionalAuthenticateToken } = require('../middlewares/auth.middleware');
const authorizeRoles = require('../middlewares/checkRole.middleware');
const upload = require('../middlewares/upload.middleware');

router.get('/', optionalAuthenticateToken, jobController.getJobs);
router.post('/', authenticateToken, authorizeRoles(['company']), jobController.createJob);
router.post('/refresh', optionalAuthenticateToken, jobController.refreshJobs);
router.get('/saved', authenticateToken, jobController.getSavedJobs);
router.get('/recommended', authenticateToken, jobController.getRecommendedJobs);
router.get('/applied', authenticateToken, jobController.getAppliedJobs);

router.get('/:id', jobController.getJobById);
router.put('/:id', authenticateToken, authorizeRoles(['admin', 'moderator', 'company']), jobController.updateJob);
router.patch('/:id/close', authenticateToken, authorizeRoles(['admin', 'moderator', 'company']), jobController.closeJob);
router.delete('/:id', authenticateToken, authorizeRoles(['admin', 'moderator', 'company']), jobController.deleteJob);
router.post('/:id/save', authenticateToken, jobController.saveJob);
router.delete('/:id/save', authenticateToken, jobController.unsaveJob);

router.post('/:id/apply', upload.single('resume'), authenticateToken, authorizeRoles(['candidate']), applicationController.applyJob);
router.delete('/:id/apply', authenticateToken, authorizeRoles(['candidate']), applicationController.cancelApplication);

module.exports = router;
