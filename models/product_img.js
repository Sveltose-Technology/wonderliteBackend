const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productimgSchema = new mongoose.Schema(
  {
    product_img: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("product_img", productimgSchema);
