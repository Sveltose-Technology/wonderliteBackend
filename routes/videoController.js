const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const {
  add_video,
  all_video,
  del_video,
  viewonevideo,
} = require("../controller/videoController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file);
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

let uploads = multer({ storage: storage });
//Path

router.post("/admin/addvideo", uploads.single("video_url"), add_video);
router.get("/admin/all_video", all_video);
router.get("/admin/del_video/:id", del_video);
router.get("/admin/viewonevideo/:id", viewonevideo);

module.exports = router;
