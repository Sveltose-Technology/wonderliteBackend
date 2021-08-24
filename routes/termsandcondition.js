const express = require("express");
const router = express.Router();

const {
  addtermsandcondition,
  deltermsandcondition,
} = require("../controller/termsandcondition");

router.post("/admin/addtermsandcondition", addtermsandcondition);
// router.post("/admin/editunits/:id", editunits);
// router.get("/admin/viewoneunits/:id", viewoneunits);
// router.get("/admin/viewallunits", viewallunits);
router.get("/admin/deltermsandcondition/:id", deltermsandcondition);

module.exports = router;
