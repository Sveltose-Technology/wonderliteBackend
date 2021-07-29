const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const {
  adduser,
  edituser,
  viewoneuser,
  alluser,
  deleteuser,
  login,
  add,
  user_img,
} = require("../controller/user");

// if (!fs.existsSync("uploads")) {
//   fs.mkdirSync("uploads");
//}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //cb(null, "/uploads");
    let path = `./tempimages`;
    if (!fs.existsSync("tempimages")) {
      fs.mkdirSync("tempimages");
    }
    cb(null, path);
  },
  // filename: function (req, file, cb) {
  //   cb(null, new Date().toISOString() + "-" + file.originalname);
  // },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.includes("jpeg") ||
    file.mimetype.includes("png") ||
    file.mimetype.includes("jpg")
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let uploads = multer({ storage: storage });
//Paths
router.post("/user/signup", adduser);
router.post("/user/login", login);

router.post("/user/edituser/:id", edituser);
router.get("/user/viewoneuser/:id", viewoneuser);
router.get("/user/alluser", alluser);
router.delete("/user/deleteuser/:id", deleteuser);
router.post("/user/add", add);
router.post("/user/addimg/:id", uploads.single("user_img"), user_img);

module.exports = router;
