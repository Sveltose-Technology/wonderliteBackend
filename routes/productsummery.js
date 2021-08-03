const express = require("express");
//const { diskStorage } = require("multer");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let path = `./tempimages`;
    if (!fs.existsSync("tempimages")) {
      fs.mkdirSync("tempimages");
    }
    cb(null, path);
  },
});

let upload = multer({ storage: storage });

const { add_img, image_data } = require("../controller/productsummery");

//Paths
//router.post("/admin/add_image", upload.single("image"), add_img);
//router.get("/admin/front_images", image_data);

module.exports = router;
