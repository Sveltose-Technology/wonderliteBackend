const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: "true",
    },
    walletId: {
      type: mongoose.Schema.Types.ObjectId,
      //ref: "user",
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      default: 0,
    },
    // orderby: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    // product: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
    // product_price: {
    //   type: Number,
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("wallet", walletSchema);
