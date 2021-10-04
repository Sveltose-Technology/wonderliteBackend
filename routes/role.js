const express = require("express");
const router = express.Router();

const { addrole } = require("../controller/role");

//Paths
router.post("/admin/addrole", addrole);

module.exports = router;
