const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const {
  addblog,
  allblog,
  delblog,
  viewoneblog,
} = require("../controller/blog");

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
//Path
router.post("/admin/addblog", uploads.single("blog_img"), addblog);
router.get("/admin/allblog", allblog);
router.get("/admin/delblog/:id", delblog);
router.get("/admin/viewoneblog/:id", viewoneblog);

module.exports = router;
