const express = require("express");
const router = express.Router();

const {
  productorder,
  allorder,
  cancel_order,
  pending_order,
  delivered_order,
  viewone_orderproduct,
  delete_order,
} = require("../controller/orderproduct");

//path

router.post("/admin/addorder", productorder);
router.get("/admin/allorder", allorder);
router.get("/admin/cancel_order", cancel_order);

router.get("/admin/viewone_orderproduct/:id", viewone_orderproduct);
router.get("/admin/delete_order/:id", delete_order);

router.get("/admin/allpending_order", pending_order);
router.get("/admin/delivered_order", delivered_order);
module.exports = router;
