const express = require("express");
const router = express.Router();

const { add_rewardpoint } = require("../controller/rewardpoint");

//path

router.post("/admin/add_rewardpoint", add_rewardpoint);

module.exports = router;
