const express = require("express");
const router = express.Router();

const {
  addorder_return,
  allreturn_order,
  deletereturn_order,
} = require("../controller/order_return");

//Paths
router.post("/admin/addorder_return", addorder_return);
//router.post("/admin/addexchange", addexchange);
router.get("/admin/allreturn_order", allreturn_order);
router.get("/admin/deletreturn_order/:id", deletereturn_order);

module.exports = router;
