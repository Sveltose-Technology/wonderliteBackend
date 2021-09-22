const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addproductSchema = new Schema(
  {
    product_title: {
      type: String,
      require: true,
    },
    product_img: {
      type: String,
      require: true,
    },
    short_desc: {
      type: String,
      require: true,
    },
    long_desc: {
      type: String,
      require: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
    size: {
      type: String,
      require: true,
    },
    colour: {
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

module.exports = mongoose.model("add_product", addproductSchema);
