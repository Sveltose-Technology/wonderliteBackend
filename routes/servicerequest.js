const express = require("express");
const router = express.Router();

const {
  addservicerequest,
  allservicerequest,
  delservicerequest,
} = require("../controller/servicerequest");

//Paths
router.post("/admin/addservicerequest", addservicerequest);

router.get("/admin/allservicerequest", allservicerequest);
router.get("/admin/delservicerequest/:id", delservicerequest);

module.exports = router;
