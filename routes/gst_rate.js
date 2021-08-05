const express = require("express");
const router = express.Router();

const {
  addgst,
  viewone,
  viewall,
  editgst,
  delgst,
} = require("../controller/gst_rate");

//path
router.post("/admin/addgst", addgst);
router.get("/admin/viewonegst/:id", viewone);
router.get("/admin/viewallgst", viewall);
router.post("/admin/editgst/:id", editgst);
router.get("/admin/deletegst/:id", delgst);

module.exports = router;
