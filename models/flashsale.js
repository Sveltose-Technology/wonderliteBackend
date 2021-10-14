const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const flashsaleSchema = new mongoose.Schema(
  {
    flashsale_title: {
      type: String,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "product",
      require: true,
    },
    flashsale_img: {
      type: Array,
    },
    description: {
      type: String,
    },
    product_price: {
      type: Number,
    },
    currentTime: {
      type: String,
    },
    dealer: {
      type: Number,
    },
    manufacturer: {
      type: Number,
    },
    stocklist: {
      type: Number,
    },
    distributer: {
      type: Number,
    },
    sretailer: {
      type: Number,
    },
    rate_retailer: {
      type: Number,
    },
    rate_builder_contractor: {
      type: Number,
    },
    customer: {
      type: Number,
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
