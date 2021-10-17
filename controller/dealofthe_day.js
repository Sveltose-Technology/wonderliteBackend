const Dealoftheday = require("../models/dealofthe_day");
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

exports.add_dealoftheday = async (req, res) => {
  const {
    dealoftheday_title,
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
    expiry_date,
    sortorder,
    status,
  } = req.body;

  const newDealoftheday = new Dealoftheday({
    dealoftheday_title: dealoftheday_title,
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
    expiry_date: expiry_date,
    sortorder: sortorder,
    status: status,
  });

  if (req.file) {
    console.log(req.file);
    const findexist = await Dealoftheday.findOne({
      dealoftheday_title: dealoftheday_title,
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
        newDealoftheday.product_img = resp.secure_url;
        fs.unlinkSync(req.file.path);
        newDealoftheday.save().then((data) => {
          res.status(200).json({
            status: true,
            msg: "success",
            data: data,
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
    const findexist = await Dealoftheday.findOne({
      dealoftheday_title: dealoftheday_title,
    });
    if (findexist) {
      res.status(400).json({
        status: false,
        msg: "Already Exists",
        data: {},
      });
    } else {
      newDealoftheday
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

exports.viewonedeal = async (req, res) => {
  const getuser = await User.findOne({ _id: req.userId });

  const findone = await Dealoftheday.findOne({ _id: req.params.id }).populate(
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
exports.alldealoftheday = async (req, res) => {
  const getuser = await User.findOne({ _id: req.userId });
  const findall = await Dealoftheday.find().sort({ sortorder: 1 });
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

exports.del_dealoftheday = async (req, res) => {
  try {
    const deleteentry = await Dealoftheday.deleteOne({ _id: req.params.id });
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

exports.edit_dealoftheday = async (req, res) => {
  const findandUpdateEntry = await Dealoftheday.findOneAndUpdate(
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
