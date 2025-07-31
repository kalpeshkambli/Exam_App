// ✅ src/models/questionModel.js

const db = require('../config/db');

// ➕ Add a question to an exam
exports.addQuestion = (data, callback) => {
  const sql = `
    INSERT INTO questions (exam_id, question_text, option_a, option_b, option_c, option_d, correct_option)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(sql, [
    data.exam_id,
    data.question_text,
    data.option_a,
    data.option_b,
    data.option_c,
    data.option_d,
    data.correct_option
  ], callback);
};

// 🔍 Get all questions for a specific exam
exports.getQuestionsByExamId = (examId, callback) => {
  const sql = `SELECT * FROM questions WHERE exam_id = ?`;
  db.query(sql, [examId], callback);
};

// 🗑️ Delete a specific question
exports.deleteQuestion = (id, callback) => {
  const sql = `DELETE FROM questions WHERE id = ?`;
  db.query(sql, [id], callback);
};

// ✏️ Update question
exports.updateQuestion = (id, data, callback) => {
  const sql = `
    UPDATE questions 
    SET question_text = ?, option_a = ?, option_b = ?, option_c = ?, option_d = ?, correct_option = ?
    WHERE id = ?
  `;
  db.query(sql, [
    data.question_text,
    data.option_a,
    data.option_b,
    data.option_c,
    data.option_d,
    data.correct_option,
    id
  ], callback);
};
