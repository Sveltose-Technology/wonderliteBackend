const express = require("express");
const router = express.Router();

const multer = require("multer");
const fs = require("fs");

const { banner, list_img } = require("../controller/banner_img");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
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

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.includes("jpeg") ||
    file.mimetype.includes("png") ||
    file.mimetype.includes("jpg")
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let uploads = multer({ storage: storage });

router.get("/admin/list_banner_image", list_img);
router.post("/admin/upload_banner_image", uploads.array("banner_img"), banner);

module.exports = router;
