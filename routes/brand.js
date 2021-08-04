const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const {
  addbrand,
  editbrand,
  viewonebrand,
  allbrand,
  deletebrand,
  brand_img,
} = require("../controller/brand");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file);
    let path = `./tempimages`;
    if (!fs.existsSync("tempimages")) {
      fs.mkdirSync("tempimages");
    }
    cb(null, path);
  },
  // filename: function (req, file, cb) {
  //   cb(null, new Date().toISOString() + "-" + file.originalname);
  // },
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

//Paths
router.post("/admin/addbrand", addbrand);
router.post("/admin/editbrand/:id", editbrand);
router.get("/admin/viewonebrand/:id", viewonebrand);
router.get("/admin/allbrand", allbrand);
router.delete("/admin/deletebrand/:id", deletebrand);
router.post("/admin/brandimage/:id", uploads.single("brand_img"), brand_img);

module.exports = router;
