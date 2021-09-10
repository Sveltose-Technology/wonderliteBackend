const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema(
  {
    // orderby: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    // product: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
    // product_price: {
    //   type: Number,
    // },

    walletId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    amount: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("wallet", walletSchema);
