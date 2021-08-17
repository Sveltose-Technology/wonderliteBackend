const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const { addbuy_xget_y, allbuy_xget_y } = require("../controller/buy_xget_y");

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
  "/admin/addbuy_xget_y",
  uploads.single("product_img"),
  addbuy_xget_y
);

//router.post("/admin/editstaff/:id", editstaff)
//router.get("/admin/viewonestaff/:id", viewonestaff)
router.get("/admin/getall", allbuy_xget_y);
//router.delete("/admin/deletestaff/:id", deletestaff)

module.exports = router;
