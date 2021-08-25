const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const {
  addblognews,
  allblognews,
  viewoneblognews,

  delblognews,
} = require("../controller/blog_news");

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

router.post("/admin/addblognews", uploads.single("news_img"), addblognews);

router.get("/admin/allblognews", allblognews);
router.get("/admin/viewonenews/:id", viewoneblognews);
router.get("/admin/delblognews/:id", delblognews);

module.exports = router;
