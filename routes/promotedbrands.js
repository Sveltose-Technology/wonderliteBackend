const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const {
  addpromotedbrand,
  allpromotedbrand,
} = require("../controller/promotedbrands");

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

router.post(
  "/admin/addpromotedbrand",
  uploads.single("promotion_img"),
  addpromotedbrand
);

//router.get("/admin/allpromotedbrand", allpromotedbrand);
// router.post("/admin/editpromotion/:id", editpromotion);
// router.post("/admin/onepromotedbrand/:id", onepromotedbrand);
// router.get("/admin/delpromotedbrand/:id", delpromotedbrand);

module.exports = router;
