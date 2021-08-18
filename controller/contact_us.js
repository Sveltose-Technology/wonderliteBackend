const Contactus = require("../models/contact_us");

exports.addcontactus = async (req, res) => {
  const {
    you_are,
    typeof_req,
    name,
    email,
    mobile_no,
    state,
    district,
    address,
    category,
    comments,
  } = req.body;

  const newContactus = new Contactus({
    you_are: you_are,
    typeof_req: typeof_req,
    name: name,
    email: email,
    mobile_no: mobile_no,
    state: state,
    district: district,
    address: address,
    category: category,
    comments: comments,
  });

  const findexist = await Contactus.findOne({ name: name });
  if (findexist) {
    res.status(400).json({
      status: false,
      msg: "Already Exists",
      data: {},
    });
  } else {
    newContactus
      .save()
      .then(
        res.status(200).json({
          status: true,
          msg: "success",
          data: newContactus,
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

exports.allcontactus = async (req, res) => {
  const findall = await Contactus.find().sort({ sortorder: 1 });
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

exports.delcontactus = async (req, res) => {
  try {
    const deleteentry = await Contactus.deleteOne({ _id: req.params.id });
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

exports.viewonecontactus = async (req, res) => {
  const findone = await Contactus.findOne({ _id: req.params.id });
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
