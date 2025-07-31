// src/routes/teacherRoutes.js

const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');

// All routes protected by verifyToken and admin role
router.get('/', verifyToken, authorizeRoles('admin'), teacherController.getAllTeachers);
router.post('/', verifyToken, authorizeRoles('admin'), teacherController.createTeacher);
router.put('/:id', verifyToken, authorizeRoles('admin'), teacherController.updateTeacher);
router.delete('/:id', verifyToken, authorizeRoles('admin'), teacherController.deleteTeacher);

module.exports = router;
