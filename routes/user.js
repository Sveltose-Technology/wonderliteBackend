const express = require("express")
const router = express.Router() 

const { adduser, edituser, viewoneuser, alluser, deleteuser, login } = require("../controller/user")

//Paths
router.post("/user/signup", adduser)
router.post("/user/login", login)


router.post("/user/edituser/:id", edituser)
router.get("/user/viewoneuser/:id", viewoneuser)
router.get("/user/alluser", alluser)
router.delete("/user/deleteuser/:id", deleteuser)

module.exports = router