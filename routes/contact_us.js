const express = require("express");
const router = express.Router();

const {
  addcontactus,
  allcontactus,
  delcontactus,
  viewonecontactus,
} = require("../controller/contact_us");

//path
router.post("/admin/addcontactus", addcontactus);
router.get("/admin/allcontactus", allcontactus);
router.get("/admin/delcontactus/:id", delcontactus);
router.get("/admin/viewonecontactus/:id", viewonecontactus);

module.exports = router;
