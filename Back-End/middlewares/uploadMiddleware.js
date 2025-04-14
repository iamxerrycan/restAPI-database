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

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null + `${Date.now()}-${path.extname(file.filename)}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['.jpg', '.jpeg', '.png', '.pdf'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedFileTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'));
  }
};

const upload = multer({
  storage ,
  fileFilter
});

module.exports = upload;


