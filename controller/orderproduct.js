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

// exports.cancelorder = async(req,res)=>{(
//     const
// )}

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
