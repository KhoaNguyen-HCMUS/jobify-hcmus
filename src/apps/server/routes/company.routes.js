const express = require('express');
const router = express.Router();
const companyController = require('../controllers/company.controller');
const jobController = require('../controllers/job.controller');
const applicationController = require('../controllers/application.controller');
const authenticateToken = require('../middlewares/auth.middleware');
const authorizeRoles = require('../middlewares/checkRole.middleware');

router.get('/jobs', authenticateToken, authorizeRoles(['admin', 'moderator', 'company']), jobController.getCompanyJobs);
router.get('/jobs/:id/applications', authenticateToken, authorizeRoles(['admin', 'moderator', 'company']), applicationController.getJobApplications);
router.get('/wallet', authenticateToken, authorizeRoles(['company']), companyController.getWallet);
router.post('/wallet/transactions', authenticateToken, authorizeRoles(['company']), companyController.createTransaction);
router.get('/transactions', authenticateToken, authorizeRoles(['company']), companyController.getTransactions);

module.exports = router;
