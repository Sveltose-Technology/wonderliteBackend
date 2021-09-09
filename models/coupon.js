const mongoose = require("mongoose");

const CouponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      require: true,
      unique: true,
    },
    email: {
      type: String,
    },
    duration: {
      type: String,
      default: once,
    },
    isPercent: {
      type: Boolean,
      require: true,
      default: true,
    },
    amount: {
      type: Number,
      required: true,
    },

    expireDate: {
      type: String,
      require: true,
      default: "",
    },
    isActive: {
      type: Boolean,
      require: true,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("coupon", CouponSchema);
