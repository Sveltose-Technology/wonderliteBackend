const express = require("express");
const router = express.Router();

const {
  addbundleoffer,
  editbundleoffer,
  onebundleoffer,
  allbundleoffer,
  delbundleoffer,
} = require("../controller/bundleoffer");

//Path
router.post("/admin/addbundleoffer", addbundleoffer);
router.post("/admin/editbundleoffer/:id", editbundleoffer);
router.get("/admin/onebundleoffer/:id", onebundleoffer);
router.get("/admin/allbundleoffer", allbundleoffer);
router.delete("/admin/delbundleoffer/:id", delbundleoffer);

module.exports = router;
