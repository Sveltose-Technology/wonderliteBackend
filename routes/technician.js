const express = require("express")
const router = express.Router()

const {addtechnician,edittechnician,viewonetechnician,alltechnician,deletetechnician} = require("../controller/technician")

//Paths
router.post("/admin/addtechnician", addtechnician)
router.post("/admin/edittechnician/:id", edittechnician)
router.get("/admin/viewonetechnician/:id", viewonetechnician)
router.get("/admin/alltechnician", alltechnician)
router.delete("/admin/deletetechnician/:id", deletetechnician)

module.exports = router