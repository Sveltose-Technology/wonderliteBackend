const multer = require("multer");
const upload = multer({ storage });

//specify the storage

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/uploads/");
  },
  filename: function (req, res, cb) {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

//file validation
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb({ message: "unsupported file format" }, false);
  }
};
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 },
  fileFilter: fileFilter,
});

module.exports = uploads;
