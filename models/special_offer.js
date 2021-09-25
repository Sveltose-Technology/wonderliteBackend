const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const specialofferSchema = new mongoose.Schema(
  {
    specialoffer_title: {
      type: String,
      require: true,
    },
    // product_price: {
    //   type: Number,
    // },

    // product_qty: {
    //   type: Number,
    // },
    offer_img: {
      type: String,
    },
    // description: {
    //   type: String,
    // },
    // sortorder: {
    //   type: Number,
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("special_offer", specialofferSchema);
