const express = require("express");
const router = express.Router();

const { addservicerequest } = require("../controller/staff");

//Paths
router.post("/admin/addservicereq", addservicerequest);

//router.get("/admin/allstaff", allstaff)
//router.delete("/admin/deletestaff/:id", deletestaff)

module.exports = router;
