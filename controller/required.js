const Required = require("../models/required");

exports.addrequired = async (req, res) => {
  const {
    userId,
    product_name,
    product_model,
    qty,
    address,
    sortorder,
    status,
  } = req.body;

  const newRequired = new Required({
    userId: userId,
    product_name: product_name,
    product_model: product_model,
    qty: qty,
    address: address,
    sortorder: sortorder,
    status: status,
  });
  const findexist = await Required.findOne({ userId: userId });
  if (findexist) {
    res.status(400).json({
      status: false,
      msg: "Already Exist",
      data: {},
    });
  } else {
    newRequired
      .save()
      .then(
        res.status(200).json({
          status: true,
          msg: "success",
          data: newRequired,
        })
      )
      .catch((error) => {
        res.status(400).json({
          status: false,
          msg: "error",
          error: "error",
        });
      });
  }
};
exports.editrequired = async (req, res) => {
  const findandUpdateEntry = await Required.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { $set: req.body },
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
};

exports.viweonerequired = async (req, res) => {
  const findone = await Required.findOne({ _id: req.params.id });
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

exports.viewallrequired = async (req, res) => {
  const findall = await Required.find().sort({ sortorder: 1 });
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

exports.delrequired = async (req, res) => {
  try {
    const deleteentry = await Required.deleteOne({ _id: req.params.id });
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
