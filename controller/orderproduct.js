const Orderproduct = require("../models/orderproduct");
const { v4: uuidv4 } = require("uuid");

exports.productorder = async (req, res) => {
  const {
    user,
    product,
    address,
    purchaseprice,
    reachedlocation,
    shippingdate,
    deliverdondate,
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
  });
  //   const findexist = await Orderproduct.findOne({
  //     $and: [{ userId: userId }, { product: product }],
  //   });
  //   if (findexist) {
  //     res.status(400).json({
  //       status: false,
  //       msg: "Already Exists",
  //       data: {},
  //     });
  //   } else {
  neworderproduct.save(function (err, data) {
    if (err) {
      res.status(400).json({
        status: false,
        msg: "Error Occured",
        error: err,
      });
    } else {
      res.status(200).json({
        status: false,
        msg: "Product added to order",
        data: neworderproduct,
      });
    }
  });
  //}
};
