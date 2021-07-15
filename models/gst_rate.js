const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gstrateSchema = new Schema(
  {
    gst_title: {
      type: String,
      require: true,
    },
    value: {
      type: Number,
      require: true,
    },
    desc: {
      type: String,
      reuire: true,
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

module.exports = mongoose.model("gst_rate", gstrateSchema);
