const express = require("express");
const router = express.Router();

const {
  add_comment,
  all_comment,
  delete_comment,
} = require("../controller/blog_comment");

//Paths
router.post("/admin/add_comment", add_comment);
router.get("/admin/all_comment", all_comment);
router.get("/admin/delete_comment/:id", delete_comment);

module.exports = router;
