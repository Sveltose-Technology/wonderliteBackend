const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const { verifytoken } = require("../functions/verifytoken");

const {
  add_dealoftheday,
  viewonedeal,
  alldealoftheday,
  del_dealoftheday,
  edit_dealoftheday,
} = require("../controller/dealofthe_day");
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

//Paths
router.post(
  "/admin/add_dealoftheday",
  uploads.single("product_img"),
  add_dealoftheday
);
router.get("/admin/viewonedeal/:id", verifytoken, viewonedeal);
router.get("/admin/all_dealoftheday", verifytoken, alldealoftheday);
router.post("/admin/edit_dealoftheday/:id", edit_dealoftheday);
//   router.get("/admin/allbrand", allbrand);
router.get("/admin/del_dealoftheday/:id", del_dealoftheday);

module.exports = router;
