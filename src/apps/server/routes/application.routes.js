const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/application.controller');

router.get('/:id', applicationController.getApplicationDetail);
router.patch('/:id/status', applicationController.updateApplicationStatus);

module.exports = router;
