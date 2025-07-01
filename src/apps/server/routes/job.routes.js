const express = require('express');
const router = express.Router();
const jobController = require('../controllers/job.controller');

router.get('/', jobController.getJobs);
router.get('/:id', jobController.getJobDetail);
router.post('/', jobController.createJob);
router.put('/:id', jobController.updateJob);
router.delete('/:id', jobController.deleteJob);

router.post('/:id/apply', jobController.applyJob);
router.delete('/:id/apply', jobController.cancelApplication);
router.get('/:id/applications', jobController.getJobApplications);

router.post('/:id/save', jobController.saveJob);
router.delete('/:id/save', jobController.unsaveJob);
router.get('/saved', jobController.getSavedJobs);

router.get('/recommended', jobController.getRecommendedJobs);

module.exports = router;
