const Exclusivevalue_deal = require("../models/exclusivevalue_deal");
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

exports.add_exclusivevaluedeal = async (req, res) => {
  const {
    exclusivedeal_title,
    product,
    // dealer,
    // manufacturer,
    // stocklist,
    // distributer,
    // sretailer,
    // rate_retailer,
    // rate_builder_contractor,
    // customer,
    product_img,
    description,
    sortorder,
    status,
  } = req.body;

  const newExclusivevalue_deal = new Exclusivevalue_deal({
    exclusivedeal_title: exclusivedeal_title,
    product: product,
    dealer: dealer,
    manufacturer: manufacturer,
    // stocklist: stocklist,
    // distributer: distributer,
    // sretailer: sretailer,
    // rate_retailer: rate_retailer,
    // rate_builder_contractor: rate_builder_contractor,
    // customer: customer,
    product_img: product_img,
    description: description,
    sortorder: sortorder,
    status: status,
  });

  if (req.file) {
    const findexist = await Exclusivevalue_deal.findOne({
      exclusivedeal_title: exclusivedeal_title,
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
        newExclusivevalue_deal.product_img = resp.secure_url;
        fs.unlinkSync(req.file.path);
        newExclusivevalue_deal.save().then(
          res.status(200).json({
            status: true,
            msg: "success",
            data: newExclusivevalue_deal,
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
    const findexist = await Exclusivevalue_deal.findOne({
      exclusivedeal_title: exclusivedeal_title,
    });
    if (findexist) {
      res.status(400).json({
        status: false,
        msg: "Already Exists",
        data: {},
      });
    } else {
      newExclusivevalue_deal
        .save()
        .then(
          res.status(200).json({
            status: true,
            msg: "success",
            data: newExclusivevalue_deal,
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
exports.allexclusive_deal = async (req, res) => {
  //const getuser = await User.findOne({ _id: req.userId });
  const findall = await Exclusivevalue_deal.find()
    .populate("product")
    .sort({ sortorder: 1 });
  if (findall) {
    res.status(200).json({
      status: true,
      msg: "success",
      data: findall,
      //usertype: getuser.usertype,
    });
  } else {
    res.status(400).json({
      status: false,
      msg: "error",
      error: "error",
    });
  }
};

//console.log()
//console.log()
exports.oneexclusive_deal = async (req, res) => {
  const getuser = await User.findOne({ _id: req.userId });
  const findone = await Exclusivevalue_deal.findOne({
    _id: req.params.id,
  }).populate("product");

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

exports.del_exclusivedeal = async (req, res) => {
  try {
    const deleteentry = await Exclusivevalue_deal.deleteOne({
      _id: req.params.id,
    });
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

exports.edit_exclusivedeal = async (req, res) => {
  const {
    exclusivedeal_title,
    product,
    product_price,
    product_img,
    description,
    sortorder,
    status,
  } = req.body;

  data = {};
  if (exclusivedeal_title) {
    data.exclusivedeal_title = exclusivedeal_title;
  }
  if (product) {
    data.product = product;
  }
  if (product_price) {
    data.product_price = product_price;
  }
  if (description) {
    data.description = description;
  }

  if (sortorder) {
    data.sortorder = sortorder;
  }
  if (status) {
    data.status = status;
  }
  //console.log(req.file);
  if (req.file) {
    const response = await cloudinary.uploader.upload(req.file.path);
    data.product_img = response.secure_url;
    fs.unlinkSync(req.file.path);
  }
  //console.log(data);
  if (data) {
    const findandUpdateEntry = await Exclusivevalue_deal.findOneAndUpdate(
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
