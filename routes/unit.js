const express = require("express")
const router = express.Router()


const { addunits, editunits, viewoneunits, viewallunits, delunits } = require("../controller/unit")

router.post("/admin/addunits", addunits)
router.post("/admin/editunits/:id", editunits)
router.get("/admin/viewoneunits/:id", viewoneunits)
router.get("/admin/viewallunits", viewallunits)
router.delete("/admin/delunits/:id", delunits)

module.exports = router;