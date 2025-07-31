// src/controllers/teacherController.js

const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

// === GET ALL TEACHERS ===
exports.getAllTeachers = (req, res) => {
  userModel.getAllTeachers((err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching teachers' });
    res.status(200).json({ teachers: results });
  });
};

// === ADD NEW TEACHER ===
exports.createTeacher = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  userModel.createTeacher({ name, email, password: hashedPassword }, (err, result) => {
    if (err) return res.status(500).json({ message: 'Error creating teacher' });
    res.status(201).json({ message: 'Teacher created successfully' });
  });
};

// === UPDATE TEACHER ===
exports.updateTeacher = async (req, res) => {
  const { name, email, password } = req.body;
  const id = req.params.id;

  const hashedPassword = await bcrypt.hash(password, 10);

  userModel.updateTeacher(id, { name, email, password: hashedPassword }, (err, result) => {
    if (err) return res.status(500).json({ message: 'Error updating teacher' });
    res.status(200).json({ message: 'Teacher updated successfully' });
  });
};

// === DELETE TEACHER ===
exports.deleteTeacher = (req, res) => {
  const id = req.params.id;

  userModel.deleteTeacher(id, (err, result) => {
    if (err) return res.status(500).json({ message: 'Error deleting teacher' });
    res.status(200).json({ message: 'Teacher deleted successfully' });
  });
};
