const Blogcategory = require("../models/blog_category");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.addcategory = async (req, res) => {
  const { short_desc, full_desc, cat_img } = req.body;

  const newBlogcategory = new Blogcategory({
    short_desc: short_desc,
    full_desc: full_desc,
    cat_img: cat_img,
  });

  if (req.file) {
    const findexist = await Blogcategory.findOne({
      _id: req.params.id,
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
        newBlogcategory.cat_img = resp.secure_url;
        fs.unlinkSync(req.file.path);
        newBlogcategory.save().then(
          res.status(200).json({
            status: true,
            msg: "success",
            data: newBlogcategory,
          })
        );
      } else {
        res.status(200).json({
          status: false,
          msg: "img not uploaded",
        });
      }
    }
    // } else {
    //   const findexist = await Blogcategory.findOne({ blog_cat_name: blog_cat_name });
    //   if (findexist) {
    //     res.status(400).json({
    //       status: false,
    //       msg: "Already Exists",
    //       data: {},
    //     });
    //   } else {
    newBlogcategory
      .save()
      .then(
        res.status(200).json({
          status: true,
          msg: "success",
          data: newBlogcategory,
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

// exports.editblog_cat = async (req, res) => {
//   const findandUpdateEntry = await Blogcategory.findOneAndUpdate(
//     {
//       _id: req.params.id,
//     },
//     { $set: req.body },
//     { new: true }
//   );
//   if (findandUpdateEntry) {
//     res.status(200).json({
//       status: true,
//       msg: "success",
//       data: findandUpdateEntry,
//     });
//   } else {
//     res.status(400).json({
//       status: false,
//       msg: "error",
//       error: "error",
//     });
//   }
// };

// exports.viewoneblog_cat = async (req, res) => {
//   const findone = await Blogcategory.findOne({ _id: req.params.id });
//   if (findone) {
//     res.status(200).json({
//       status: true,
//       msg: "success",
//       data: findone,
//     });
//   } else {
//     res.status(400).json({
//       status: false,
//       msg: "error",
//       error: "error",
//     });
//   }
// };

exports.viewall_cat = async (req, res) => {
  const findall = await Blogcategory.find().sort({ sortorder: 1 });
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

// exports.delblog_cat = async (req, res) => {
//   try {
//     const deleteentry = await Blogcategory.deleteOne({ _id: req.params.id });
//     res.status(200).json({
//       status: true,
//       msg: "success",
//       data: deleteentry,
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: false,
//       msg: "error",
//       error: error,
//     });
//   }
// };
