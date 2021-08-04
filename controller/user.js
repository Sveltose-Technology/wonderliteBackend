const User = require("../models/user");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const product = require("../models/product");
//const sendgrid = require("sendgrid-v3-node");
// const myPlaintextPassword = 's0/\/\P4$$w0rD';
// const someOtherPlaintextPassword = 'not_bacon';

const validatePassword = (password, dbpassword) => {
  bcrypt.compareSync(password, dbpassword);
  return true;
};

function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: "1800h" });
}

// function authenticateToken(req, res, next) {
//     const authHeader = req.headers['authorization']
//     const token = authHeader && authHeader.split(' ')[1]

//     if (token == null) return res.sendStatus(401)

//     jwt.verify(token, process.env.TOKEN_SECRET, (err:, user: ) => {
//       console.log(err)

//       if (err) return res.sendStatus(403)

//       req.user = user

//       next()
//     })
//   }

exports.adduser = async (req, res) => {
  const {
    userID,
    username,
    password,
    pincode,
    phone_no,
    mobile_no,
    email,
    sortorder,
    status,
    website,
    date_of_birth,
    marriage_anniversary,
    gstin_no,
    udhyog_adhar_no,
    licence_no,
    technician_assot_no,
    gov_licence_no,
    aadhar_no,
    pancard_no,
    bank_name,
    bank_user_name,
    bank_account_no,
    ifsc_code,
    role,
    userImage,
  } = req.body;

  const salt = bcrypt.genSaltSync(saltRounds);
  const hashpassword = bcrypt.hashSync(password, salt);

  const token = generateAccessToken({ username: username });

  const newUser = new User({
    userID: userID,
    username: username,
    password: hashpassword,
    pincode: pincode,
    phone_no: phone_no,
    mobile_no: mobile_no,
    email: email,
    website: website,
    date_of_birth: date_of_birth,
    marriage_anniversary: marriage_anniversary,
    gstin_no: gstin_no,
    udhyog_adhar_no: udhyog_adhar_no,
    licence_no: licence_no,
    technician_assot_no: technician_assot_no,
    gov_licence_no: gov_licence_no,
    aadhar_no: aadhar_no,
    pancard_no: pancard_no,
    bank_name: bank_name,
    bank_user_name: bank_user_name,
    bank_account_no: bank_account_no,
    ifsc_code: ifsc_code,
    role: role,
    userImage: userImage,
    sortorder: sortorder,
    status: status,
  });

  const findexist = await User.findOne({ userID: userID });
  if (findexist) {
    res.status(400).json({
      status: false,
      msg: "Already Exists",
      data: {},
    });
  } else {
    newUser
      .save()
      .then(
        res.status(200).json({
          status: true,
          msg: "success",
          data: newUser,
        })
      )
      .catch((error) => {
        res.status(400).json({
          status: false,
          msg: "error",
          error: error,
        });
      });
  }
};

exports.add = function (req, res, next) {
  const { email, product_id, qty } = req.body;
  const qtyint = Number.parseInt(qty);
  console.log("qty: ", qtyint);
  User.findOneAndUpdate(
    { email: email },
    { $push: { cart: product_id } },
    // { $pop: { cart: product_id } },
    { safe: true }
  ).populate("cart");
  User.findOne({ email: email })
    .exec()
    .then((user) => {
      //console.log(cart);
      //cartarray.push(product_id);
      //console.log(newcart);
      //cart.cart.push(product_id)
      // User.findOneAndUpdate(
      //   { email: email },
      //   { $set: { cart: product_id } },
      //   { new: true }
      // );
      res.status(200).json({
        status: true,
        user: user,
      });
    })
    // const savedproduct =
    // if (!cart && qty <= 0) {
    //   throw new Error("Invalid request");
    // } else if (cart) {
    //   const indexFound = cart.items.findIndex((item) => {
    //     return item.product_id === product_id;
    //   });
    //   if (indexFound !== -1 && qty <= 0) {
    //     cart.items.splice(indexFound, 1);
    //   } else if (indexFound !== -1) {
    //     cart.items[indexFound].qty = cart.items[indexFound].qty + qty;
    //   } else if (qty > 0) {
    //     cart.items.push({
    //       product_id: product_id,
    //       qty: qty,
    //     });
    //   } else {
    //     throw new Error("Invalid request");
    //   }
    //   return cart.save();
    // } else {
    //   const cartData = {
    //     email: email,
    //     items: [
    //       {
    //         product_id: product_id,
    //         qty: qty,
    //       },
    //     ],
    //   };
    //   cart = new Cart(cartData);
    //   return cart.save();
    // }
    //})
    //.then((savedCart) => res.json(savedCart))
    .catch((err) => {
      res.send(err);
      // let error;
      // if (err.message === "Invalid request") {
      //   error = new APIError(err.message, httpStatus.BAD_REQUEST, true);
      // } else {
      //   error = new APIError(err.message, httpStatus.NOT_FOUND);
      // }
      // return next(error);
    });
};

exports.login = async (req, res) => {
  const { userID, password } = req.body;

  // Find user with requested email
  User.findOne({ userID: userID }, function (err, user) {
    if (user === null) {
      return res.status(400).send({
        message: "User not found.",
      });
    } else {
      if (validatePassword(password, user.password)) {
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
          expiresIn: "365d",
        });

        return res.status(201).send({
          message: "User Logged In",
          token: token,
          user: user,
        });
      } else {
        return res.status(400).send({
          message: "Wrong Password",
        });
      }
    }
  });
};

