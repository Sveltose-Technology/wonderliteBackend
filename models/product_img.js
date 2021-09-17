const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productimgSchema = new mongoose.Schema(
  {
    product_title: {
      type: String,
      require: true,
    },
    product_img: {
      type: Array,
    },
    status: {
      type: String,
      default: "Active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("product_img", productimgSchema);
