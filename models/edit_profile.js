const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const edit_profileSchema = new Schema(
  {
    userID: {
      type: String,
    },
    username: {
      type: String,
      require: true,
    },
    business_name: {
      type: String,
      require: true,
    },
    mobile_no: {
      type: String,
      require: true,
    },
    alt_mobileno: {
      type: Number,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    gst_no: {
      type: String,
    },
    address: {
      type: String,
      require: true,
    },
    state: {
      type: String,
      require: true,
    },
    city: {
      type: String,
      require: true,
    },
    pincode: {
      type: String,
    },
    bank_name: {
      type: String,
    },
    account_name: {
      type: Number,
    },
    account_no: {
      type: Number,
    },
    ifsc_no: {
      type: String,
    },

    userImage: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("edit_profile", edit_profileSchema);
