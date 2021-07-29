const Stock_clearance = require("../models/stock_clearance");

exports.stockclearance = async (req, res) => {
  //const stockqty = await Stock_clearance.findOne(
  //{ _id: req.params.id },
  //{ $set: req.body },
  //{ new: true }
  const newStock_clearance = new Stock_clearance({
    stockqty: req.body.stockqty,
  });
  const qty = await Stock_clearance.findOne(
    { _id: req.params.id },
    { $set: req.body },
    { new: true }
  );
  if (qty > 0) {
    res.status(200).json({
      status: true,
      data: qty,
    });
  } else {
    res.status(400).json({
      msg: "Product out of stock",
    });
  }
};

//   const { qty } = req.body;
//   if (qty > 0) {
//     res.status(200).json({
//       status: true,
//       msg: "success",
//       data: stockqty,
//     });
//   } else {
//     res.status(400).json({
//       status: false,
//       msg: "out of stock",
//     });
//   }
// };
