const express = require("express");
const router = express.Router();
const fs = require("fs");
const multer = require("multer");
const {
  add_Img,
  delete_img,
  getall_img,
} = require("../controller/product_img");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //console.log(file);
    let path = `./uploadesimages`;
    if (!fs.existsSync("uploadesimages")) {
      fs.mkdirSync("uploadesimages");
    }
    cb(null, path);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
//            const maxSize = 240*220
//            var upload = multer({
//  fileFilter = (req, file, cb) => {
//   if (
//     //file.mimetype.includes("jpeg") ||
//     file.mimetype.includes("png") ||
//     file.mimetype.includes("jpg")
//   ) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//     return cb(new Error("only .png format allowed"))
//   }
// },
// limits:{fileSize : maxSize},}).single('file')
// let uploads = multer({ storage: storage });

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 240 * 220 },
//   fileFilter: function (req, file, cb) {
//     checkFileType(file, cb);
//   },
// }).single("add_Img");

const upload = multer({
  storage: storage,
  limits: { fileSize: 240 * 220 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.match("png")) {
      cb(new Error("file is not supported"), false);
      return;
    }
    cb(null, true);
  },
});

//Paths
router.post("/admin/add_Img", upload.single("product_img"), add_Img);
router.get("/admin/delete_img/:id", delete_img);
router.get("/admin/getall_img", getall_img);

module.exports = router;
