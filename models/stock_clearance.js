const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stockclearanceSchema = new Schema(
  {
    stockclearance_title: {
      type: String,
    },
    stockqty: {
      type: Number,
    },
    status: {
      type: String,
      default: "Active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("stock_clearance", stockclearanceSchema);
