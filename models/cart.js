// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const cartSchema = new Schema(
//   {
//     userID: {
//       type: Schema.Types.ObjectId,
//       ref: "User",
//     },
//     email: {
//       type: Number,
//       required: true,
//     },
//     productId: {
//       type: Number,
//     },
//     qty: {
//       type: Number,
//     },
//     rate: {
//       type: Number,
//     },
//     customer_name: {
//       type: String,
//     },

//     cart: [{ type: Schema.Types.ObjectId, ref: "product" }],
//     sortorder: {
//       type: Number,
//     },

//     status: {
//       type: String,
//       default: "Active",
//     },
//   },
//   { timestamps: true }
// );

//
//
//module.exports = mongoose.model("cart", cartSchema);

const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },
    products: [
      {
        productId: Number,
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

//its NOT USE

// const mongoose = require("mongoose");

// const ItemSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       // required: true,
//     },
//     CartItems: [
//       {
//         productId: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "product",
//           required: true,
//         },
//         quantity: { type: Number, default: 1, require: true },
//         price: { type: Number, required: true },
//         total: { type: Number, required: true },
//       },
//     ],
//   },
//   { timestamps: true }
// );
// const CartSchema = new mongoose.Schema(
//   {
//     items: [ItemSchema],
//     subTotal: {
//       default: 0,
//       type: Number,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );
// module.exports = mongoose.model("cart", CartSchema);
