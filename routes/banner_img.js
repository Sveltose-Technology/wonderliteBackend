const express = require("express");
const router = express.Router();
// const multer = require("multer");
// const fs = require("fs");

const { banner, list_img } = require("../controller/banner_img");
const upload = require("../filehandler/multer");

// if (!fs.existsSync("uploads")) {
//   fs.mkdirSync("uploads");
// }

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     let path = `./tempimages`;
//     if (!fs.existsSync("tempimages")) {
//       fs.mkdirSync("tempimages");
//     }
//     cb(null, path);
//   },
//   //   filename: function (req, file, cb) {
//   //     cb(null, new Date().toISOString() + "-" + file.originalname);
//   //   },
// });

// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype.includes("jpeg") ||
//     file.mimetype.includes("png") ||
//     file.mimetype.includes("jpg")
//   ) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// let uploads = multer({ storage: storage });

//path
//router.post("/admin/bannerimg/:id", uploads.single("banner_img"), banner_img);
router.get("/admin/list_banner_image", list_img);
router.post("/admin/upload_banner_image", upload.array("banner"), banner);

module.exports = router;
