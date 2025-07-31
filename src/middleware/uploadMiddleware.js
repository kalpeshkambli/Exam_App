// ✅ src/middleware/uploadMiddleware.js

const multer = require('multer');
const path = require('path');
const fs = require('fs');

// 🔧 Ensure upload folder exists
const uploadPath = path.join(__dirname, '../uploads/profile_photos');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// 🗂️ Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  },
});

// ✅ File filter — accept only images
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['.jpg', '.jpeg', '.png', '.webp'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (!allowedTypes.includes(ext)) {
    return cb(new Error('Only images are allowed (.jpg, .png, .jpeg, .webp)'), false);
  }
  cb(null, true);
};

// 🚀 Export upload middleware
const upload = multer({ storage, fileFilter });
module.exports = upload;
