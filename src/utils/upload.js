// src/utils/upload.js
const multer = require('multer');
const path = require('path');

// Destination & filename config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/profile_photos/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = `photo_${Date.now()}${ext}`;
    cb(null, uniqueName);
  }
});

// File filter (optional: allow only images)
const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error('Only jpg, jpeg, png files allowed'), false);
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
