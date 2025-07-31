// ✅ src/routes/questionRoutes.js

const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');

// 🔐 Allow only teacher or admin to access these routes
router.use(verifyToken, authorizeRoles('teacher', 'admin'));

// ➕ Add a question to an exam
router.post('/:examId', questionController.addQuestion);

// 📋 Get all questions for an exam
router.get('/:examId', questionController.getQuestions);

// ✏️ Update a question
router.put('/edit/:questionId', questionController.updateQuestion);

// 🗑️ Delete a question
router.delete('/delete/:questionId', questionController.deleteQuestion);

module.exports = router;
