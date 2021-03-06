const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const offeranddealsSchema = new mongoose.Schema(
  {
    offeranddeals_title: {
      type: String,
      require: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "product",
      require: true,
    },
    product_price: {
      type: Number,
    },
    offer_img: {
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

module.exports = mongoose.model("offeranddeals", offeranddealsSchema);
