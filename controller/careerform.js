const Careerform = require("../models/careerform");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.addcareerform = async (req, res) => {
  const {
    first_name,
    last_name,
    email_address,
    phone_no,
    state,
    city,
    enterfield_choice,
    summary,
    career_img,
  } = req.body;

  const newCareerform = new Careerform({
    first_name: first_name,
    last_name: last_name,
    email_address: email_address,
    phone_no: phone_no,
    state: state,
    city: city,
    enterfield_choice: enterfield_choice,
    summary: summary,
    career_img: career_img,
  });

  if (req.file) {
    const findexist = await Careerform.findOne({ phone_no: phone_no });
    if (findexist) {
      res.status(400).json({
        status: false,
        msg: "Already Exists",
        data: {},
      });
    } else {
      const resp = await cloudinary.uploader.upload(req.file.path);
      if (resp) {
        newCareerform.career_img = resp.secure_url;
        fs.unlinkSync(req.file.path);
        newCareerform.save().then(
          res.status(200).json({
            status: true,
            msg: "success",
            data: newCareerform,
          })
        );
      } else {
        res.status(200).json({
          status: false,
          msg: "img not uploaded",
        });
      }
    }
  } else {
    const findexist = await Careerform.findOne({ phone_no: phone_no });
    if (findexist) {
      res.status(400).json({
        status: false,
        msg: "Already Exists",
        data: {},
      });
    } else {
      newCareerform
        .save()
        .then(
          res.status(200).json({
            status: true,
            msg: "success",
            data: newCareerform,
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
  }
};
exports.allcareerform = async (req, res) => {
  const findall = await Careerform.find().sort({ sortorder: 1 });
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

exports.delcareerform = async (req, res) => {
  try {
    const deleteentry = await Careerform.deleteOne({ _id: req.params.id });
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
