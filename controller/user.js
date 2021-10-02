const User = require("../models/user");
const Adduser = require("../models/user");
const EditUser = require("../models/user");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
//const product = require("../models/product");
const _ = require("lodash");
//const sendgrid = require("sendgrid-v3-node");
// const myPlaintextPassword = 's0/\/\P4$$w0rD';
// const someOtherPlaintextPassword = 'not_bacon';
const mailgun = require("mailgun-js")({
  apiKey: process.env.MAILGUN_APIKEY,
  domain: process.env.DOMAIN,
});
const DOMAIN = "sandbox1a4d2b3215714da9a918c2a61243184e.mailgun.org";
//const mg = mailgun({ apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN });
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

exports.adduserbyadmin = async (req, res) => {
  const {
    userID,
    username,
    usertype,
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
    address,
    country,
    state,
    city,
    udhyog_adhar_no,
    licence_no,
    eb_license,
    technician_assot_no,
    gov_licence_no,
    aadhar_no,
    farm_name,
    pancard_no,
    bank_name,
    bank_user_name,
    bank_account_no,
    ifsc_code,
    userImage,
  } = req.body;

  const salt = bcrypt.genSaltSync(saltRounds);
  const hashpassword = bcrypt.hashSync(password, salt);

  const newUser = new User({
    userID: userID,
    username: username,
    usertype: usertype,
    password: hashpassword,
    pincode: pincode,
    phone_no: phone_no,
    mobile_no: mobile_no,
    email: email,
    website: website,
    date_of_birth: date_of_birth,
    marriage_anniversary: marriage_anniversary,
    gstin_no: gstin_no,
    address: address,
    country: country,
    state: state,
    city: city,
    udhyog_adhar_no: udhyog_adhar_no,
    licence_no: licence_no,
    eb_license: eb_license,
    technician_assot_no: technician_assot_no,
    gov_licence_no: gov_licence_no,
    aadhar_no: aadhar_no,
    pancard_no: pancard_no,
    bank_name: bank_name,
    bank_user_name: bank_user_name,
    bank_account_no: bank_account_no,
    ifsc_code: ifsc_code,
    userImage: userImage,
    sortorder: sortorder,
    status: status,
  });

  if (req.file) {
    const findexist = await User.findOne({ userID: userID });
    if (findexist) {
      res.status(400).json({
        status: false,
        msg: "Already Exists",
        data: {},
      });
    } else {
      const resp = await cloudinary.uploader.upload(req.file.path);
      if (resp) {
        newUser.userImage = resp.secure_url;
        fs.unlinkSync(req.file.path);
        newUser
          .save()
          .then((data) => {
            res.status(200).json({
              status: true,
              msg: "success",
              data: data,
            });
          })
          .catch((error) => {
            res.status(400).json({
              status: false,
              msg: "error",
              error: error,
            });
          });
      } else {
        res.status(200).json({
          status: false,
          msg: "img not uploaded",
        });
      }
    }
  } else {
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
        .then((data) => {
          res.status(200).json({
            status: true,
            msg: " success",
            data: newUser,
          });
        })
        .catch((error) => {
          res.status(400).json({
            status: false,
            msg: "error",
            error: error,
          });
        });
    }
  }
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
    // console.log("Email.sent" + info.response);
  }
  smtptransporter.close();
});

exports.emailSend = async (req, res) => {
  //console.log(req.body.email);
  let data = await User.findOne({ email: req.body.email });
  //console.log(data);
  const responseType = {};
  if (data) {
    let otpcode = Math.floor(Math.random() * 10000 + 1);
    //console.log(data + "if");
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
    //console.log(data + "else");
    responseType.statusText = "error";
    responseType.message = "email Id not exist";
  }
  res.status(200).json(responseType);
};

// exports.forgotPassword = async (req, res) => {
//   let data = await User.find({ email: req.body.email, code: req.body.otpcode });
//   const response = {};
//   if (data) {
//     let currentTime = new Date().getTime();
//     let diff = data.expireIn - currentTime;
//     if (diff < 0) {
//       response.message = "Token Expire";
//       response.statusText = "error";
//     } else {
//       //console.log(data);
//       let findandUpdateEntry = await User.findOneAndUpdate(
//         {
//           email: req.body.email,
//         },
//         { code: req.body.otpcode },
//         //{ password: req.body.password },
//         {
//           $set: req.body,
//         },
//         { new: true }
//       );
//       if (findandUpdateEntry) {
//         res.status(200).json({
//           status: true,
//           msg: "success",
//           data: findandUpdateEntry,
//         });
//       } else {
//         res.status(400).json({
//           status: false,
//           msg: "error",
//           error: "error",
//         });
//       }
//     }
//   }
// };

