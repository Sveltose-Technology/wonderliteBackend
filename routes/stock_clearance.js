const express = require("express");
const router = express.Router();

const {
  stockclearance,
  //getstockclearance,
  //allstockclearance,
} = require("../controller/stock_clearance");
router.post("/admin/stockclearance/:id", stockclearance);
//router.get("/admin/getstockclearance/:id", getstockclearance);
//router.get("/admin/allstockclearance", allstockclearance);
//router.post("/admin/")

module.exports = router;
