const express = require("express");
const router = express.Router();

const {
  productorder,
  allorder,
  cancelorder,
  pending_order,
  allpendingorderbyid,
} = require("../controller/orderproduct");

//path

router.post("/admin/addorder", productorder);
router.get("/admin/allorder", allorder);
router.get("/admin/cancel_order/:id", cancelorder);
router.post("/admin/order_status/:id", pending_order);
//router.get("/admin/allpending_order", get_pendingorder);
router.get("/admin/allpendingorderbyid/:id", allpendingorderbyid);

module.exports = router;