exports.forgotPassword = (req, res) => {
  const { email } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res
        .status(400)
        .json({ error: "User with this email does not exists" });
    }
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: "365d",
    });
    const data = {
      from: "somemailid",
      to: email,
      subject: "Account Activation Link",
      html: `
      <h2>Please Click on given link to reset your password</h2>
      <h2>${process.env.CLIENT_URL}/reset-password/${token}</h2>`,
    };
    return user.updateOne({ resetLink: token }, function (err, success) {
      if (err) {
        return res.status(400).json({ error: "reset link error" });
      } else {
        mailgun.messages().send(data, function (error, body) {
          console.log(body);
          if (error) {
            return res.json({
              error: err.message,
            });
          }
          return res.json({ message: "email has sent" });
        });
      }
    });
  });
};

// user.password = req.body.password;
//       new user.save();
//       response.message = "Password Changed successfully";
//       response.statusText = "success";
//     }
//   } else {
//     response.message = "Invalid Otp";
//     response.statusText = "error";
//   }
//   res.status(200).json(responseType);
// };

exports.resetPassword = (req, res) => {
  const { resetLink, newPass } = req.body;
  if (resetLink) {
    jwt.verify(
      resetLink,
      process.env.TOKEN_SECRET,
      function (error, decodedData) {
        if (error) {
          return res.status(401).json({
            error: "Incorrect token or it is expired",
          });
        }
        User.findOne({ resetLink }, (err, user) => {
          if (err || !user) {
            return res
              .status(400)
              .json({ error: "User with this token does not existe" });
          }
          const obj = {
            password: newPass,
          };

          user = _.extend(user, obj);
          user.save((err, result) => {
            if (err) {
              return res.status(400).json({ error: "reset password error" });
            } else {
              return res
                .status(200)
                .json({ message: "your password has been changed" });
            }
          });
        });
      }
    );
  } else {
    return res.status(401).json({ error: "Authentication error" });
  }
};

