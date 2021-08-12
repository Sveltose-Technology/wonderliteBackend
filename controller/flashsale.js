// // const express = require("express");
// // const app = express();
// const Flashsale = require("../models/flashsale");
// const cloudinary = require("cloudinary").v2;
// const fs = require("fs");
// const dotenv = require("dotenv");
// dotenv.config();
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// exports.addflashsale = async (req, res) => {
//   const {
//     flashsale_title,
//     product_price,
//     flashsale_img,
//     description,
//     sortorder,
//     status,
//   } = req.body;

//   const newFlashsale = new Flashsale({
//     flashsale_title: flashsale_title,
//     product_price: product_price,
//     flashsale_img: flashsale_img,
//     description: description,
//     sortorder: sortorder,
//     status: status,
//   });

//   if (req.file) {
//     const findexist = await Flashsale.findOne({
//       flashsale_title: flashsale_title,
//     });
//     if (findexist) {
//       res.status(400).json({
//         status: false,
//         msg: "Already Exists",
//         data: {},
//       });
//     } else {
//       const resp = await cloudinary.uploader.upload(req.file.path);
//       if (resp) {
//         newFlashsale.flashsale_img = resp.secure_url;
//         fs.unlinkSync(req.file.path);
//         newFlashsale.save().then(
//           res.status(200).json({
//             status: true,
//             msg: "success",
//             data: newFlashsale,
//           })
//         );
//       } else {
//         res.status(200).json({
//           status: false,
//           msg: "img not uploaded",
//         });
//       }
//     }
//   } else {
//     const findexist = await Flashsale.findOne({
//       flashsale_title: flashsale_title,
//     });
//     if (findexist) {
//       res.status(400).json({
//         status: false,
//         msg: "Already Exists",
//         data: {},
//       });
//     } else {
//       newFlashsale
//         .save()
//         .then(
//           res.status(200).json({
//             status: true,
//             msg: "success",
//             data: newFlashsale,
//           })
//         )
//         .catch((error) => {
//           res.status(400).json({
//             status: false,
//             msg: "error",
//             error: error,
//           });
//         });
//     }
//   }
// };

// exports.editflashsale = async (req, res) => {
//   const findandUpdateEntry = await Flashsale.findOneAndUpdate(
//     {
//       _id: req.params.id,
//     },
//     { $set: req.body },
//     { new: true }
//   ); //.populate("product");
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

// exports.oneflashsale = async (req, res) => {
//   const findone = await Flashsale.findOne({ _id: req.params.id }); //.populate(
//   //("product");
//   //);
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

// exports.allflashsale = async (req, res) => {
//   const findall = await Flashsale.find().sort({ sortorder: 1 });
//   // .populate("product");
//   if (findall) {
//     res.status(200).json({
//       status: true,
//       msg: "success",
//       data: findall,
//     });
//   } else {
//     res.status(400).json({
//       status: false,
//       msg: "error",
//       error: "error",
//     });
//   }
// };

// exports.delflashsale = async (req, res) => {
//   try {
//     const deleteentry = await Flashsale.deleteOne({
//       _id: req.params.id,
//     }); //.populate("product");
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

// exports.flashsale_img = async (req, res) => {
//   const findone = await flashsale.findOne({ _id: req.params.id });
//   if (findone) {
//     console.log(req.params.id);
//     console.log(req.file);
//     const response = await cloudinary.uploader.upload(req.file.path);
//     if (response) {
//       const findandUpdateEntry = await flashsale.findOneAndUpdate(
//         {
//           _id: req.params.id,
//         },
//         { $set: { flashsale_img: response.secure_url } },
//         { new: true }
//       );

//       if (findandUpdateEntry) {
//         res.status(200).json({
//           status: true,
//           msg: "success",
//           data: findandUpdateEntry,
//         });
//       } else {
//         res.status(400).json({
//           status: false,
//           msg: "Image not set",
//         });
//       }
//     } else {
//       res.status(400).json({
//         status: false,
//         msg: "Error in file uploading",
//       });
//     }
//   } else {
//     res.status(400).json({
//       status: false,
//       msg: "image Not Found",
//     });
//   }
// };

const Flashsale = require("../models/flashsale");

const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.add_flashsale = async (req, res) => {
  const {
    flashsale_title,
    product_price,
    flashsale_img,
    description,
    sortorder,
    status,
  } = req.body;

  const newFlashsale = new Flashsale({
    flashsale_title: flashsale_title,
    product_price: product_price,
    flashsale_img: flashsale_img,
    description: description,
    sortorder: sortorder,
    status: status,
  });

  if (req.file) {
    const findexist = await Flashsale.findOne({
      flashsale_title: flashsale_title,
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
        newFlashsale.flashsale_img = resp.secure_url;
        fs.unlinkSync(req.file.path);
        newFlashsale.save().then(
          res.status(200).json({
            status: true,
            msg: "success",
            data: newFlashsale,
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
    const findexist = await Flashsale.findOne({
      flashsale_title: flashsale_title,
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
  }
};
exports.allflashsale = async (req, res) => {
  const findall = await Flashsale.find().sort({ sortorder: 1 });
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
    const deleteentry = await Flashsale.deleteOne({ _id: req.params.id });
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

exports.editflashsale = async (req, res) => {
  const findandUpdateEntry = await Flashsale.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { $set: req.body },
    { new: true }
  ); //.populate("unit");
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
