const express = require("express");
const router = express.Router();

const {
  addenquiry,
  editenquiry,
  viewoneenquiry,
  viewallenquiry,
  delenquiry,
} = require("../controller/enquiry");

//path

router.post("/admin/addenquiry", addenquiry);
router.post("/admin/editenquiry/:id", editenquiry);
router.get("/admin/viewoneenquiry/:id", viewoneenquiry);
router.get("/admin/viewallenquiry", viewallenquiry);
router.get("/admin/delenquiry/:id", delenquiry);

module.exports = router;
