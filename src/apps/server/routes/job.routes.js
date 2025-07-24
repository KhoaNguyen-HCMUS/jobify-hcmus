const express = require('express');
const router = express.Router();
const jobController = require('../controllers/job.controller');
const applicationController = require('../controllers/application.controller');

router.get('/', jobController.getJobs);
router.get('/:id', jobController.getJobDetail);
router.post('/', jobController.createJob);
router.put('/:id', jobController.updateJob);
router.delete('/:id', jobController.deleteJob);
router.post('/:id/save', jobController.saveJob);
router.delete('/:id/save', jobController.unsaveJob);
router.get('/saved', jobController.getSavedJobs);
router.get('/recommended', jobController.getRecommendedJobs);

router.post('/:id/apply', applicationController.applyJob);
router.delete('/:id/apply', applicationController.cancelApplication);
router.get('/:id/applications', applicationController.getJobApplications);

module.exports = router;
