const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const summerySchema = new Schema(
  {
    title: {
      type: String,
    },
    summery: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("productsummery", summerySchema);
