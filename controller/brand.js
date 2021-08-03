const Brand = require("../models/brand");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const dotenv = require("dotenv");

exports.addbrand = async (req, res) => {
  const { name, brand_img, desc, sortorder, status } = req.body;

  const newBrand = new Brand({
    name: name,
    brand_img: brand_img,
    desc: desc,
    sortorder: sortorder,
    status: status,
  });

  const findexist = await Brand.findOne({ name: name });
  if (findexist) {
    res.status(400).json({
      status: false,
      msg: "Already Exists",
      data: {},
    });
  } else {
    newBrand
      .save()
      .then(
        res.status(200).json({
          status: true,
          msg: "success",
          data: newBrand,
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

exports.editbrand = async (req, res) => {
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

exports.allbrand = async (req, res) => {
  const findall = await Brand.find().sort({ sortorder: 1 });
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

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.brand_img = async (req, res) => {
  const findone = await Brand.findOne({ _id: req.params.id });
  if (findone) {
    console.log(req.params.id);
    console.log(req.file);
    const response = await cloudinary.uploader.upload(req.file.path);
    if (response) {
      const findandUpdateEntry = await Brand.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        { $set: { brand_img: response.secure_url } },
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
      msg: "Brand image Not Found",
    });
  }
};
