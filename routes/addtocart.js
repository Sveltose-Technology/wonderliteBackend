const express = require("express");
const router = express.Router();

const { addcart, order } = require("../controller/addtocart");

//path
router.post("/admin/addto_cart", addcart);
router.post("/admin/order_product/:id", order);

module.exports = router;
