const express = require("express");
const router = express.Router();

const {
  addservicerequest,
  //allcontactus,
  //delcontactus,
  //viewonecontactus,
} = require("../controller/servicerequest");

//path
router.post("/admin/addservicerequest", addservicerequest);
//router.get("/admin/allcontactus", allcontactus);
//router.get("/admin/delcontactus/:id", delcontactus);
//router.get("/admin/viewonecontactus/:id", viewonecontactus);

module.exports = router;
