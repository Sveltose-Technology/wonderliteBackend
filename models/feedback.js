const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const feedbackSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
    feedback: {
      type: String,
      require: true,
    },
    starrating: {
      type: Number,
      require: true,
      default: 100,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "product",
      require: true,
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

module.exports = mongoose.model("feedback", feedbackSchema);
