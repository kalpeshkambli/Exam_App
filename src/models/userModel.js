// ✅ src/models/userModel.js

const db = require('../config/db');

// ========== STUDENT OPERATIONS ==========

// Register a new student
exports.registerStudent = (data, callback) => {
  const sql = `INSERT INTO students (name, branch, email, password, profile_photo)
               VALUES (?, ?, ?, ?, ?)`;
  db.query(sql, [data.name, data.branch, data.email, data.password, data.profile_photo], callback);
};

// Find student by email (for login)
exports.findStudentByEmail = (email, callback) => {
  const sql = `SELECT * FROM students WHERE email = ?`;
  db.query(sql, [email], callback);
};

// Find student by ID (for profile fetch)
exports.findStudentById = (id, callback) => {
  const sql = `SELECT id, name, branch, email, profile_photo FROM students WHERE id = ?`;
  db.query(sql, [id], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0]);
  });
};

// Update student profile
exports.updateStudent = (id, data, callback) => {
  const sql = `UPDATE students SET name = ?, branch = ?, email = ?, password = ? WHERE id = ?`;
  db.query(sql, [data.name, data.branch, data.email, data.password, id], callback);
};

// Update student profile photo
exports.updateProfilePhoto = (id, photoPath, callback) => {
  const sql = `UPDATE students SET profile_photo = ? WHERE id = ?`;
  db.query(sql, [photoPath, id], callback);
};

// ========== TEACHER OPERATIONS (Managed by Admin) ==========

// Create new teacher
exports.createTeacher = (data, callback) => {
  const sql = `INSERT INTO teachers (name, email, password) VALUES (?, ?, ?)`;
  db.query(sql, [data.name, data.email, data.password], callback);
};

// Find teacher by email
exports.findTeacherByEmail = (email, callback) => {
  const sql = `SELECT * FROM teachers WHERE email = ?`;
  db.query(sql, [email], callback);
};

// Get all teachers
exports.getAllTeachers = (callback) => {
  const sql = `SELECT id, name, email FROM teachers`;
  db.query(sql, callback);
};

// Update teacher details
exports.updateTeacher = (id, data, callback) => {
  const sql = `UPDATE teachers SET name = ?, email = ?, password = ? WHERE id = ?`;
  db.query(sql, [data.name, data.email, data.password, id], callback);
};

// Delete teacher
exports.deleteTeacher = (id, callback) => {
  const sql = `DELETE FROM teachers WHERE id = ?`;
  db.query(sql, [id], callback);
};

// ========== ADMIN LOGIN ==========
exports.findAdminByEmail = (email, callback) => {
  const sql = `SELECT * FROM admins WHERE email = ?`;
  db.query(sql, [email], callback);
};
