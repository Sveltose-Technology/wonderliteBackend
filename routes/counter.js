const express = require("express");
const router = express.Router();

const {
  total_users,
  total_product,
  total_staff,
} = require("../controller/counter");

//path
router.get("/admin/total_users", total_users);
router.get("/admin/total_product", total_product);
router.get("/admin/total_staff", total_staff);

module.exports = router;
