// src/app.js

const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const errorHandler = require('./middleware/errorHandler');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/student', require('./routes/studentRoutes')); // ✅ Added
app.use('/api/exams', require('./routes/examRoutes'));
app.use('/api/questions', require('./routes/questionRoutes'));
app.use('/api/results', require('./routes/resultRoutes'));

// Default Test Route
app.get('/', (req, res) => {
  res.send('🎉 MCQ MASTER API is running!');
});

module.exports = app;
