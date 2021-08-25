// const Newlaunch = require("../models/new");
// const cloudinary = require("cloudinary").v2;
// const fs = require("fs");
// const dotenv = require("dotenv");
// dotenv.config();
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// exports.add_newlaunch = async (req, res) => {
//   const {
//     newlaunch_title,
//     product_price,
//     image,
//     description,
//     sortorder,
//     status,
//   } = req.body;

//   const newNewlaunch = new Newlaunch({
//     newlaunch_title: newlaunch_title,
//     product_price: product_price,
//     image: image,
//     description: description,
//     sortorder: sortorder,
//     status: status,
//   });

//   if (req.file) {
//     const findexist = await Newlaunch.findOne({
//       newlaunch_title: newlaunch_title,
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
//         newNewlaunch.offer_img = resp.secure_url;
//         fs.unlinkSync(req.file.path);
//         newOfferanddeals.save().then(
//           res.status(200).json({
//             status: true,
//             msg: "success",
//             data: newNewlaunch,
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
//     const findexist = await Offeranddeals.findOne({
//       offeranddeals_title: offeranddeals_title,
//     });
//     if (findexist) {
//       res.status(400).json({
//         status: false,
//         msg: "Already Exists",
//         data: {},
//       });
//     } else {
//       newOfferanddeals
//         .save()
//         .then(
//           res.status(200).json({
//             status: true,
//             msg: "success",
//             data: newOfferanddeals,
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
// exports.allofferanddeals = async (req, res) => {
//   const findall = await Offeranddeals.find().sort({ sortorder: 1 });
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

// exports.delofferdeals = async (req, res) => {
//   try {
//     const deleteentry = await Offeranddeals.deleteOne({ _id: req.params.id });
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
