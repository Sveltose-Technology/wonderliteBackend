const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const promotedbrandSchema = new mongoose.Schema(
  {
    promotion_title: {
      type: String,
      require: true,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "brand",
      require: true,
    },
    promotion_img: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("promotedbrand", promotedbrandSchema);
