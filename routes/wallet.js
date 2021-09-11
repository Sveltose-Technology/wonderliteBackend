const express = require("express");
const router = express.Router();

const { addto_wallet } = require("../controller/wallet");

//path

router.post("/admin/add_wallet", addto_wallet);

module.exports = router;
