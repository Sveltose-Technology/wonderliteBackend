const Addtocart = require("../models/addtocart");

exports.addcart = async (req, res) => {
  const { email, product_id, qty } = req.body;

  const newAddtocart = new Addtocart({
    email: email,
    product_id: product_id,
    qty: qty,
  });

  const findexist = await Addtocart.findOne({ product_id: product_id });
  if (findexist) {
    res.status(400).json({
      status: false,
      msg: "Already Exists",
      data: {},
    });
  } else {
    const qtyint = Number.parseInt(qty);
    console.log("qty: ", qtyint);
    Addtocart.findOneAndUpdate(
      { email: email },
      { $push: { cart: product_id } },
      // { $pop: { cart: product_id } },
      { safe: true }
    ).populate("cart");
    Addtocart.findOne({ email: email })
      .exec()
      .then((newAddtocart) => {
        // );
        res.status(200).json({
          status: true,
          data: newAddtocart,
        });
      })
      .catch((err) => {
        res.send(err);
      });
  }
};

exports.order = async (req, res) => {
  //const { product_id } = req.body;

  const order = req.body;
  if (order.product_id) {
    orders.push({
      ...order,

      id: `${orders.length + 1}`,

      date: Date.now().toString(),
    });

    res.status(200).json({
      message: "Order created successfully",
    });
  } else {
    res.status(401).json({
      message: "Invalid Order creation",
    });
  }
};
