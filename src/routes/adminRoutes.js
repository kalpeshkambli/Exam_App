const express = require('express');
const router = express.Router();
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');
const adminController = require('../controllers/adminController');

// Nested route import
const teacherRoutes = require('./teacherRoutes');

// Admin Dashboard
router.get(
  '/dashboard',
  verifyToken,
  authorizeRoles('admin'),
  adminController.dashboard
);

// Teacher management
router.use('/teachers', verifyToken, authorizeRoles('admin'), teacherRoutes);

module.exports = router;
