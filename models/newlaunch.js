const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newlaunchSchema = new mongoose.Schema(
  {
    newlaunch_title: {
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
    Image: {
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

module.exports = mongoose.model("newlaunch", newlaunchSchema);
