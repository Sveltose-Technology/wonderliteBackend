const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const {
  addbundleoffer,
  editbundleoffer,
  onebundleoffer,
  allbundleoffer,
  delbundleoffer,
  product_img,
} = require("../controller/bundleoffer");
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
router.post(
  "/admin/addbundleoffer",
  uploads.single("product_img"),
  addbundleoffer
);
router.post("/admin/editbundleoffer/:id", editbundleoffer);
router.get("/admin/onebundleoffer/:id", onebundleoffer);
router.get("/admin/allbundleoffer", allbundleoffer);
router.get("/admin/delbundleoffer/:id", delbundleoffer);
router.post("/admin/offer_img/:id", uploads.single("product_img"), product_img);

module.exports = router;
