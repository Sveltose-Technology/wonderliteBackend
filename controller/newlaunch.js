const Newlaunch = require("../models/newlaunch");
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

exports.add_newlaunch = async (req, res) => {
  const {
    newlaunch_title,
    product,
    product_price,
    dealer,
    manufacturer,
    stocklist,
    distributer,
    sretailer,
    rate_retailer,
    rate_builder_contractor,
    customer,
    product_img,
    description,
    sortorder,
    status,
  } = req.body;

  const newNewlaunch = new Newlaunch({
    newlaunch_title: newlaunch_title,
    product: product,
    product_price: product_price,
    dealer: dealer,
    manufacturer: manufacturer,
    stocklist: stocklist,
    distributer: distributer,
    sretailer: sretailer,
    rate_retailer: rate_retailer,
    rate_builder_contractor: rate_builder_contractor,
    customer: customer,
    product_img: product_img,
    description: description,
    sortorder: sortorder,
    status: status,
  });

  if (req.file) {
    const findexist = await Newlaunch.findOne({
      newlaunch_title: newlaunch_title,
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
        newNewlaunch.product_img = resp.secure_url;
        fs.unlinkSync(req.file.path);
        newNewlaunch.save().then(
          res.status(200).json({
            status: true,
            msg: "success",
            data: newNewlaunch,
          })
        );
      } else {
        res.status(200).json({
          status: false,
          msg: "image not uploaded",
        });
      }
    }
  } else {
    const findexist = await Newlaunch.findOne({
      newlaunch_title: newlaunch_title,
    });
    if (findexist) {
      res.status(400).json({
        status: false,
        msg: "Already Exists",
        data: {},
      });
    } else {
      newNewlaunch
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

exports.viewonenewlaunch = async (req, res) => {
  const getuser = await User.findOne({ _id: req.userId });
  const findone = await Newlaunch.findOne({ _id: req.params.id }).populate(
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

exports.getnewlaunch = async (req, res) => {
  const getuser = await User.findOne({ _id: req.userId });
  const findall = await Newlaunch.find()
    .populate("product")
    .sort({ sortorder: 1 });
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

exports.delnewlaunch = async (req, res) => {
  try {
    const deleteentry = await Newlaunch.deleteOne({ _id: req.params.id });
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
