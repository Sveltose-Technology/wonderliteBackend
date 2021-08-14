const express = require("express");
const router = express.Router();

const {
  //addItemToCart,
  // addItemToCart,
  addtocartproduct,
  productsummary,
  addToOrder,
  getallcart,
  editorder,
  removecart,
  updateorder,
  productorder,
  //allproductorder,
} = require("../controller/cart");

//path
router.post("/admin/add_ToCart", addtocartproduct);
router.post("/admin/productsummary", productsummary);
//router.get("/admin/get_allcart", getallcart);
//router.post("/admin/edit_order/:id", editorder);
//router.delete("/admin/remove_cart/:id", removecart);
//router.get("/admin/update_order/:id", updateorder);
// router.delete("/admin/delete_productorder/:id", deleteproductorder);
module.exports = router;
