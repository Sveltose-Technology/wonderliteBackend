const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const product_returnSchema = new mongoose.Schema(
  {
    return_reason: {
      type: String,
      require: true,
    },
    exchange_reason: {
      type: String,
      require: true,
    },
    product_id: {
      type: Schema.Types.ObjectId,
      ref: "product",
      require: true,
    },
    order_id: {
      type: String,
      ref: "order",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("product_return", product_returnSchema);
