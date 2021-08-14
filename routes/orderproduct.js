const express = require("express");
const router = express.Router();

const { productorder } = require("../controller/orderproduct");

//path

router.post("/admin/addorder", productorder);

module.exports = router;
