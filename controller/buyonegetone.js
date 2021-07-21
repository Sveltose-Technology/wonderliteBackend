const Buyonegetone = require("../models/buyonegetone");

exports.addbuyonegetone = async (req, res) => {
  const {
    product_x,
    product_y,
    product_rate,
    product_x_qty,
    product_y_qty,
    description,
    sortorder,
    status,
  } = req.body;

  const newBuyonegetone = new Buyonegetone({
    product_x: product_x,
    product_y: product_y,
    product_rate: product_rate,
    product_x_qty: product_x_qty,
    product_y_qty: product_y_qty,
    description: description,
    sortorder: sortorder,
    status: status,
  });
  const findexist = await Buyonegetone.findOne(
    { product_x: product_x } //,
    //({ product_y: product_y }
  );
  if (findexist) {
    res.status(400).json({
      status: false,
      msg: "Already ,Exist",
      data: {},
    });
  } else {
    newBuyonegetone
      .save()
      .then(
        res.status(200).json({
          status: true,
          msg: "success",
          data: newBuyonegetone,
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
exports.getbuyonegetone = async (req, res) => {
  const findone = await Buyonegetone.findOne({ _id: req.params.id }).populate(
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
exports.getallbuyonegetone = async (req, res) => {
  const findall = await Buyonegetone.find({
    $and: [{ product_rate: { $gt: 100 } }, { product_rate: { $lt: 400 } }],
  })
    .sort({ sortorder: 1 })
    .populate("product_x")
    .populate("product_y");
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

exports.editbuyonegetone = async (req, res) => {
  const findandUpdateEntry = await Buyonegetone.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { $set: req.body },
    { new: true }
  ).populate("product");
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

exports.delbuyonegetone = async (req, res) => {
  try {
    const deleteentry = await Buyonegetone.deleteOne({
      _id: req.params.id,
    }).populate("product");
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
