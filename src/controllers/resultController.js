// src/controllers/resultController.js
const resultModel = require('../models/resultModel');

// --- Student: get their own results ---
exports.getResultsByStudent = (req, res) => {
  const studentId = req.user.id; // logged in student
  resultModel.getResultsByStudent(studentId, (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching results' });
    res.status(200).json({ results });
  });
};

// --- Teacher/Admin: get all results of a specific exam ---
exports.getResultsByExam = (req, res) => {
  const examId = req.params.examId;
  resultModel.getResultsByExamId(examId, (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching exam results' });
    res.status(200).json({ results });
  });
};

// --- Submit a result (could be used if separate endpoint needed) ---
exports.createResult = (req, res) => {
  const data = {
    student_id: req.user.id, // taking from token
    exam_id: req.body.exam_id,
    score: req.body.score,
    total_questions: req.body.total_questions,
    correct_answers: req.body.correct_answers
  };

  resultModel.createResult(data, (err) => {
    if (err) return res.status(500).json({ message: 'Error saving result' });
    res.status(201).json({ message: 'Result submitted successfully' });
  });
};

// --- Get ranking for an exam (teacher view) ---
exports.getExamRanking = (req, res) => {
  const examId = req.params.examId;
  resultModel.computeRanking(examId, (err, ranked) => {
    if (err) return res.status(500).json({ message: 'Failed to get ranking' });
    res.status(200).json({ ranking: ranked });
  });
};
