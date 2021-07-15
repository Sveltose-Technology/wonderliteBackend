const express = require("express")
const router = express.Router()

const { addbrand, editbrand, viewonebrand, allbrand, deletebrand } = require("../controller/brand")

//Paths
router.post("/admin/addbrand", addbrand)
router.post("/admin/editbrand/:id", editbrand)
router.get("/admin/viewonebrand/:id", viewonebrand)
router.get("/admin/allbrand", allbrand)
router.delete("/admin/deletebrand/:id", deletebrand)

module.exports = router