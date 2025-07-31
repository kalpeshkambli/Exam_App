// ✅ src/routes/studentRoutes.js

const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// 🔐 All routes are protected for students only
router.use(verifyToken, authorizeRoles('student'));

// --- 📄 Profile Routes ---
router.get('/profile', studentController.getProfile);
router.put('/profile', studentController.updateProfile);
router.post('/upload-photo', upload.single('profile_photo'), studentController.uploadProfilePhoto);

// --- 📝 Exam Routes ---
router.get('/exams', studentController.getAvailableExams);
router.get('/exams/:id/questions', studentController.getExamQuestions);
router.post('/exams/:id/submit', studentController.submitExam);

// --- 📊 Result Routes ---
router.get('/results', studentController.getMyResults);
router.get('/results/:id', studentController.getResultById);

module.exports = router;
