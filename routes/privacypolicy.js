const express = require("express");
const router = express.Router();

const {
  addprivacypolicy,
  delprivacypolicy,
} = require("../controller/privacypolicy");

router.post("/admin/addprivacy_policy", addprivacypolicy);
// router.post("/admin/editunits/:id", editunits);
// router.get("/admin/viewoneunits/:id", viewoneunits);
// router.get("/admin/viewallunits", viewallunits);
router.get("/admin/delprivacypolicy/:id", delprivacypolicy);

module.exports = router;
