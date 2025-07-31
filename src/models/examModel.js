// ✅ src/models/examModel.js

const db = require('../config/db');

// 🔍 Get all available exams (for all students)
exports.getAllExams = (callback) => {
  const sql = `
    SELECT exams.id, exams.subject, exams.start_time, exams.duration_minutes, teachers.name AS teacher_name
    FROM exams
    JOIN teachers ON exams.teacher_id = teachers.id
    ORDER BY exams.start_time DESC
  `;
  db.query(sql, callback);
};

// 📌 Get exam by ID
exports.getExamById = (id, callback) => {
  const sql = `SELECT * FROM exams WHERE id = ?`;
  db.query(sql, [id], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0]);
  });
};

// ➕ Create new exam
exports.createExam = (data, callback) => {
  const sql = `
    INSERT INTO exams (teacher_id, subject, start_time, duration_minutes)
    VALUES (?, ?, ?, ?)
  `;
  db.query(sql, [
    data.teacher_id,
    data.subject,
    data.start_time,
    data.duration_minutes
  ], callback);
};

// 🗑️ Delete exam
exports.deleteExam = (id, callback) => {
  const sql = `DELETE FROM exams WHERE id = ?`;
  db.query(sql, [id], callback);
};

// 📝 Update exam
exports.updateExam = (id, data, callback) => {
  const sql = `
    UPDATE exams SET subject = ?, start_time = ?, duration_minutes = ?
    WHERE id = ?
  `;
  db.query(sql, [
    data.subject,
    data.start_time,
    data.duration_minutes,
    id
  ], callback);
};
