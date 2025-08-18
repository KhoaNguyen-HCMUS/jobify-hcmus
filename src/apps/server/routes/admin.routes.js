const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');
const authorizeRoles = require('../middlewares/checkRole.middleware');

router.get('/companies/pending', authenticateToken, authorizeRoles(['moderator', 'admin']), adminController.getPendingCompanies);
router.patch('/companies/:id/approve', authenticateToken, authorizeRoles(['moderator', 'admin']), adminController.approveCompany);
router.patch('/companies/:id/reject', authenticateToken, authorizeRoles(['moderator', 'admin']), adminController.rejectCompany);

router.get('/users', authenticateToken, authorizeRoles(['moderator', 'admin']), adminController.getUsers);
router.get('/users/:id', authenticateToken, authorizeRoles(['moderator', 'admin']), adminController.getUserById);
router.patch('/users/:id/ban', authenticateToken, authorizeRoles(['moderator', 'admin']), adminController.banUser);
router.patch('/users/:id/unban', authenticateToken, authorizeRoles(['moderator', 'admin']), adminController.unbanUser);

router.get('/audit-logs', authenticateToken, authorizeRoles(['moderator', 'admin']), adminController.getAuditLogs);
router.get('/audit-logs/:id', authenticateToken, authorizeRoles(['moderator', 'admin']), adminController.getAuditLogById);

module.exports = router;
