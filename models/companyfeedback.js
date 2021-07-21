const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companyfeedbackSchema = new Schema(
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
    rating: {
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

module.exports = mongoose.model("companyfeedback", companyfeedbackSchema);
