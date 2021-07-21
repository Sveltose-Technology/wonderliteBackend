const Product = require("../models/product");

exports.addproduct = async (req, res) => {
  const {
    item_name,
    short_name,
    desc,
    code,
    hsn_code,
    productcategory,
    productsubcategory,
    unit,
    alt_unit,
    gst_rate,
    type_of_supply,
    varient,
    material,
    stock_qty,
    stock_clearance_limit,
    rate,
    size,
    colour,
    product_img,
    barcode,
    brand,
    std_package,
    inc_duty_tax,
    sortorder,
    status,
  } = req.body;

  const newProduct = new Product({
    item_name: item_name,
    short_name: short_name,
    desc: desc,
    code: code,
    hsn_code: hsn_code,
    productcategory: productcategory,
    productsubcategory: productsubcategory,
    unit: unit,
    alt_unit: alt_unit,
    gst_rate: gst_rate,
    type_of_supply: type_of_supply,
    varient: varient,
    material: material,
    stock_qty: stock_qty,
    stock_clearance_limit: stock_clearance_limit,
    rate: rate,
    size: size,
    colour: colour,
    product_img: product_img,
    barcode: barcode,
    brand: brand,
    std_package: std_package,
    inc_duty_tax: inc_duty_tax,
    sortorder: sortorder,
    status: status,
  });

  const findexist = await Product.findOne({ code: code });
  if (findexist) {
    res.status(400).json({
      status: false,
      msg: "Already Exists",
      data: {},
    });
  } else {
    newProduct
      .save()
      .then(
        res.status(200).json({
          status: true,
          msg: "success",
          data: newProduct,
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

exports.editproduct = async (req, res) => {
  const findandUpdateEntry = await Product.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { $set: req.body },
    { new: true }
  )
    .populate("productcategory")
    .populate("productsubcategory")
    .populate("unit")
    .populate("alt_unit")
    .populate("gst_rate")
    .populate("rate")
    .populate("brand");
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

exports.viewoneproduct = async (req, res) => {
  const findone = await Product.findOne({ _id: req.params.id })
    .populate("productcategory")
    .populate("productsubcategory")
    .populate("unit")
    .populate("alt_unit")
    .populate("gst_rate")
    .populate("rate")
    .populate("brand");
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

exports.allproduct = async (req, res) => {
  const findall = await Product.find()
    .sort({ sortorder: 1 })
    .populate("productcategory")
    .populate("productsubcategory")
    .populate("unit")
    .populate("alt_unit")
    .populate("gst_rate")
    .populate("rate")
    .populate("brand");
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

exports.productbybrand = async (req, res) => {
  const findall = await Product.find({ brand: req.params.id })
    .sort({ sortorder: 1 })
    .populate("productcategory")
    .populate("productsubcategory")
    .populate("unit")
    .populate("alt_unit")
    .populate("gst_rate")
    .populate("rate")
    .populate("brand");
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

exports.productbycategory = async (req, res) => {
  const findall = await Product.find({ productcategory: req.params.id })
    .sort({ sortorder: 1 })
    .populate("productcategory")
    .populate("productsubcategory")
    .populate("unit")
    .populate("alt_unit")
    .populate("gst_rate")
    .populate("rate")
    .populate("brand");
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

exports.productbysubcategory = async (req, res) => {
  const findall = await Product.find({ productsubcategory: req.params.id })
    .sort({ sortorder: 1 })
    .populate("productcategory")
    .populate("productsubcategory")
    .populate("unit")
    .populate("alt_unit")
    .populate("gst_rate")
    .populate("rate")
    .populate("brand");
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

exports.deleteproduct = async (req, res) => {
  try {
    const deleteentry = await Product.deleteOne({ _id: req.params.id });
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
