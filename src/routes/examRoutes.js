// ✅ src/routes/examRoutes.js

const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');

// 🔐 Only logged-in teachers can access these routes
router.use(verifyToken, authorizeRoles('teacher'));

// ➕ Create a new exam
router.post('/', examController.createExam);

// 📋 Get all exams created by the teacher
router.get('/', examController.getExamsByTeacher);

// ✏️ Update a specific exam
router.put('/:id', examController.updateExam);

// 🗑️ Delete an exam
router.delete('/:id', examController.deleteExam);

module.exports = router;
