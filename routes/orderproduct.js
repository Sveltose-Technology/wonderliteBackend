const express = require("express");
const router = express.Router();

const {
  productorder,
  allorder,
  cancelorder,
  pending_order,
  delivered_order,
  allpendingorder,
} = require("../controller/orderproduct");

//path

router.post("/admin/addorder", productorder);
router.get("/admin/allorder", allorder);
router.get("/admin/cancel_order/:id", cancelorder);
router.get("/admin/order_status", pending_order);
router.get("/admin/alldelivered_order", delivered_order);

//router.get("/admin/alldelivered_order/:id", delivered_order);
//router.get("/admin/allpendingorder", allpendingorder);

module.exports = router;
