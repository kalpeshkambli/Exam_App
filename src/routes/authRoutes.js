const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Student
router.post('/student/register', authController.registerStudent);
router.post('/student/login', authController.loginStudent);

// Teacher
router.post('/teacher/login', authController.loginTeacher);

// Admin
router.post('/admin/login', authController.loginAdmin);

module.exports = router;
