const express = require("express");
const router = express.Router();

const { addrole, allrole } = require("../controller/role");

//Paths
router.post("/admin/addrole", addrole);
router.get("/admin/allrole", allrole);

module.exports = router;
