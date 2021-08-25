const express = require("express");
const router = express.Router();

const { add_video } = require("../controller/videoslideshow");

//Paths
router.post("/admin/addvideo", add_video);

module.exports = router;
