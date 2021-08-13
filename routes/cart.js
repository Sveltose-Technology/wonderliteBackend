const express = require("express");
const router = express.Router();

const {
  //addItemToCart,
  // addItemToCart,
  addToCart,
  addToOrder,
  getallcart,
  editorder,
  removecart,
  updateorder,
  productorder,
  //allproductorder,
} = require("../controller/cart");

//path
//router.post("/admin/add_ItemCart", addItemToCart);
router.post("/admin/add_ToCart", addToCart);
router.post("/admin/order_product", addToOrder);
router.get("/admin/get_allcart", getallcart);
router.post("/admin/edit_order/:id", editorder);
router.delete("/admin/remove_cart/:id", removecart);
router.get("/admin/update_order/:id", updateorder);
// router.delete("/admin/delete_productorder/:id", deleteproductorder);
module.exports = router;
