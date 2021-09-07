const Orderproduct = require("../models/orderproduct");
const { v4: uuidv4 } = require("uuid");
//const orderproduct = require("../models/orderproduct");

exports.productorder = async (req, res) => {
  const {
    user,
    product,
    address,
    purchaseprice,
    reachedlocation,
    shippingdate,
    deliverdondate,
    status,
  } = req.body;

  const neworderproduct = new Orderproduct({
    user: user,
    product: product,
    orderId: uuidv4(),
    address: address,
    purchaseprice: purchaseprice,
    reachedlocation: reachedlocation,
    shippingdate: shippingdate,
    deliverdondate: deliverdondate,
    status: status,
  });

  neworderproduct.save(function (err, data) {
    if (err) {
      res.status(400).json({
        status: false,
        msg: "Error Occured",
        error: err,
      });
    } else {
      res.status(200).json({
        status: true,
        msg: "Product added to order",
        data: neworderproduct,
      });
    }
  });
};

//delivered_order == Deliver
exports.delivered_order = async (req, res, next) => {
  const datas = await Orderproduct.find({
    $and: [{ orderId: req.params.id }, { status: "Deliver" }],
  })
    .then((result) => {
      res.status(200).json({
        status: true,
        data: result,
      });
    })
    .catch((err) => {
      res.status(200).json({
        status: false,
        error: err,
      });
    });
};

// exports.alldelevered_order = async (req, res) => {
//   const findall = await Orderproduct.find({
//     user: req.params.id,
//   }).sort({ sortorder: 1 });

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

exports.pending_order = async (req, res) => {
  const data = await Orderproduct.find({
    $and: [{ user: req.params.id }, { status: "Pending" }],
  })
    .then((result) => {
      res.status(200).json({
        status: true,
        data: result,
      });
    })
    .catch((err) => {
      res.status(200).json({
        status: false,
        error: err,
      });
    });
};

// exports.allpendingorderbyid = async (req, res) => {
//   const findall = await Orderproduct.find({
//     user: req.params.id,
//   }).sort({ sortorder: 1 });

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

exports.cancelorder = async (req, res) => {
  try {
    const deleteentry = await Orderproduct.deleteOne({ _id: req.params.id });
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

exports.allorder = async (req, res) => {
  const findall = await Orderproduct.find().sort({ sortorder: 1 });
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
