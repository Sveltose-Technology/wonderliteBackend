const Buy_xget_y = require("../models/buy_xget_y");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.addbuy_xget_y = async (req, res) => {
  const {
    product_title,
    product_img,
    price,
    qty,
    specification,
    product_spe,
    description,
    sortorder,
    status,
  } = req.body;

  const newBuy_xget_y = new Buy_xget_y({
    product_title: product_title,
    product_img: product_img,
    price: price,
    qty: qty,
    specification: specification,
    product_spe: product_spe,
    description: description,
    sortorder: sortorder,
    status: status,
  });

  if (req.file) {
    const findexist = await Buy_xget_y.findOne({
      product_title: product_title,
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
        newBuy_xget_y.product_img = resp.secure_url;
        fs.unlinkSync(req.file.path);
        newBuy_xget_y.save().then(
          res.status(200).json({
            status: true,
            msg: "success",
            data: newBuy_xget_y,
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
    const findexist = await Buy_xget_y.findOne({
      product_title: product_title,
    });
    if (findexist) {
      res.status(400).json({
        status: false,
        msg: "Already Exists",
        data: {},
      });
    } else {
      newBuy_xget_y
        .save()
        .then(
          res.status(200).json({
            status: true,
            msg: "success",
            data: newBuy_xget_y,
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

exports.editbrand = async (req, res) => {
  //const editbrand = req.body;
  //console.log(editbrand);
  const findandUpdateEntry = await Brand.findOneAndUpdate(
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

exports.viewonebrand = async (req, res) => {
  const findone = await Brand.findOne({ _id: req.params.id });
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

exports.allbuy_xget_y = async (req, res) => {
  const findall = await Buy_xget_y.find().sort({ sortorder: 1 });
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

exports.deletebrand = async (req, res) => {
  try {
    const deleteentry = await Brand.deleteOne({ _id: req.params.id });
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
