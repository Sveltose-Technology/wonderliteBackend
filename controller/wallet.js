const Wallet = require("../models/wallet");
const { v4: uuidv4 } = require("uuid");

exports.addto_wallet = async (req, res) => {
  const { userId, amount } = req.body;

  const newWallet = new Wallet({
    userId: userId,
    walletId: uuidv4(),
    amount: amount,
  });

  newWallet.save(function (err, data) {
    if (err) {
      res.status(400).json({
        status: false,
        msg: "error occured",
        error: err,
      });
    } else {
      res.status(200).json({
        status: true,
        msg: "Amount added to wallet",
        data: newWallet,
      });
    }
  });
};
