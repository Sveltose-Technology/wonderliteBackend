const express = require("express");
const router = express.Router();

const {
  addrequired,
  viewallrequired,
  viweonerequired,
  delrequired,
  editrequired,
} = require("../controller/required");

//paths

router.post("/admin/addrequired", addrequired);
router.post("/admin/editrequired/:id", editrequired);
router.get("/admin/viweonerequired/:id", viweonerequired);
router.get("/admin/viewallrequired", viewallrequired);
router.get("/admin/delrequired/:id", delrequired);

module.exports = router;
