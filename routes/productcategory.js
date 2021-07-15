const express = require("express")
const router = express.Router()

const { addproductcategory, editproductcategory, viewoneproductcategory, allproductcategory, deleteproductcategory } = require("../controller/productcategory")

//Paths
router.post("/admin/addproductcategory", addproductcategory)
router.post("/admin/editproductcategory/:id", editproductcategory)
router.get("/admin/viewoneproductcategory/:id", viewoneproductcategory)
router.get("/admin/allproductcategory", allproductcategory)
router.delete("/admin/deleteproductcategory/:id", deleteproductcategory)

module.exports = router