exports.edituser = async (req, res) => {
  const {
    userID,
    username,
    usertype,
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
    address,
    country,
    state,
    city,
    udhyog_adhar_no,
    licence_no,
    eb_license,
    technician_assot_no,
    gov_licence_no,
    aadhar_no,
    farm_name,
    pancard_no,
    bank_name,
    bank_user_name,
    bank_account_no,
    ifsc_code,
    role,
    userImage,
  } = req.body;

  data = {};
  if (userID) {
    data.userID = userID;
  }
  if (username) {
    data.username = username;
  }
  if (usertype) {
    data.usertype = usertype;
  }
  if (password) {
    data.password = password;
  }
  if (pincode) {
    data.pincode = pincode;
  }
  if (phone_no) {
    data.phone_no = phone_no;
  }
  if (mobile_no) {
    data.mobile_no = mobile_no;
  }
  if (email) {
    data.email = email;
  }
  if (sortorder) {
    data.sortorder = sortorder;
  }
  if (status) {
    data.status = status;
  }
  if (website) {
    data.website = website;
  }
  if (date_of_birth) {
    data.date_of_birth = date_of_birth;
  }
  if (marriage_anniversary) {
    data.marriage_anniversary = marriage_anniversary;
  }
  if (gstin_no) {
    data.gstin_no = gstin_no;
  }
  if (address) {
    data.address = address;
  }
  if (country) {
    data.country = country;
  }
  if (state) {
    data.state = state;
  }
  if (city) {
    data.city = city;
  }
  if (udhyog_adhar_no) {
    data.udhyog_adhar_no = udhyog_adhar_no;
  }
  if (licence_no) {
    data.licence_no = licence_no;
  }
  if (eb_license) {
    data.eb_license = eb_license;
  }
  if (technician_assot_no) {
    data.technician_assot_no = technician_assot_no;
  }
  if (gov_licence_no) {
    data.gov_licence_no = gov_licence_no;
  }
  if (aadhar_no) {
    data.aadhar_no = aadhar_no;
  }
  if (farm_name) {
    data.farm_name = farm_name;
  }
  if (pancard_no) {
    data.pancard_no = pancard_no;
  }
  if (bank_name) {
    data.bank_name = bank_name;
  }
  if (bank_user_name) {
    data.bank_user_name = bank_user_name;
  }
  if (bank_account_no) {
    data.bank_account_no = bank_account_no;
  }
  if (ifsc_code) {
    data.ifsc_code = ifsc_code;
  }
  if (role) {
    data.role = role;
  }
  //console.log(req.file);
  if (req.file) {
    const response = await cloudinary.uploader.upload(req.file.path);
    data.userImage = response.secure_url;
    fs.unlinkSync(req.file.path);
  }
  //console.log(data)
  if (data) {
    const findandUpdateEntry = await User.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: data },
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
  //console.log(mobile_no.length);
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

exports.adduser = async (req, res) => {
  const {
    userID,
    username,
    email,
    mobile_no,
    pincode,
    business_name,
    aadhar_no,
    aadhar_img,
    pancard_no,
    eb_license,
    gstin_no,
    farm_name,
    trade_licence,
    udhyog_adhar_no,
    trade_mark,
  } = req.body;
  const newAdduser = new Adduser({
    userID: userID,
    username: username,
    email: email,
    mobile_no: mobile_no,
    pincode: pincode,
    business_name: business_name,
    aadhar_no: aadhar_no,
    aadhar_img: aadhar_img,
    pancard_no: pancard_no,
    gstin_no: gstin_no,
  });

  const findexist = await Adduser.findOne(
    { mobile_no: mobile_no },
    { email: email }
  );
  if (findexist) {
    res.status(400).json({
      status: false,
      msg: "Already Exist",
      data: {},
    });
  } else if (eb_license) {
    newAdduser.eb_license = eb_license;
    newAdduser.usertype = "TC";

    newAdduser
      .save()
      .then((data) => {
        res.status(200).json({
          status: true,
          msg: "success",
          data: data,
        });
      })
      .catch((error) => {
        res.status(200).json({
          status: false,
          msg: "error occured",
          error: error,
        });
      });
  } else if (farm_name) {
    newAdduser.farm_name = farm_name;
    newAdduser.usertype = "CB";

    newAdduser
      .save()
      .then((data) => {
        res.status(200).json({
          status: true,
          msg: "success",
          data: data,
        });
      })
      .catch((error) => {
        res.status(200).json({
          status: false,
          msg: "error occured",
          error: error,
        });
      });
  } else if (trade_licence) {
    newAdduser.trade_licence = trade_licence;
    newAdduser.usertype = "RR";

    newAdduser
      .save()
      .then((data) => {
        res.status(200).json({
          status: true,
          msg: "success",
          data: data,
        });
      })
      .catch((error) => {
        res.status(200).json({
          status: false,
          msg: "error occured",
          error: error,
        });
      });
  } else if (udhyog_adhar_no || trade_mark) {
    newAdduser.udhyog_adhar_no = udhyog_adhar_no;
    newAdduser.trade_mark = trade_mark;
    newAdduser.usertype = "MM";

    newAdduser
      .save()
      .then((data) => {
        res.status(200).json({
          status: true,
          msg: "success",
          data: data,
        });
      })
      .catch((error) => {
        res.status(200).json({
          status: false,
          msg: "error occured",
          error: error,
        });
      });
  }
};

exports.edit_userprofile = async (req, res) => {
  const {
    username,
    business_name,
    mobile_no,
    alt_mobileno,
    email,
    gst_no,
    address,
    state,
    city,
    pincode,
    bank_name,
    account_name,
    account_no,
    ifsc_no,
    userImage,
    area,
  } = req.body;

  // const newEditUser = new EditUser({
  //   userID: userID,
  //   username: username,
  //   business_name: business_name,
  //   mobile_no: mobile_no,
  //   alt_mobileno: alt_mobileno,
  //   email: email,
  //   gst_no: gst_no,
  //   address: address,
  //   state: state,
  //   city: city,
  //   pincode: pincode,
  //   bank_name: bank_name,
  //   account_name: account_name,
  //   account_no: account_no,
  //   ifsc_no: ifsc_no,
  //   userImage: userImage,
  //   area: area,
  // });

  data = {};

  if (username) {
    data.username = username;
  }
  if (business_name) {
    data.business_name = business_name;
  }
  if (mobile_no) {
    data.mobile_no = mobile_no;
  }
  if (alt_mobileno) {
    data.alt_mobileno = alt_mobileno;
  }
  if (email) {
    data.email = email;
  }
  if (gst_no) {
    data.gst_no = gst_no;
  }
  if (address) {
    data.address = address;
  }
  if (state) {
    data.state = state;
  }
  if (city) {
    data.city = city;
  }
  if (pincode) {
    data.pincode = pincode;
  }
  if (bank_name) {
    data.bank_name = bank_name;
  }
  if (account_name) {
    data.account_name = account_name;
  }
  if (account_no) {
    data.account_no = account_no;
  }
  if (ifsc_no) {
    data.ifsc_no = ifsc_no;
  }
  if (area) {
    data.area = area;
  }

  if (req.file) {
    const response = await cloudinary.uploader.upload(req.file.path);
    data.userImage = response.secure_url;
    fs.unlinkSync(req.file.path);
  }
  console.log(data);
  if (data) {
    const findandUpdateEntry = await User.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: data },
      { new: true }
    )
      .then((data) => {
        res.status(200).json({
          status: true,
          msg: "success",
          data: data,
        });
      })
      .catch((error) => {
        res.status(400).json({
          status: false,
          msg: "error",
          error: error,
        });
      });
  }
};
