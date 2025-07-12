const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const authenticateToken  = require('../middlewares/auth.middleware');
const authorizeRoles = require('../middlewares/checkRole.middleware');

router.get('/jobs/pending', authenticateToken, authorizeRoles(['mod', 'admin']), adminController.getPendingJobs);
router.patch('/jobs/:id/approve', authenticateToken, authorizeRoles(['mod', 'admin']), adminController.approveJob);
router.patch('/jobs/:id/reject', authenticateToken, authorizeRoles(['mod', 'admin']), adminController.rejectJob);

module.exports = router;
