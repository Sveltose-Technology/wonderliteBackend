const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const buyonegetoneSchema = new mongoose.Schema(
  {
    product_x: {
      type: Schema.Types.ObjectId,
      ref: "product",
      require: true,
    },
    product_y: {
      type: Schema.Types.ObjectId,
      ref: "product",
      require: true,
    },
    product_rate: {
      type: Number,
      require: true,
    },
    product_x_qty: {
      type: Number,
      require: true,
    },
    product_y_qty: {
      type: Number,
      require: true,
    },
    description: {
      type: String,
    },
    sortorder: {
      type: Number,
    },
    status: {
      type: String,
      default: "Active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("buyonegetone", buyonegetoneSchema);
