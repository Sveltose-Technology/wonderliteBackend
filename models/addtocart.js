const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema(
  {
    order: {
      type: Number,
      required: true,
    },
    productId: {
      type: String,
    },
    qty: {
      type: String,
    },
    customer_name: {
      type: String,
    },

    // cart: [{ type: Schema.Types.ObjectId, ref: "product" }],
    // sortorder: {
    //   type: Number,
    // },

    status: {
      type: String,
      default: "Active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("cart", cartSchema);
