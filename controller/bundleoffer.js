const Bundleoffer = require("../models/bundleoffer");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const dotenv = require("dotenv");

exports.addbundleoffer = async (req, res) => {
  const {
    bundleoffer_title,
    product,
    product_price,
    product_qty,
    description,
    sortorder,
    status,
  } = req.body;

  const newBundleoffer = new Bundleoffer({
    bundleoffer_title: bundleoffer_title,
    product: product,
    product_price: product_price,
    product_qty: product_qty,
    description: description,
    sortorder: sortorder,
    status: status,
  });
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
};

//   if (req.files) {
//     const findexist = await Bundleoffer.findOne({
//       bundleoffer_title: bundleoffer_title,
//     });
//     if (findexist) {
//       res.status(400).json({
//         status: false,
//         msg: "Already Exists",
//         data: {},
//       });
//     } else {
//       alluploads = [];
//       for (let i = 0; i < req.files.length; i++) {
//         const resp = await cloudinary.uploader.upload(req.files[i].path);
//         alluploads.push(resp.secure_url);
//       }
//       //console.log(alluploads);
//       if (alluploads.length !== 0) {
//         newBundleoffer.product_img = alluploads;
//         newBundleoffer.save().then((result) => {
//           res.status(200).json({
//             status: true,
//             msg: "success",
//             data: newBundleoffer,
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
//     //console.log("changed node");
//     const findexist = await Bundleoffer.findOne({
//       bundleoffer_title: bundleoffer_title,
//     });

//     if (findexist) {
//       res.status(400).json({
//         status: false,
//         msg: "Already Exists",
//         data: {},
//       });
//     } else {
//       newBundleoffer
//         .save()
//         .then(
//           res.status(200).json({
//             status: true,
//             msg: "success",
//             data: newBundleoffer,
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

// exports.editbundleoffer = async (req, res) => {
//   const findandUpdateEntry = await Bundleoffer.findOneAndUpdate(
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

exports.editbundleoffer = async (req, res) => {
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

  data = {};
  if (bundleoffer_title) {
    data.bundleoffer_title = bundleoffer_title;
  }
  if (product) {
    data.product = product;
  }
  if (product_price) {
    data.product_price = product_price;
  }
  if (product_qty) {
    data.product_qty = product_qty;
  }
  if (description) {
    data.description = description;
  }
  if (sortorder) {
    data.sortorder = sortorder;
  }
  if (status) {
    data.status = status;
  }
  if (req.file) {
    const response = await cloudinary.uploader.upload(req.file.path);
    data.product_img = response.secure_url;
    fs.unlinkSync(req.file.path);
  }
  if (data) {
    const findandUpdateEntry = await Bundleoffer.findOneAndUpdate(
      { _id: req.params.id },
      { $set: data },
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
        msg: "error",
        error: "error",
      });
    }
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
    .populate("product")
    .sort({ sortorder: 1 });
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
