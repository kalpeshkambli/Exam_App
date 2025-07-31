// src/routes/resultRoutes.js
const express = require('express');
const router = express.Router();
const resultController = require('../controllers/resultController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');

// === Student ===
// Get own results
router.get(
  '/student',
  verifyToken,
  authorizeRoles('student'),
  resultController.getResultsByStudent
);

// Submit result (usually via exam submission flow)
router.post(
  '/',
  verifyToken,
  authorizeRoles('student'),
  resultController.createResult
);

// === Teacher / Admin ===
// View all results for a specific exam
router.get(
  '/exam/:examId',
  verifyToken,
  authorizeRoles('teacher', 'admin'),
  resultController.getResultsByExam
);

// Get ranking for a specific exam (teacher/admin)
router.get(
  '/exam/:examId/ranking',
  verifyToken,
  authorizeRoles('teacher', 'admin'),
  resultController.getExamRanking
);

module.exports = router;
