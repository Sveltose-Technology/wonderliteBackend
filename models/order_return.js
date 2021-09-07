const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const order_returnSchema = new mongoose.Schema(
  {
    return_title: {
      type: String,
      require: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      require: true,
    },
    reason: {
      type: String,
      require: true,
    },
    returnId: {
      type: String,
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
    status: {
      type: String,
      // processed,picked_up,returned
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("product_return", order_returnSchema);
