const Blog = require("../models/blog");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.addblog = async (req, res) => {
  const { blog_title, blog_img, short_desc, full_desc, category } = req.body;

  const newBlog = new Blog({
    blog_title: blog_title,
    blog_img: blog_img,
    short_desc: short_desc,
    full_desc: full_desc,
    category: category,
  });

  if (req.file) {
    const findexist = await Blog.findOne({
      blog_title: blog_title,
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
        newBlog.blog_img = resp.secure_url;
        fs.unlinkSync(req.file.path);
        newBlog.save().then(
          res.status(200).json({
            status: true,
            msg: "success",
            data: newBlog,
          })
        );
      } else {
        res.status(200).json({
          status: false,
          msg: "image not uploaded",
        });
      }
    }
  } else {
    const findexist = await Blog.findOne({
      blog_title: blog_title,
    });
    if (findexist) {
      res.status(400).json({
        status: false,
        msg: "Already Exists",
        data: {},
      });
    } else {
      newBlog
        .save()
        .then(
          res.status(200).json({
            status: true,
            msg: "success",
            data: newBlog,
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
exports.allblog = async (req, res) => {
  const findall = await Blog.find().sort({ sortorder: 1 });
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

exports.delblog = async (req, res) => {
  try {
    const deleteentry = await Blog.deleteOne({ _id: req.params.id });
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
