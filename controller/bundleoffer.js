const Bundleoffer = require("../models/bundleoffer");

exports.addbundleoffer = async (req, res) => {
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

  const newBundleoffer = new Bundleoffer({
    bundleoffer_title: bundleoffer_title,
    product: product,
    product_price: product_price,
    product_img: product_img,
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
      msg: "Already Exist",
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

exports.editbundleoffer = async (req, res) => {
  const findandUpdateEntry = await Bundleoffer.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { $set: req.body },
    { new: true }
  );
  //.populate("product");
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
  const findall = await Bundleoffer.find().sort({ sortorder: 1 });
  // .populate("product");
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
