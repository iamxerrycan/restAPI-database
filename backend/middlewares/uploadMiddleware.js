// const multer = require('multer');
// const path = require('path');

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null + Date.now(), path.extname(file.originalname));
//   },
// });

// const upload = multer({
//   storage,
// });

// module.exports = upload;

// const multer = require('multer');
// const path = require('path');

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     const ext = path.extname(file.originalname)
//     const uniqueName = cb(null, `${Date.now()}-${file.originalname}`);
//     cb(null, uniqueName);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const allowedFileTypes = ['.jpg', '.jpeg', '.png', '.pdf'];
//   const ext = path.extname(file.originalname).toLowerCase();
//   if (allowedFileTypes.includes(ext)) {
//     console.log('Uploading file:', file.originalname);
//     cb(null, true);
//   } else {
//     cb(new Error('Invalid file type'));
//   }
// };

// const upload = multer({
//   storage ,
//   fileFilter
// });

// module.exports = upload;


const multer = require('multer');
const path = require('path');
const fs = require('fs');

// ✅ Ensure uploads/ directory exists
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// ✅ Multer storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// ✅ File filter
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['.jpg', '.jpeg', '.png', '.pdf'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedFileTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'));
  }
};

// ✅ Multer middleware
const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload;
