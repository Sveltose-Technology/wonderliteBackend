const Addproduct = require("../models/add_product");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.add_product = async (req, res) => {
  const {
    product_title,
    product,
    product_img,
    short_desc,
    long_desc,
    size,
    colour,
    sortorder,
    status,
  } = req.body;

  const newAddproduct = new Addproduct({
    product_title: product_title,
    product: product,
    product_img: product_img,
    short_desc: short_desc,
    long_desc: long_desc,
    size: size,
    colour: colour,
    sortorder: sortorder,
    status: status,
  });
  if (req.file) {
    const findexist = await Addproduct.findOne({
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
        newAddproduct.product_img = resp.secure_url;
        fs.unlinkSync(req.file.path);
        newAddproduct.save().then(
          res.status(200).json({
            status: true,
            msg: "success",
            data: newAddproduct,
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
    const findexist = await Addproduct.findOne({
      product_title: product_title,
    });
    if (findexist) {
      res.status(400).json({
        status: false,
        msg: "Already Exists",
        data: {},
      });
    } else {
      newAddproduct
        .save()
        .then(
          res.status(200).json({
            status: true,
            msg: "success",
            data: newAddproduct,
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

exports.get_allproduct = async (req, res) => {
  const findall = await Addproduct.find()
    .sort({ sortorder: 1 })
    .populate("product");
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

exports.viewone_product = async (req, res) => {
  const findone = await Addproduct.findOne({ _id: req.params.id }).populate(
    "product"
  );
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

exports.del_product = async (req, res) => {
  try {
    const deleteentry = await Addproduct.deleteOne({ _id: req.params.id });
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
