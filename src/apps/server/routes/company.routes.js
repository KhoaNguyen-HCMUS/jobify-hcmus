const express = require('express');
const router = express.Router();
const companyController = require('../controllers/company.controller');
const authenticateToken = require('../middlewares/auth.middleware');

router.get('/wallet', authenticateToken, companyController.getWallet);
router.post('/wallet/transactions', authenticateToken, companyController.createTransaction);
router.get('/transactions', authenticateToken, companyController.getTransactions);

module.exports = router;
