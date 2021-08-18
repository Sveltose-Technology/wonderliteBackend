const Servicerequest = require("../models/servicerequest");

exports.addservicerequest = async (req, res) => {
  const {
    service_type,
    customer_type,
    customer_name,
    email,
    mobile_no,
    alt_mobileno,
    pincode,
    location,
    state,
    district,
    address,
    category,
    comments,
  } = req.body;

  const newServicerequest = new Servicerequest({
    service_type: service_type,
    customer_type: customer_type,
    customer_name: customer_name,
    email: email,
    mobile_no: mobile_no,
    alt_mobileno: alt_mobileno,
    pincode: pincode,
    location: location,
    state: state,
    district: district,
    address: address,
    category: category,
    comments: comments,
  });

  const findexist = await Servicerequest.findOne({
    mobile_no: mobile_no,
  });
  if (findexist) {
    res.status(400).json({
      status: false,
      msg: "Already Exists",
      data: {},
    });
  } else {
    newServicerequest
      .save()
      .then(
        res.status(200).json({
          status: true,
          msg: "success",
          data: newServicerequest,
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

exports.allservicerequest = async (req, res) => {
  const findall = await Servicerequest.find().sort({ sortorder: 1 });
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

exports.delservicerequest = async (req, res) => {
  try {
    const deleteentry = await Servicerequest.deleteOne({ _id: req.params.id });
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
