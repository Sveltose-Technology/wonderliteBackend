const express = require("express");
const router = express.Router();

const {
  add_productreturn,
  addexchange,
} = require("../controller/returnandexchange");

//Paths
router.post("/admin/add_productreturn", add_productreturn);
router.post("/admin/addexchange", addexchange);
// router.get("/admin/viewoneaboutus/:id", viewoneaboutus);
// router.get("/admin/allaboutus", allaboutus);
// router.get("/admin/deleteaboutus/:id", deleteaboutus);

module.exports = router;
