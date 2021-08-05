const express = require("express");
const router = express.Router();

const {
  addbuyonegetone,
  getbuyonegetone,
  getallbuyonegetone,
  editbuyonegetone,
  delbuyonegetone,
} = require("../controller/buyonegetone");

//path
router.post("/admin/addbuyonegetone", addbuyonegetone);
router.get("/admin/getbuyonegetone/:id", getbuyonegetone);
router.get("/admin/getallbuyonegetone", getallbuyonegetone);
router.post("/admin/editbuyonegetone/:id", editbuyonegetone);
router.get("/admin/delbuyonegetone/:id", delbuyonegetone);

module.exports = router;
