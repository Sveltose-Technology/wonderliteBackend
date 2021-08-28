const mongoose = require("mongoose");

const rewardpointSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
    },
    rewards_points: {
      type: String,
    },
    order_id: {
      type: String,
    },
    product_id: {},
  },
  { timestamps: true }
);

module.exports = mongoose.model("rewardpoint", rewardpointSchema);
