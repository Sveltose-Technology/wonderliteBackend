const Productimg = require("../models/product_img");

const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// exports.add_Img = async (req, res) => {
//   const { product_title, product_img } = req.body;

//   const newProductimg = new Productimg({
//     product_title: product_title,
//     product_img: product_img,
//   });

//   if (req.files) {
//     const findexist = await Productimg.findOne({
//       product_title: product_title,
//     });
//     if (findexist) {
//       res.status(400).json({
//         status: false,
//         msg: "Already Exists",
//         data: {},
//       });
//     } else {
//       // console.log(req.files);
//       alluploads = [];
//       for (let i = 0; i < req.files.length; i++) {
//         const resp = await cloudinary.uploader.upload(req.files[i].path);
//         alluploads.push(resp.secure_url);
//       }
//       //console.log(alluploads);

//       if (alluploads.length !== 0) {
//         newProductimg.product_img = alluploads;
//         newProductimg.save().then((result) => {
//           res.status(200).json({
//             status: true,
//             msg: "success",
//             data: newProductimg,
//           });
//         });
//       } else {
//         res.status(200).json({
//           status: false,
//           msg: "img not uploaded",
//         });
//       }
//     }
//   } else {
//     console.log("changed node");
//     const findexist = await Productimg.findOne({
//       product_title: product_title,
//     });
//     if (findexist) {
//       res.status(400).json({
//         status: false,
//         msg: "Already Exists",
//         data: {},
//       });
//     } else {
//       newProductimg
//         .save()
//         .then(
//           res.status(200).json({
//             status: true,
//             msg: "success",
//             data: newProductimg,
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

exports.delete_img = async (req, res) => {
  try {
    const deleteentry = await Productimg.deleteOne({ _id: req.params.id });
    res.status(200).json({
      status: true,
      msg: "success",
      data: deleteentry,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      msg: "error",
      error: "error",
    });
  }
};

exports.getall_img = async (req, res) => {
  const findall = await Productimg.find().sort({ sortorder: 1 });
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

exports.add_Img = async (req, res) => {
  const { product_img } = req.body;
  const newProductimg = new Productimg({
    product_img: product_img,
  });
  if (req.files)
    // console.log(req.files);
    alluploads = [];
  for (let i = 0; i < req.files.length; i++) {
    const resp = await cloudinary.uploader.upload(req.files[i].path);
    fs.unlinkSync(req.files[i].path);
    alluploads.push(resp.secure_url);
  }
  //console.log(alluploads);

  if (alluploads.length !== 0) {
    newProductimg.product_img = alluploads;
    newProductimg.save().then((result) => {
      res.status(200).json({
        status: true,
        msg: "success",
        data: newProductimg,
      });
    });
  } else {
    res.status(200).json({
      status: false,
      msg: "img not uploaded",
    });
  }
};

// console.log("changed node");

// newProductimg.save(function (err, data) {
//   if (err) {
//     res.status(400).json({
//       status: false,
//       msg: "error occured",
//       error: err,
//     });
//   } else {
//     res.status(200).json({
//       status: true,
//       msg: "Amount added to wallet",
//       data: newWallet,
//     });
//   }
// });
