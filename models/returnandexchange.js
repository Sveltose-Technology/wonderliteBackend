const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const product_returnSchema = new mongoose.Schema(
  {
    return_title: {
      type: String,
      require: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      require: true,
    },
    exchange: {
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
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("product_return", product_returnSchema);
