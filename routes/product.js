const express = require("express");
const router = express.Router();
const fs = require("fs");
const multer = require("multer");
const {
  addproduct,
  editproduct,
  viewoneproduct,
  allproduct,
  productbybrand,
  productbycategory,
  productbysubcategory,
  deleteProduct,
  product_img,
  dispense,
  search_product,
  add_img,
} = require("../controller/product");

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
router.post("/admin/addproduct", uploads.single("product_img"), addproduct);
router.post(
  "/admin/editproduct/:id",
  uploads.single("product_img"),
  editproduct
);
router.get("/admin/viewoneproduct/:id", viewoneproduct);
router.get("/admin/allproduct", allproduct);
router.get("/admin/productbybrand/:id", productbybrand);
router.get("/admin/productbycategory/:id", productbycategory);
router.get("/admin/productbysubcategory/:id", productbysubcategory);

router.get("/admin/delproduct/:id", deleteProduct);
router.post("/admin/dispense/:id", dispense);
router.get("/admin/search_product", search_product);

router.post("/admin/addimage/:id", uploads.single("product_img"), product_img);
// router.post("/destroy", (req, res) => {
//   try {
//     const { public_id } = req.body;
//     if (!public_id) return res.status(400).json({ msg: "No image selected" });
//     cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
//       if (err) throw err;
//       res.json({ msg: "Deleted Image" });
//     });
//   } catch (err) {
//     return res.status(500).json({ msg: err.message });
//   }
// });
//router.post("/admin/add_img", uploads.array("productImg"), add_img);

// router.get('/search',function(req,res,next){
//   var q = req.query.q
//   Product.find({
//     iten_name:{$regex: new RegExp(q)
//     }
//   }
//   )
// })

module.exports = router;
