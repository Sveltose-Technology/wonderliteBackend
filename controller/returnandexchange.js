const Returnandexchange = require("../models/returnandexchange");

exports.add_productreturn = async (req, res) => {
  const { userId, return_title, product_id, order_id } = req.body;

  const newReturnandexchange = new Returnandexchange({
    userId: userId,
    return_title: return_title,
    //product_exchange: exchange,
    product_id: product_id,
    order_id: order_id,
  });

  newReturnandexchange.save(function (err, data) {
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
        data: newReturnandexchange,
      });
    }
  });
};

exports.addexchange = async (req, res) => {
  const { userId, product_id, order_id } = req.body;
  const data_check = await Returnandexchange.findOne({ order_id: order_id });
  if (data_check) {
    const Datas = Returnandexchange({
      userId: userId,
      product_id: product_id,
      order_id: order_id,
    });

    Datas.save().then((resp) => {
      res.json({ status: 200, msg: "success", data: Datas });
    });
  } else {
    res.json({ status: 400, msg: "error" });
  }
};
