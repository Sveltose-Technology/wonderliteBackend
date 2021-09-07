const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const flashsaleSchema = new mongoose.Schema(
  {
    flashsale_title: {
      type: String,
      //require: true,
    },
    // product: {
    //   type: Schema.Types.ObjectId,
    //   ref: "product",
    //   require: true,
    // },
    product_price: {
      type: Number,
    },
    flashsale_img: {
      type: Array,
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

module.exports = mongoose.model("flashsale", flashsaleSchema);
