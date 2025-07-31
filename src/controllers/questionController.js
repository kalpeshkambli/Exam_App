// ✅ src/controllers/questionController.js

const questionModel = require('../models/questionModel');

// ➕ Add question to an exam
exports.addQuestion = (req, res) => {
  const exam_id = req.params.examId;
  const { question_text, option_a, option_b, option_c, option_d, correct_option } = req.body;

  if (!question_text || !option_a || !option_b || !option_c || !option_d || !correct_option) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const questionData = {
    exam_id,
    question_text,
    option_a,
    option_b,
    option_c,
    option_d,
    correct_option
  };

  questionModel.addQuestion(questionData, (err, result) => {
    if (err) return res.status(500).json({ message: 'Failed to add question', error: err });
    res.status(201).json({ message: 'Question added successfully', questionId: result.insertId });
  });
};

// 📋 Get all questions for a given exam
exports.getQuestions = (req, res) => {
  const examId = req.params.examId;

  questionModel.getQuestionsByExamId(examId, (err, questions) => {
    if (err) return res.status(500).json({ message: 'Failed to fetch questions' });
    res.status(200).json({ questions });
  });
};

// ✏️ Update a question
exports.updateQuestion = (req, res) => {
  const id = req.params.questionId;
  const { question_text, option_a, option_b, option_c, option_d, correct_option } = req.body;

  const updatedData = { question_text, option_a, option_b, option_c, option_d, correct_option };

  questionModel.updateQuestion(id, updatedData, (err) => {
    if (err) return res.status(500).json({ message: 'Failed to update question' });
    res.status(200).json({ message: 'Question updated successfully' });
  });
};

// 🗑️ Delete a question
exports.deleteQuestion = (req, res) => {
  const id = req.params.questionId;

  questionModel.deleteQuestion(id, (err) => {
    if (err) return res.status(500).json({ message: 'Failed to delete question' });
    res.status(200).json({ message: 'Question deleted successfully' });
  });
};
