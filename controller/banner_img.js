const add_banner = require("../models/banner_img");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const dotenv = require("dotenv");
const { url } = require("inspector");

// dotenv.config();

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// exports.banner = async (req, res) => {
//   const uploader = async (path) => await cloud.uploads(path, "images");
//   if (req.method == "POST") {
//     const urls = [];
//     const files = req.file;

//     for (const file of files) {
//       const { path } = file;
//       const newpath = await uploader(path);
//       urls.push(newpath);
//       fs.unlinkSync(path);
//     }

//     const img = new add_banner({
//       banner_img: urls,
//     });
//     img.save((err, res) => {
//       if (err) {
//         res.json(err);
//       } else {
//         res.json(res);
//       }
//     });
//   } else {
//     res.status(405).json({
//       err: "image not upload",
//     });
//   }
// };

// exports.list_img = (req, res) => {
//   add_banner
//     .findOne()
//     .select("banner_img")
//     .then((resp) => {
//       res.json(resp);
//     })
//     .catch((error) => {
//       res.json({ error: "banner image not find" });
//     });
// };
//
// const newBannerimage = new Bannerimage({
//   banner_title: banner_title,
//   banner_img: this.banner_img,
//   status: status,
// });
//   const findone = await Bannerimage.findOne({ _id: req.params.id });
//   console.log(req.params.id);
//   console.log(req.file);
//   if (findone) {
// const findexist = await Bannerimage.findOne({ banner_title: banner_title });
// if (findexist) {
//   res.status(400).json({
//     status: false,
//     msg: "Already Exist",
//     data: {},
//   });
// } else {
//   newBannerimage
//     .save()
//     .then(
//       res.status(200).json({
//         status: true,
//         msg: "success",
//         data: newBannerimage,
//       })
//     )
//     .catch((error) => {
//       res.status(400).json({
//         status: false,
//         msg: "error",
//         error: error,
//       });
//     });

//   const response = await cloudinary.uploader.upload(req.file.path);
//   if (response) {
//     const findandUpdateEntry = await Bannerimage.findOneAndUpdate(
//       {
//         _id: req.params.id,
//       },
//       { $set: { banner_img: response.secure_url } },
//       { new: true }
//     );
//     if (findandUpdateEntry) {
//       res.status(200).json({
//         status: true,
//         msg: "success",
//         data: findandUpdateEntry,
//       });
//     } else {
//       res.status(400).json({
//         status: false,
//         msg: "Image not set",
//       });
//     }
//   } else {
//     res.status(400).json({
//       status: false,
//       msg: "Error in file uploading",
//     });
//   }
//   } else {
//     res.status(400).json({
//       status: false,
//       msg: "Banner Not Found",
//     });
//   }

exports.banner = async (req, res) => {
  const uploader = async (path) => await cloud.uploads(path, "Images");
  if (req.method === "POST") {
    const urls = [];
    // const files = req.files;

    // for (const file of files) {
    //   const { path } = file;
    //   const newpath = await uploader(path);
    //   urls.push(newpath);
    //   fs.unlinkSync(path);
    // }
    var img = new add_banner({
      banner_img: urls,
    });
    img.save((err, resp) => {
      if (err) {
        res.json(err);
      } else {
        res.json(resp);
      }
    });
  } else {
    res.status(405).json({
      err: "image not uploads",
    });
  }
};

exports.list_img = (req, res) => {
  add_banner
    .findOne()
    .select("banner_img")
    .then((resp) => {
      res.json(resp);
    })
    .catch((error) => {
      res.json({ error: "banner image not find" });
    });
};
