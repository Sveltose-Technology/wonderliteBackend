const Productcategory = require("../models/productcategory");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const dotenv = require("dotenv");

exports.addproductcategory = async (req, res) => {
  const { name, product_img, desc, sortorder, status } = req.body;

  const newProductcategory = new Productcategory({
    name: name,
    product_img: product_img,
    desc: desc,
    sortorder: sortorder,
    status: status,
  });

  const findexist = await Productcategory.findOne({ name: name });
  const arr = [];

  if (findexist) {
    res.status(400).json({
      status: false,
      msg: "Already Exists",
      data: {},
    });
  } else {
    newProductcategory
      .save()
      .then(
        res.status(200).json({
          status: true,
          msg: arr,
          data: newProductcategory,
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
};

exports.editproductcategory = async (req, res) => {
  const findandUpdateEntry = await Productcategory.findOneAndUpdate(
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

exports.viewoneproductcategory = async (req, res) => {
  const findone = await Productcategory.findOne({ _id: req.params.id });
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

exports.allproductcategory = async (req, res) => {
  const findall = await Productcategory.find().sort({ sortorder: 1 });
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

exports.deleteproductcategory = async (req, res) => {
  try {
    const deleteentry = await Productcategory.deleteOne({ _id: req.params.id });
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

exports.product_img = async (req, res) => {
  const findone = await Productcategory.findOne({ _id: req.params.id });
  //const arr = [];

  if (findone) {
    // console.log(req.params.id);
    // console.log(req.file);
    const response = await cloudinary.uploader.upload(req.file.path);
    if (response) {
      const findandUpdateEntry = await Productcategory.findOneAndUpdate(
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
      msg: "Image Not Found",
    });
  }
};
