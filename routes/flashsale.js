const express = require("express");
const router = express.Router();

const {
  addflashsale,
  editflashsale,
  oneflashsale,
  allflashsale,
  delflashsale,
} = require("../controller/flashsale");

//Path
router.post("/admin/addflashsale", addflashsale);
router.post("/admin/editflashsale/:id", editflashsale);
router.get("/admin/oneflashsale/:id", oneflashsale);
router.get("/admin/allflashsale", allflashsale);
router.delete("/admin/delflashsale/:id", delflashsale);

module.exports = router;
