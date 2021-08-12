const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dealofthedaySchema = new mongoose.Schema(
  {
    dealoftheday_title: {
      type: String,
      require: true,
    },
    // product: {
    //   type: Schema.Types.ObjectId,
    //   ref: "product",
    //   require: true,
    // },
    product_price: {
      type: Number,
    },

    product_qty: {
      type: Number,
    },
    product_img: {
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

module.exports = mongoose.model("dealofthe_day", dealofthedaySchema);
