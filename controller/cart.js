const Cart = require("../models/cart");

exports.addtocartproduct = async (req, res) => {
  const { orderby, product, product_price, product_qty } = req.body;

  const addtoCart = new Cart({
    orderby: orderby,
    product: product,
    product_price: product_price,
    product_qty: product_qty,
  });

  const findexist = await Cart.findOne({
    $and: [{ orderby: orderby }, { product: product }],
  });
  if (findexist) {
    res.status(400).json({
      status: false,
      msg: "Already exist",
      data: {},
    });
  } else {
    addtoCart.save(function (err, data) {
      if (err) {
        res.status(400).json({
          status: false,
          msg: "Error Occured",
          error: err,
        });
      } else {
        res.status(200).json({
          status: false,
          msg: "Product added to cart",
          data: data,
        });
      }
    });
  }
};

// exports.productsummary = async (req, res) => {
//   const allproductsincart = await Cart.find({ orderby: orderby });

//   if (allproductsincart) {
//     //console.log(allproductsincart);

//     const total = 0;
//     for (const product_price in allproductsincart) {
//       if (
//         allproductsincart.hasOwnProperty.call(allproductsincart, product_price)
//       ) {
//         const element = allproductsincart[product_price];
//         total += allproductsincart[product_price];
//       }
//     }
//   }
// };

exports.getallcart = async (req, res) => {
  const findall = await Cart.find().sort({ sortorder: 1 });
  if (findall) {
    res.status(200).json({
      status: true,
      msg: "success",
      data: findall,
    });
  } else {
    res.status(400).json({
      status: true,
      msg: "error",
      error: "error",
    });
  }
};

exports.editorder = async (req, res) => {
  const editorder = req.body;
  console.log(editorder);
  const findandUpdateEntry = await Cart.findOneAndUpdate(
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
      status: "error",
      error: "error",
    });
  }
};

exports.removecart = async (req, res) => {
  try {
    const deleteentry = await Cart.deleteOne({ _id: req.params.id });
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
