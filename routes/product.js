const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const {
  addproduct,
  editproduct,
  viewoneproduct,
  allproduct,
  productbybrand,
  productbycategory,
  productbysubcategory,
  deleteproduct,
  product_img,
  dispense,
} = require("../controller/product");

// if (!fs.existsSync("uploads")) {
//   fs.mkdirSync("uploads");
// }

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //console.log(file);
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
router.post("/admin/addproduct", addproduct);
router.post("/admin/editproduct/:id", editproduct);
router.get("/admin/viewoneproduct/:id", viewoneproduct);
router.get("/admin/allproduct", allproduct);
router.get("/admin/productbybrand/:id", productbybrand);
router.get("/admin/productbycategory/:id", productbycategory);
router.get("/admin/productbysubcategory/:id", productbysubcategory);

router.delete("/admin/deleteproduct/:id", deleteproduct);
router.post("/admin/dispense/:id", dispense);
router.post("/admin/addimage/:id", uploads.single("product_img"), product_img);

module.exports = router;
