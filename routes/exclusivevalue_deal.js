const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const { verifytoken } = require("../functions/verifytoken");
const {
  add_exclusivevaluedeal,
  allexclusive_deal,
  oneexclusive_deal,
  del_exclusivedeal,
  edit_exclusivedeal,
} = require("../controller/exclusivevalue_deal");
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
  "/admin/add_exclusivevaluedeal",
  uploads.single("product_img"),
  add_exclusivevaluedeal
);
router.get("/admin/allexclusive_deal", verifytoken, allexclusive_deal);
router.post(
  "/admin/edit_exclusivedeal/:id",
  uploads.single("product_img"),
  edit_exclusivedeal
);
router.get("/admin/oneexclusive_deal/:id", verifytoken, oneexclusive_deal);
router.get("/admin/del_exclusivedeal/:id", del_exclusivedeal);

module.exports = router;
