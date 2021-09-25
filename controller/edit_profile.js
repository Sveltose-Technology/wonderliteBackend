const Editprofile = require("../models/edit_profile");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.edit_profile = async (req, res) => {
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
  } = req.body;

  const newEditprofile = new Editprofile({
    username: username,
    business_name: business_name,
    mobile_no: mobile_no,
    alt_mobileno: alt_mobileno,
    email: email,
    gst_no: gst_no,
    address: address,
    state: state,
    city: city,
    pincode: pincode,
    bank_name: bank_name,
    account_name: account_name,
    account_no: account_no,
    ifsc_no: ifsc_no,
    userImage: userImage,
  });

  newEditprofile.save(function (err, data) {
    if (err) {
      res.status(400).json({
        status: false,
        msg: "Error Occured",
        error: err,
      });
    } else {
      res.status(200).json({
        status: true,
        msg: "Add Profile",
        data: newEditprofile,
      });
    }
  });
};

exports.edit_user_profile = (req, res) => {
  const { userID } = req.body;
  if (req.file) {
    const path = req.file.path;
    cloud
      .edit_profile(path, "profile")
      .then((resp) => {
        console.log(resp);
        fs.unlinkSync(path);
        User.updateOne(
          { _id: userID },
          { $set: { photo: resp.url, imgId: resp.imgId } }
        )
          .then((resp) => {
            res.json({ code: 200, msg: "profile changed" });
          })
          .catch((error) => {
            res.json(error);
          });
      })
      .catch((err) => {
        res.send(err);
      });
  } else {
    res.json({ code: 400, msg: "image not selected" });
  }
};
