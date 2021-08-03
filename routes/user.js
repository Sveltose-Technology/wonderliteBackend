const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
//const { auth } = require("./middlewares/auth");
const {
  adduser,
  edituser,
  viewoneuser,
  alluser,
  deleteuser,
  login,
  //forget_email_otp,
  logout,
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

//router.post("/user/logout", logout);

let auth = (req, res, next) => {
  let token = req.cookies.auth;
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user)
      return res.json({
        error: true,
      });

    req.token = token;
    req.user = user;
    next();
  });
};

//router.post("/user/resetpass", forget_email_otp);
router.get("/user/logout", auth, function (req, res) {
  req.user.deleteToken(req.token, (err, user) => {
    if (err) return res.status(400).send(err);
    res.sendStatus(200);
  });
});

router.post("/user/edituser/:id", edituser);
router.get("/user/viewoneuser/:id", viewoneuser);
router.get("/user/alluser", alluser);
router.delete("/user/deleteuser/:id", deleteuser);
router.post("/user/add", add);
router.post("/user/addimg/:id", uploads.single("user_img"), user_img);

module.exports = router;
