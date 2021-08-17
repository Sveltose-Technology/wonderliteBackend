const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const buy_xget_ySchema = new mongoose.Schema(
  {
    product_title: {
      type: String,
      required: true,
    },
    product_img: {
      type: String,
    },
    price: {
      type: Number,
      require: true,
    },
    qty: {
      type: Number,
      require: true,
    },
    specification: {
      type: String,
    },
    product_spe: {
      type: String,
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

module.exports = mongoose.model("buy_xget_y", buy_xget_ySchema);
