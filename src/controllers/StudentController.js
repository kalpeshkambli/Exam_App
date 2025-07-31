// ✅ src/controllers/studentController.js
const userModel = require('../models/userModel');
const examModel = require('../models/examModel');
const questionModel = require('../models/questionModel');
const resultModel = require('../models/resultModel');
const bcrypt = require('bcrypt');

// 📌 GET student profile
exports.getProfile = (req, res) => {
  userModel.findStudentById(req.user.id, (err, student) => {
    if (err || !student) return res.status(404).json({ message: 'Student not found' });
    res.status(200).json({ student });
  });
};

// 📌 UPDATE student profile
exports.updateProfile = async (req, res) => {
  const { name, branch, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  userModel.updateStudent(req.user.id, { name, branch, email, password: hashedPassword }, (err) => {
    if (err) return res.status(500).json({ message: 'Error updating profile' });
    res.status(200).json({ message: 'Profile updated' });
  });
};

// 📌 UPLOAD profile photo
exports.uploadProfilePhoto = (req, res) => {
  const filePath = req.file.path;
  userModel.updateProfilePhoto(req.user.id, filePath, (err) => {
    if (err) return res.status(500).json({ message: 'Error uploading photo' });
    res.status(200).json({ message: 'Photo uploaded successfully', filePath });
  });
};

// 📌 GET all available exams for student
exports.getAvailableExams = (req, res) => {
  examModel.getExamsByBranch(req.user.branch, (err, exams) => {
    if (err) return res.status(500).json({ message: 'Error fetching exams' });
    res.status(200).json({ exams });
  });
};

// 📌 GET questions for a specific exam
exports.getExamQuestions = (req, res) => {
  const examId = req.params.id;
  questionModel.getQuestionsByExamId(examId, (err, questions) => {
    if (err) return res.status(500).json({ message: 'Error fetching questions' });
    res.status(200).json({ questions });
  });
};

// 📌 SUBMIT exam answers
exports.submitExam = (req, res) => {
  const examId = req.params.id;
  const answers = req.body.answers; // format: [{ questionId, selectedOption }]

  questionModel.getQuestionsByExamId(examId, (err, questions) => {
    if (err || !questions) return res.status(500).json({ message: 'Error fetching questions' });

    let correctCount = 0;
    questions.forEach((q) => {
      const submitted = answers.find(a => a.questionId == q.id);
      if (submitted && submitted.selectedOption === q.correct_option) correctCount++;
    });

    const totalQuestions = questions.length;
    const score = Math.round((correctCount / totalQuestions) * 100);

    resultModel.createResult({
      student_id: req.user.id,
      exam_id: examId,
      score,
      total_questions: totalQuestions,
      correct_answers: correctCount
    }, (err) => {
      if (err) return res.status(500).json({ message: 'Error submitting exam' });
      res.status(200).json({ message: 'Exam submitted', score });
    });
  });
};

// 📌 GET all results of logged in student
exports.getMyResults = (req, res) => {
  resultModel.getResultsByStudentId(req.user.id, (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching results' });
    res.status(200).json({ results });
  });
};

// 📌 GET single result detail
exports.getResultById = (req, res) => {
  const id = req.params.id;
  resultModel.getResultById(id, req.user.id, (err, result) => {
    if (err || !result) return res.status(404).json({ message: 'Result not found' });
    res.status(200).json({ result });
  });
};
