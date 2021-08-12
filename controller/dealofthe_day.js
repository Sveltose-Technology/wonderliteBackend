const Dealoftheday = require("../models/dealofthe_day");

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
    //product,
    product_price,
    product_img,
    description,
    sortorder,
    status,
  } = req.body;

  const newDealoftheday = new Dealoftheday({
    dealoftheday_title: dealoftheday_title,
    //product: product,
    product_price: product_price,
    product_img: product_img,
    description: description,
    sortorder: sortorder,
    status: status,
  });

  if (req.file) {
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
        newDealoftheday.save().then(
          res.status(200).json({
            status: true,
            msg: "success",
            data: newDealoftheday,
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
        .then(
          res.status(200).json({
            status: true,
            msg: "success",
            data: newDealoftheday,
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
exports.alldealoftheday = async (req, res) => {
  const findall = await Dealoftheday.find().sort({ sortorder: 1 });
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
