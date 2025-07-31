const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET;

// ====== STUDENT REGISTER ======
exports.registerStudent = async (req, res) => {
  const { name, branch, email, password, profile_photo } = req.body;

  try {
    userModel.findStudentByEmail(email, async (err, results) => {
      if (results.length > 0) {
        return res.status(400).json({ message: 'Email already registered' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      userModel.registerStudent(
        { name, branch, email, password: hashedPassword, profile_photo },
        (err, result) => {
          if (err) return res.status(500).json({ error: err.message });
          return res.status(201).json({ message: 'Student registered successfully' });
        }
      );
    });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// ====== STUDENT LOGIN ======
exports.loginStudent = (req, res) => {
  const { email, password } = req.body;

  userModel.findStudentByEmail(email, async (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const student = results[0];
    const isMatch = await bcrypt.compare(password, student.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: student.id, role: 'student' }, JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({
      message: 'Login successful',
      token,
      student: {
        id: student.id,
        name: student.name,
        email: student.email,
        branch: student.branch,
        profile_photo: student.profile_photo,
      },
    });
  });
};

// ====== TEACHER LOGIN ======
exports.loginTeacher = (req, res) => {
  const { email, password } = req.body;

  userModel.findTeacherByEmail(email, async (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const teacher = results[0];
    const isMatch = await bcrypt.compare(password, teacher.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: teacher.id, role: 'teacher' }, JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({
      message: 'Login successful',
      token,
      teacher: {
        id: teacher.id,
        name: teacher.name,
        email: teacher.email,
      },
    });
  });
};

// ====== ADMIN LOGIN (DB login) ======
exports.loginAdmin = (req, res) => {
  const { email, password } = req.body;

  const sql = `SELECT * FROM admins WHERE email = ?`;
  db.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (results.length === 0) return res.status(401).json({ message: 'Invalid credentials' });

    const admin = results[0];
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin.id, role: 'admin' }, JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({
      message: 'Login successful',
      token,
      admin: {
        id: admin.id,
        email: admin.email,
      },
    });
  });
};
