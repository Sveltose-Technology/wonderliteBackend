const Orderreturn = require("../models/order_return");
const { v4: uuidv4 } = require("uuid");
exports.addorder_return = async (req, res) => {
  const { userId, order_id, product_id, reason, status } = req.body;

  const newOrderreturn = new Orderreturn({
    returnId: uuidv4(),
    userId: userId,
    order_id: order_id,
    product_id: product_id,
    reason: reason,
    status: status,
  });

  newOrderreturn.save(function (err, data) {
    if (err) {
      res.status(400).json({
        status: false,
        msg: "Error Occured",
        err: err,
      });
    } else {
      res.status(200).json({
        status: true,
        msg: "success",
        data: newOrderreturn,
      });
    }
  });
};

// exports.allreturn_order = async (req, res) => {
//   const data = await Orderreturn.find({
//     $and: [{ returnId: req.params.id }, { status: "pickedup" }],
//   })
//     .then((result) => {
//       res.status(200).json({
//         status: true,
//         data: result,
//       });
//     })
//     .catch((err) => {
//       res.status(200).json({
//         status: false,
//         error: err,
//       });
//     });
// };

exports.allreturn_order = async (req, res) => {
  const findall = await Orderreturn.find().sort({ sortorder: 1 });
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

exports.deletereturn_order = async (req, res) => {
  try {
    const deleteentry = await Orderreturn.deleteOne({ _id: req.params.id });
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

//exports.allreturn = async (req, res) => {};

// exports.addexchange = async (req, res) => {
//   const { userId, product_id, order_id } = req.body;
//   const data_check = await Returnandexchange.findOne({ order_id: order_id });
//   if (data_check) {
//     const Datas = Returnandexchange({
//       userId: userId,
//       product_id: product_id,
//       order_id: order_id,
//     });

//     Datas.save().then((resp) => {
//       res.json({ status: 200, msg: "success", data: Datas });
//     });
//   } else {
//     res.json({ status: 400, msg: "error" });
//   }
// };
