const Videoslideshow = require("../models/videoController");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.add_video = async (req, res) => {
  const { video_title, video_url } = req.body;

  const newVideoslideshow = new Videoslideshow({
    video_title: video_title,
  });

  if (req.file) {
    const findexist = await Videoslideshow.findOne({
      video_title: video_title,
    });
    if (findexist) {
      res.status(400).json({
        status: false,
        msg: "Already Exist",
        data: {},
      });
    } else {
      const resp = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "video",
      });
      if (resp) {
        newVideoslideshow.video_url = resp.secure_url;
        fs.unlinkSync(req.file.path);
        newVideoslideshow.save().then((result) => {
          res.status(200).json({
            status: true,
            msg: "success",
            data: result,
          });
        });
      } else {
        res.status(200).json({
          status: false,
          msg: "Video not upload",
        });
      }
    }
  } else {
    const findexist = Videoslideshow.findOne({
      video_title: video_title,
    });
    if (findexist) {
      res.status(400).json({
        status: false,
        msg: "Already Exist",
        data: {},
      });
    } else {
      newVideoslideshow
        .save()
        .then(
          res.status(200).json({
            status: true,
            msg: "success",
            data: newVideoslideshow,
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

exports.viewonevideo = async (req, res) => {
  const findone = await Videoslideshow.findOne({ _id: req.params.id });
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

exports.all_video = async (req, res) => {
  const findall = await Videoslideshow.find().sort({ sortorder: 1 });
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

exports.del_video = async (req, res) => {
  try {
    const deleteentry = await Videoslideshow.deleteOne({ _id: req.params.id });
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
//klshdlkfjskldfjsd
