const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const promotedbrandSchema = new mongoose.Schema(
  {
    promotedbrand_title: {
      type: String,
      require: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "product",
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("promotedbrand", promotedbrandSchema);
