const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const crypto = require("crypto");

//const { auth } = require("./middlewares/auth");
const {
  adduser,
  edituser,
  viewoneuser,
  alluser,
  deleteuser,
  login,
  emailSend,
  forgotPassword,
  logout,
  resetPassword,
  add,
  user_img,
  sendotp,
  verifyotp,
} = require("../controller/user");

// if (!fs.existsSync("uploads")) {
//   fs.mkdirSync("uploads");
//}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //console.log(file);
    let path = `./uploadesimages`;
    if (!fs.existsSync("uploadesimages")) {
      fs.mkdirSync("uploadesimages");
    }
    cb(null, path);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
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
router.post("/user/signup", uploads.single("userImage"), adduser);
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

// pass.serializeUser((user, cb) => cb(null, user));
// pass.deserializeUser((u, cb) => cb(null, u));

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
router.get("/user/deleteuser/:id", deleteuser);
//router.post("/user/add", add);
router.post("/user/emailSend", emailSend);
router.post("/user/forgotPassword", forgotPassword);
router.post("/user/resetPassword", resetPassword);

router.post("/user/addimg/:id", uploads.single("user_img"), user_img);

router.post("/user/sendotp", sendotp);
router.post("/user/verifyotp", verifyotp);

// router.post("/forgot", async (req, res, next) => {
//   const token = (await promisify(crypto.randomBytes)(20)).toString("hex");
//   const user = users.find((u) => u.email === req.body.email);
//   if (!user) {
//     req.flash("error", "No email with that email address exist");
//     return res.redirect("/forgot");
//   }
//   user.resetPasswordToken = token;
//   user.resetPasswordExpires = Date.now() + 3600000;
//   const resetEmail = {
//     to: user.email,
//     from: "test123@gmail.com",
//     subject: "Node js password Reset",
//     text: `
//    You are receiving this because you (or someone else) have requested the reset of the password for your account.
//       Please click on the following link, or paste this into your browser to complete the process:
//       http://${req.headers.host}/reset/${token}
//       If you did not request this, please ignore this email and your password will remain unchanged.
//     `,
//   };
// });

module.exports = router;
