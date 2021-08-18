const Blognews = require("../models/blog_news");
const fs = require("fs");
//const { url } = require("inspector");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.addblognews = async (req, res) => {
  const { news_title, news_subtitle, news_img, Description } = req.body;

  const newBlognews = new Blognews({
    news_title: news_title,
    news_subtitle: news_subtitle,
    news_img: news_img,
    Description: Description,
  });

  if (req.file) {
    const findexist = await Blognews.findOne({
      news_title: news_title,
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
        newBlognews.news_img = resp.secure_url;
        fs.unlinkSync(req.file.path);
        newBlognews.save().then(
          res.status(200).json({
            status: true,
            msg: "success",
            data: newBlognews,
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
    const findexist = await Blognews.findOne({
      news_title: news_title,
    });
    if (findexist) {
      res.status(400).json({
        status: false,
        msg: "Already Exists",
        data: {},
      });
    } else {
      newBlognews
        .save()
        .then(
          res.status(200).json({
            status: true,
            msg: "success",
            data: newBlognews,
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

exports.allblognews = async (req, res) => {
  const findall = await Blognews.find().sort({ sortorder: 1 });
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
