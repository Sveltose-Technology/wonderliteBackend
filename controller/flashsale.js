const Flashsale = require("../models/flashsale");
const User = require("../models/user");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.add_flashsale = async (req, res) => {
  const {
    flashsale_title,
    product,
    dealer,
    manufacturer,
    stocklist,
    distributer,
    sretailer,
    rate_retailer,
    rate_builder_contractor,
    customer,
    flashsale_img,
    description,
    sortorder,
    status,
  } = req.body;

  const newFlashsale = new Flashsale({
    flashsale_title: flashsale_title,
    product: product,
    dealer: dealer,
    manufacturer: manufacturer,
    stocklist: stocklist,
    distributer: distributer,
    sretailer: sretailer,
    rate_retailer: rate_retailer,
    rate_builder_contractor: rate_builder_contractor,
    customer: customer,
    flashsale_img: flashsale_img,
    description: description,
    sortorder: sortorder,
    status: status,
  });

  if (req.files) {
    const findexist = await Flashsale.findOne({
      flashsale_title: flashsale_title,
    });
    if (findexist) {
      res.status(400).json({
        status: false,
        msg: "Already Exists",
        data: {},
      });
    } else {
      // console.log(req.files);
      alluploads = [];
      for (let i = 0; i < req.files.length; i++) {
        const resp = await cloudinary.uploader.upload(req.files[i].path);
        alluploads.push(resp.secure_url);
      }
      //console.log(alluploads);

      if (alluploads.length !== 0) {
        newFlashsale.flashsale_img = alluploads;
        newFlashsale.save().then((result) => {
          res.status(200).json({
            status: true,
            msg: "success",
            data: result,
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
    // console.log("changed node");
    const findexist = await Flashsale.findOne({
      flashsale_title: flashsale_title,
    });
    if (findexist) {
      res.status(400).json({
        status: false,
        msg: "Already Exists",
        data: {},
      });
    } else {
      newFlashsale
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
    }
  }
};

exports.oneflashsale = async (req, res) => {
  const getuser = await User.findOne({ _id: req.userId });
  const findone = await Flashsale.findOne({ _id: req.params.id }).populate(
    "product"
  );

  if (findone) {
    res.status(200).json({
      status: true,
      msg: "success",
      data: findone,
      usertype: getuser.usertype,
    });
  } else {
    res.status(400).json({
      status: false,
      msg: "error",
      error: "error",
    });
  }
};
exports.allflashsale = async (req, res) => {
  const getuser = await User.findOne({ _id: req.userId });

  const findall = await Flashsale.find()
    .sort({ sortorder: 1 })
    .populate("product");
  if (findall) {
    res.status(200).json({
      status: true,
      msg: "success",
      data: findall,
      usertype: getuser.usertype,
    });
  } else {
    res.status(400).json({
      status: false,
      msg: "error",
      error: "error",
    });
  }
};

exports.delflashsale = async (req, res) => {
  try {
    const deleteentry = await Flashsale.deleteOne({ _id: req.params.id });
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

exports.editflashsale = async (req, res) => {
  const findandUpdateEntry = await Flashsale.findOneAndUpdate(
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
