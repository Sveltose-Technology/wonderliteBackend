const express = require("express");
const router = express.Router();

const {
  addfeedback,
  rating,
  onefeedback,
  allfeedback,
  editfeedback,
  deletefeedback,
} = require("../controller/feedback");

//Paths
router.post("/admin/addfeedback", addfeedback);
router.post("/admin/rating", rating);
router.get("/admin/onefeedback/:id", onefeedback);
router.get("/admin/allfeedback", allfeedback);
router.post("/admin/editfeedback/:id", editfeedback);
router.delete("/admin/deletefeedback/:id", deletefeedback);

module.exports = router;
