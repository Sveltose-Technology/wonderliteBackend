const Bundleoffer = require("../models/bundleoffer");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.addbundleoffer = async (req, res) => {
  const {
    bundleoffer_title,
    product,
    product_price,
    product_img,
    product_qty,
    description,
    sortorder,
    status,
  } = req.body;

  const newBundleoffer = new Bundleoffer({
    bundleoffer_title: bundleoffer_title,
    product: product,
    product_price: product_price,
    product_img: product_img,
    product_qty: product_qty,
    description: description,
    sortorder: sortorder,
    status: status,
  });

  if (req.file) {
    const findexist = await Bundleoffer.findOne({
      bundleoffer_title: bundleoffer_title,
    }).populate("product");
    if (findexist) {
      res.status(400).json({
        status: false,
        msg: "Already Exists",
        data: {},
      });
    } else {
      const resp = await cloudinary.uploader.upload(req.file.path);
      if (resp) {
        newBundleoffer.product_img = resp.secure_url;
        fs.unlinkSync(req.file.path);
        newBundleoffer.save().then(
          res.status(200).json({
            status: true,
            msg: "success",
            data: newBundleoffer,
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
    const findexist = await Bundleoffer.findOne({
      bundleoffer_title: bundleoffer_title,
    });
    if (findexist) {
      res.status(400).json({
        status: false,
        msg: "Already Exists",
        data: {},
      });
    } else {
      newBundleoffer
        .save()
        .then(
          res.status(200).json({
            status: true,
            msg: "success",
            data: newBundleoffer,
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

exports.editbundleoffer = async (req, res) => {
  const findandUpdateEntry = await Bundleoffer.findOneAndUpdate(
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

exports.onebundleoffer = async (req, res) => {
  const findone = await Bundleoffer.findOne({ _id: req.params.id }).populate(
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

exports.allbundleoffer = async (req, res) => {
  const findall = await Bundleoffer.find()
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

exports.delbundleoffer = async (req, res) => {
  try {
    const deleteentry = await Bundleoffer.deleteOne({
      _id: req.params.id,
    });
    //.populate("product");
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
  const findone = await Bundleoffer.findOne({ _id: req.params.id });
  if (findone) {
    //console.log(req.params.id);
    //console.log(req.file);
    const response = await cloudinary.uploader.upload(req.file.path);
    if (response) {
      const findandUpdateEntry = await Bundleoffer.findOneAndUpdate(
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
      msg: "image Not Found",
    });
  }
};
