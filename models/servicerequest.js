const mongoose = require("mongoose");
const schema = mongoose.Schema;

const service_requestSchema = new schema(
  {
    service_type: {
      type: String,
    },
    customer_type: {
      type: String,
    },
    customer_name: {
      type: String,
    },
    email: {
      type: String,
    },
    mobile_no: {
      type: String,
    },
    alt_mobileno: {
      type: String,
    },
    pincode: {
      type: String,
    },
    location: {
      type: String,
    },
    state: {
      type: String,
    },
    district: {
      type: String,
    },
    address: {
      type: String,
    },
    category: {
      type: String,
    },
    comments: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("servicerequest", service_requestSchema);
