const express = require("express");
const router = express.Router();

const { addblog, allblog, delblog } = require("../controller/blog");

//Path
router.post("/admin/addblog", addblog);
router.get("/admin/allblog", allblog);
router.get("/admin/delblog/:id", delblog);

module.exports = router;
