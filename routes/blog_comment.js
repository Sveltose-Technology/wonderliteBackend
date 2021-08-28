const express = require("express");
const router = express.Router();

const {
  add_comment,
  all_comment,
  delete_comment,
  allcommentby_cat,
} = require("../controller/blog_comment");

//Paths
router.post("/admin/add_comment", add_comment);
router.get("/admin/all_comment", all_comment);
router.get("/admin/delete_comment/:id", delete_comment);
router.get("/admin/comments/:id", allcommentby_cat);

module.exports = router;
