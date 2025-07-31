// ✅ src/models/resultModel.js
const db = require('../config/db');

// 📌 Create a new result entry
exports.createResult = (data, callback) => {
  const sql = `
    INSERT INTO results (student_id, exam_id, score, total_questions, correct_answers)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.query(
    sql,
    [data.student_id, data.exam_id, data.score, data.total_questions, data.correct_answers],
    callback
  );
};

// 📥 Get all results for a specific student
exports.getResultsByStudent = (studentId, callback) => {
  const sql = `
    SELECT results.*, exams.subject, exams.start_time
    FROM results
    JOIN exams ON results.exam_id = exams.id
    WHERE results.student_id = ?
    ORDER BY results.submitted_at DESC
  `;
  db.query(sql, [studentId], callback);
};

// 📥 Get result detail (by result ID + student ID to secure)
exports.getResultById = (resultId, studentId, callback) => {
  const sql = `
    SELECT results.*, exams.subject, exams.start_time
    FROM results
    JOIN exams ON results.exam_id = exams.id
    WHERE results.id = ? AND results.student_id = ?
  `;
  db.query(sql, [resultId, studentId], (err, results) => {
    if (err) return callback(err);
    if (!results || results.length === 0) return callback(null, null);
    callback(null, results[0]);
  });
};

// 📥 Get all results for an exam (for teacher analysis)
exports.getResultsByExamId = (examId, callback) => {
  const sql = `
    SELECT results.*, students.name AS student_name
    FROM results
    JOIN students ON results.student_id = students.id
    WHERE exam_id = ?
    ORDER BY score DESC, submitted_at ASC
  `;
  db.query(sql, [examId], callback);
};

// 🏅 Compute ranking for an exam (tie-breaker: earlier submission)
exports.computeRanking = (examId, callback) => {
  const sql = `
    SELECT results.*, students.name AS student_name
    FROM results
    JOIN students ON results.student_id = students.id
    WHERE exam_id = ?
    ORDER BY results.score DESC, results.submitted_at ASC
  `;
  db.query(sql, [examId], (err, results) => {
    if (err) return callback(err);
    let currentRank = 0;
    let prevScore = null;
    results.forEach((row, idx) => {
      if (row.score !== prevScore) {
        currentRank = idx + 1;
        prevScore = row.score;
      }
      row.rank = currentRank;
    });
    callback(null, results);
  });
};
