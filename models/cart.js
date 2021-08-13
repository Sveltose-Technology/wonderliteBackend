const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   // required: true,
    // },
    products: [
      {
        product: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
        quantity: Number,
        name: String,
        price: Number,
      },
    ],
    product_name: {
      type: String,
    },
    product_price: {
      type: Number,
    },
    product_qty: {
      type: Number,
      //default: 1,
    },
    active: {
      type: Boolean,
      default: true,
    },
    modifiedOn: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
