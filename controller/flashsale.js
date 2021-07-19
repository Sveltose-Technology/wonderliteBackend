const express = require("express");
const app = express();
const Flashsale = require("../models/flashsale");

exports.addflashsale = async (req, res) => {
  const {
    flashsale_title,
    product,
    product_price,
    product_img,
    description,
    sortorder,
    status,
  } = req.body;

  const newFlashsale = new Flashsale({
    flashsale_title: flashsale_title,
    product: product,
    product_price: product_price,
    product_img: product_img,
    description: description,
    sortorder: sortorder,
    status: status,
  });

  const findexist = await Flashsale.findOne({
    flashsale_title: flashsale_title,
  });
  if (findexist) {
    res.status(400).json({
      status: false,
      msg: "Already Exist",
      data: {},
    });
  } else {
    newFlashsale
      .save()
      .then(
        res.status(200).json({
          status: true,
          msg: "success",
          data: newFlashsale,
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

exports.editflashsale = async (req, res) => {
  const findandUpdateEntry = await Flashsale.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { $set: req.body },
    { new: true }
  ).populate("product");
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

exports.oneflashsale = async (req, res) => {
  const findone = await Flashsale.findOne({ _id: req.params.id }).populate(
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

exports.allflashsale = async (req, res) => {
  const findall = await Flashsale.find()
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

exports.delflashsale = async (req, res) => {
  try {
    const deleteentry = await Flashsale.deleteOne({
      _id: req.params.id,
    }).populate("product");
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
