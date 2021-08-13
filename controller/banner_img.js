const Addbanner = require("../models/banner_img");
const fs = require("fs");
//const { url } = require("inspector");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.addbanner = async (req, res) => {
  const { banner_title, bannertype, banner_img, status } = req.body;

  console.log(banner_img);
  const newAddbanner = new Addbanner({
    banner_title: banner_title,
    banner_img: banner_img,
    bannertype: bannertype,
    status: status,
  });

  if (req.file) {
    const findexist = await Addbanner.findOne({
      banner_title: banner_title,
    });
    if (findexist) {
      res.status(400).json({
        status: false,
        msg: "Already Exists",
        data: {},
      });
    } else {
      const resp = await cloudinary.uploader.upload(req.file.path);
      if (resp) {
        newAddbanner.banner_img = resp.secure_url;
        fs.unlinkSync(req.file.path);
        newAddbanner.save().then(
          res.status(200).json({
            status: true,
            msg: "success",
            data: newAddbanner,
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
    const findexist = await Addbanner.findOne({
      banner_title: banner_title,
    });
    if (findexist) {
      res.status(400).json({
        status: false,
        msg: "Already Exists",
        data: {},
      });
    } else {
      newAddbanner
        .save()
        .then(
          res.status(200).json({
            status: true,
            msg: "success",
            data: newAddbanner,
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

exports.editbannerimg = async (req, res) => {
  const findandUpdateEntry = await Addbanner.findOneAndUpdate(
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

exports.getbannerbytype = async (req, res) => {
  const findall = await Addbanner.find({
    bannertype: req.params.id,
  }).sort({ sortorder: 1 });
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

exports.allbanner = async (req, res) => {
  const findall = await Addbanner.find().sort({ sortorder: 1 });
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
