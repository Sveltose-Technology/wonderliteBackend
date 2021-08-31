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

//exports.delivered = async (req, res, next) => {};
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

  // const data = await Orderproduct.find({
  //   $and: [{ user: req.params.id }, { status: "Pending" }],
  // })

  // if (status == "Pending" || status == "pending") {
  //   Orderproduct.findOne(
  //     { _id: req.params.id },
  //     { $set: req.body },
  //     (err, resp) => {
  //       if (err) {
  //         res.json(err);
  //       } else {
  //         res.json({ code: 200, msg: "status change successfully" });
  //       }
  //     }
  //   );
  // } else if (status == "Cancelled" || status == "Cancelled") {
  //   Orderproduct.findOne(
  //     { _id: req.body.id },
  //     { $set: req.body },
  //     (err, resp) => {
  //       if (err) {
  //         res.json(err);
  //       } else {
  //         res.json(resp);
  //       }
  //     }
  //   );
  // }
};
// else if (req.body.status == 2 || req.body.status == "2") {
//     console.log("pending");
//   }
// };

//exports.orderplaced = async (req, res) => {};

// exports.pending_order = (req, res) => {
//   //const { orderId } = req.body;
//   if (req.body.status == 1) {
//     Orderproduct.findOne(
//       { _id: req.params.orderId },
//       { $set: { status: "not approve" } },
//       (err, resp) => {
//         if (err) {
//           res.json(err);
//         } else {
//           res.json(resp);
//         }
//       }
//     );
//   } else if (req.body.status == 0) {
//     Orderproduct.findOne(
//       { _id: req.params.orderId },
//       { $set: { status: "pending" } },
//       (err, resp) => {
//         if (err) {
//           res.json(err);
//         } else {
//           res.json(resp);
//         }
//       }
//     );
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
