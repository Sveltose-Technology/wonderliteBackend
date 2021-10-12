const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
//var { promisify } = require("util");

const {
  addweb_banner,
  getbanner,
  del_webbanner,
  //   allbanner,
  //   editbannerimg,
  //   getbannerbytype,
  //   delbanner,
} = require("../controller/web_banner");

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

// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype.includes("jpeg") ||
//     file.mimetype.includes("png") ||
//     file.mimetype.includes("jpg")
//   ) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

//let upload = multer({ storage: storage });

const upload = multer({
  storage: storage,
  limits: { fileSize: 1351 * 701 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.match("png", "jpeg", "jpg")) {
      cb(new Error("file is not supported"), false);
      return;
    }
    cb(null, true);
  },
});
// var sizeOf = promisify(require('1350'));
// sizeOf('someimage.png')
//   .then(dimensions => { console.log(dimensions.width, dimensions.height); })
//   .catch(err => console.error(err));

//Paths
router.post("/admin/addweb_banner", upload.single("banner_img"), addweb_banner);

// router.post("/admin/add_banner", uploads.single("banner_img"), add_banner);
router.get("/admin/getbanner", getbanner);
// router.get("/admin/banners/:id", getbannerbytype);
// router.post("/admin/editbannerimg/:id", editbannerimg);
router.get("/admin/del_banner/:id", del_webbanner);

module.exports = router;
