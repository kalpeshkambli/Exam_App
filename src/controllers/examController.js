// ✅ src/controllers/examController.js

const examModel = require('../models/examModel');

// ➕ Create a new exam
exports.createExam = (req, res) => {
  const { subject, start_time, duration_minutes } = req.body;
  const teacher_id = req.user.id;

  if (!subject || !start_time || !duration_minutes) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const examData = { teacher_id, subject, start_time, duration_minutes };

  examModel.createExam(examData, (err, result) => {
    if (err) return res.status(500).json({ message: 'Failed to create exam', error: err });
    res.status(201).json({ message: 'Exam created successfully', examId: result.insertId });
  });
};

// 📋 Get all exams by this teacher
exports.getExamsByTeacher = (req, res) => {
  const teacherId = req.user.id;

  examModel.getExamsByTeacherId(teacherId, (err, exams) => {
    if (err) return res.status(500).json({ message: 'Error fetching exams' });
    res.status(200).json({ exams });
  });
};

// ✏️ Update an exam
exports.updateExam = (req, res) => {
  const examId = req.params.id;
  const { subject, start_time, duration_minutes } = req.body;

  const updatedData = { subject, start_time, duration_minutes };

  examModel.updateExam(examId, updatedData, (err) => {
    if (err) return res.status(500).json({ message: 'Failed to update exam' });
    res.status(200).json({ message: 'Exam updated successfully' });
  });
};

// 🗑️ Delete an exam
exports.deleteExam = (req, res) => {
  const examId = req.params.id;

  examModel.deleteExam(examId, (err) => {
    if (err) return res.status(500).json({ message: 'Failed to delete exam' });
    res.status(200).json({ message: 'Exam deleted successfully' });
  });
};
