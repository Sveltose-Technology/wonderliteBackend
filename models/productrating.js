const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productratingSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
    },
    user_id: {
      type: String,
      require: true,
    },
    product_id: {
      type: String,
      require: true,
    },
    starvalue: {
      type: Number,
      default: 0,
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

module.exports = mongoose.model("productrating", productratingSchema);