const nodemailer = require("nodemailer");
var smtptransporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: "test12@gmail.com",
    pass: "pass@123",
  },
});
var mailOptions = {
  from: "test12@gmail.com",
  to: "guptapratima98710@gmail.com",
  subject: "Sending mail using node js",
  text: "hii",
};

smtptransporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    //console.log(error);
  } else {
    console.log("Email.sent" + info.response);
  }
  smtptransporter.close();
});

exports.emailSend = async (req, res) => {
  console.log(req.body.email);
  let data = await User.findOne({ email: req.body.email });
  console.log(data);
  const responseType = {};
  if (data) {
    let otpcode = Math.floor(Math.random() * 10000 + 1);
    console.log(data + "if");
    let otpData = new User({
      email: req.body.email,
      code: otpcode,
      expireIn: new Date().getTime() + 300 * 1000,
    });
    let otpResponse = await otpData.save();
    responseType.statusText = "success";
    responseType.message = "please check your email Id";
    responseType.data = otpData;
  } else {
    console.log(data + "else");
    responseType.statusText = "error";
    responseType.message = "email Id not exist";
  }
  res.status(200).json(responseType);
};

exports.changePassword = async (req, res) => {
  let data = await User.find({ email: req.body.email, code: req.body.otpcode });
  const response = {};
  if (data) {
    let currentTime = new Date().getTime();
    let diff = data.expireIn - currentTime;
    if (diff < 0) {
      response.message = "Token Expire";
      response.statusText = "error";
    } else {
      let user = await User.findOneAndUpdate({
        email: req.body.email,
        password: req.body.password,
      });
      // user.password = req.body.password;
      new user.save();
      response.message = "Password Changed successfully";
      response.statusText = "success";
    }
  } else {
    response.message = "Invalid Otp";
    response.statusText = "error";
  }
  res.status(200).json(responseType);
};

exports.edituser = async (req, res) => {
  const findandUpdateEntry = await User.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { $set: req.body },
    { new: true }
  );
  if (findandUpdateEntry) {
    res.status(200).json({
      status: true,
      msg: "success",
      data: findandUpdateEntry,
    });
  } else {
    res.status(400).json({
      status: false,
      msg: "error",
      error: "error",
    });
  }
};

exports.viewoneuser = async (req, res) => {
  const findone = await User.findOne({ _id: req.params.id });
  if (findone) {
    res.status(200).json({
      status: true,
      msg: "success",
      data: findone,
    });
  } else {
    res.status(400).json({
      status: false,
      msg: "error",
      error: "error",
    });
  }
};

exports.alluser = async (req, res) => {
  const findall = await User.find().sort({ sortorder: 1 });
  if (findall) {
    res.status(200).json({
      status: true,
      msg: "success",
      data: findall,
    });
  } else {
    res.status(400).json({
      status: false,
      msg: "error",
      error: "error",
    });
  }
};

exports.deleteuser = async (req, res) => {
  try {
    const deleteentry = await User.deleteOne({ _id: req.params.id });
    res.status(200).json({
      status: true,
      msg: "success",
      data: deleteentry,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      msg: "error",
      error: error,
    });
  }
};

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.user_img = async (req, res) => {
  const findone = await User.findOne({ _id: req.params.id });
  if (findone) {
    // console.log(req.params.id);
    // console.log(req.file);
    const response = await cloudinary.uploader.upload(req.file.path);
    if (response) {
      const findandUpdateEntry = await User.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        { $set: { product_img: response.secure_url } },
        { new: true }
      );
      if (findandUpdateEntry) {
        res.status(200).json({
          status: true,
          msg: "success",
          data: findandUpdateEntry,
        });
      } else {
        res.status(400).json({
          status: false,
          msg: "Image not set",
        });
      }
    } else {
      res.status(400).json({
        status: false,
        msg: "Error in file uploading",
      });
    }
  } else {
    res.status(400).json({
      status: false,
      msg: "User Not Found",
    });
  }
};

const defaultotp = 1234;
exports.sendotp = async (req, res) => {
  const { mobile_no } = req.body;
  console.log(mobile_no.length);
  if (mobile_no) {
    res.status(200).json({
      status: true,
      msg: "otp send successfully",
      mobile: mobile_no,
      otp: defaultotp,
    });
  } else {
    res.status(400).json({
      status: false,
      msg: "please send mobile number",
    });
  }
};

exports.verifyotp = async (req, res) => {
  const { mobile_no, otp } = req.body;

  if (otp == 1234) {
    const findone = await User.findOne({ mobile_no: mobile_no });
    if (findone) {
      res.status(200).json({
        status: true,
        msg: "user already exist",
        alreadyexist: true,
        mobile: mobile_no,
        otp: defaultotp,
      });
    } else {
      res.status(200).json({
        status: true,
        msg: "otp verified please register",
        alreadyexist: false,
        mobile: mobile_no,
        otp: defaultotp,
      });
    }
  } else {
    res.status(400).json({
      status: false,
      msg: "Incorrect otp",
    });
  }
};
