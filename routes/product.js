const express = require("express")
const router = express.Router()

const {addproduct,editproduct,viewoneproduct,allproduct,deleteproduct} = require("../controller/product")

//Paths
router.post("/admin/addproduct", addproduct)
router.post("/admin/editproduct/:id", editproduct)
router.get("/admin/viewoneproduct/:id", viewoneproduct)
router.get("/admin/allproduct", allproduct)
router.delete("/admin/deleteproduct/:id", deleteproduct)

module.exports = router