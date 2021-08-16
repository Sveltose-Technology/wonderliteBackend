const express = require("express");
const router = express.Router();

const { productorder, allorder } = require("../controller/orderproduct");

//path

router.post("/admin/addorder", productorder);
router.get("/admin/allorder", allorder);

module.exports = router;
