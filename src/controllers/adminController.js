// src/controllers/adminController.js
const db = require('../config/db');

// Admin dashboard test
exports.dashboard = (req, res) => {
  res.status(200).json({
    message: `Hello Admin! You are authorized.`,
    userId: req.user.id
  });
};

