const express = require("express")
const router = express.Router()

const { addproductsubcategory, editproductsubcategory, viewoneproductsubcategory, allproductsubcategory, deleteproductsubcategory, getsubcategory } = require("../controller/productsubcategory")

//Paths
router.post("/admin/addproductsubcategory", addproductsubcategory)
router.post("/admin/editproductsubcategory/:id", editproductsubcategory)
router.get("/admin/viewoneproductsubcategory/:id", viewoneproductsubcategory)
router.get("/admin/allproductsubcategory", allproductsubcategory)
router.delete("/admin/deleteproductsubcategory/:id", deleteproductsubcategory)
//get subcategories of passed category
router.get("/admin/getsubcategory/:id", getsubcategory)

module.exports = router