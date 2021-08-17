const express = require("express");
const router = express.Router();

const {
  addservicerequest,
  allservicerequest,
} = require("../controller/servicerequest");

//Paths
router.post("/admin/addservicerequest", addservicerequest);

router.get("/admin/allservicerequest", allservicerequest);
//router.delete("/admin/deletestaff/:id", deletestaff)

module.exports = router;
