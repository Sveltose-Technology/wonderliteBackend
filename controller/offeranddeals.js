const Offeranddeals = require("../models/offeranddeals");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.add_offeranddeals = async (req, res) => {
  const {
    offeranddeals_title,
    product,
    product_price,
    offer_img,
    description,
    sortorder,
    status,
  } = req.body;

  const newOfferanddeals = new Offeranddeals({
    offeranddeals_title: offeranddeals_title,
    product: product,
    product_price: product_price,
    offer_img: offer_img,
    description: description,
    sortorder: sortorder,
    status: status,
  });

  if (req.file) {
    const findexist = await Offeranddeals.findOne({
      offeranddeals_title: offeranddeals_title,
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
        newOfferanddeals.offer_img = resp.secure_url;
        fs.unlinkSync(req.file.path);
        newOfferanddeals.save().then(
          res.status(200).json({
            status: true,
            msg: "success",
            data: newOfferanddeals,
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
    const findexist = await Offeranddeals.findOne({
      offeranddeals_title: offeranddeals_title,
    });
    if (findexist) {
      res.status(400).json({
        status: false,
        msg: "Already Exists",
        data: {},
      });
    } else {
      newOfferanddeals
        .save()
        .then(
          res.status(200).json({
            status: true,
            msg: "success",
            data: newOfferanddeals,
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

exports.viewone_dealoffer = async (req, res) => {
  const findone = await Offeranddeals.findOne({ _id: req.params.id }); //.populate(
  //("product");
  //);
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

exports.allofferanddeals = async (req, res) => {
  const findall = await Offeranddeals.find().sort({ sortorder: 1 });
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

exports.delofferdeals = async (req, res) => {
  try {
    const deleteentry = await Offeranddeals.deleteOne({ _id: req.params.id });
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
