const add_banner = require("../models/banner_img");
const fs = require("fs");
const { url } = require("inspector");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.banner = async (req, res) => {
  const uploader = async (path) =>
    await cloudinary.uploader.upload(path, "uploadesimages");

  if (req.method === "POST") {
    const urls = [];
    const files = req.files;

    for (const file of files) {
      const { path } = file;
      const newpath = await uploader(path);
      urls.push(newpath);
      fs.unlinkSync(path);
    }
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
