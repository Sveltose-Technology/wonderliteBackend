const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;

const {
  addproductcategory,
  editproductcategory,
  viewoneproductcategory,
  allproductcategory,
  deleteproductcategory,
  product_img,
} = require("../controller/productcategory");

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
  //   cb(null, new Date().toISOString() + "Productcat-" + file.originalname);
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
router.post("/admin/addproductcategory", addproductcategory);
router.post("/admin/editproductcategory/:id", editproductcategory);
router.get("/admin/viewoneproductcategory/:id", viewoneproductcategory);
router.get("/admin/allproductcategory", allproductcategory);
router.delete("/admin/deleteproductcategory/:id", deleteproductcategory);
router.post("/admin/addimage/:id", uploads.single("product_img"), product_img);
// router.post(
//   "/admin/uploads",
//   uploads.array("product_img", 5),
//   function (req, res, next) {
//     var fileinfo = req.files;
//     var product_img = req.body.product_img;
//     console.log(product_img);
//     res.send(fileinfo);
//   }
// );

router.post("/admin/upload", uploads.array("product_img"), async (req, res) => {
  const sendimage = async (path) =>
    await cloudinary.uploader.upload(path, function (error, result) {
      return result.secure_url;
    });
  //const urls = [];
  const files = req.files;
  for (const file of files) {
    const { path } = file;
    const newPath = await sendimage(path);
    urls.push(newPath);
    fs.unlinkSync(path);
    // console.log(urls);
  }
  res.status(200).json({
    message: "images uploaded successfully",
    data: urls,
  });
});

module.exports = router;
