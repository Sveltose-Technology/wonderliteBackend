const express = require("express");
const router = express.Router();

const {
  addcompanyfeedback,
  onecompanyfeedback,
  allcompanyfeedback,
  editcompanyfeedback,
  delcompanyfeedback,
} = require("../controller/companyfeedback");

//Path
router.post("/admin/addcompanyfeedback", addcompanyfeedback);
router.get("/admin/onecompanyfeedback/:id", onecompanyfeedback);
router.get("/admin/allcompanyfeedback", allcompanyfeedback);
router.post("/admin/editcompanyfeedback/:id", editcompanyfeedback);
router.delete("/admin/delcompanyfeedback/:id", delcompanyfeedback);

module.exports = router;
