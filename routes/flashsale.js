const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const {
  add_flashsale,
  editflashsale,
  oneflashsale,
  allflashsale,
  delflashsale,
  //flashsale_img,
} = require("../controller/flashsale");

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
    cb(null, "uploadesimages");
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
router.post(
  "/admin/add_flashsale",
  uploads.array("flashsale_img"),
  add_flashsale
);

router.post("/admin/editflashsale/:id", editflashsale);
router.get("/admin/oneflashsale/:id", oneflashsale);
router.get("/admin/allflashsale", allflashsale);
router.get("/admin/delflashsale/:id", delflashsale);
// router.post(
//   "/admin/flashsaleimage/:id",
//   uploads.single("flashsale_img"),
//   flashsale_img
// );

module.exports = router;
