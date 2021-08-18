const mongoose = require("mongoose");
const schema = mongoose.Schema;

const contact_usSchema = new schema(
  {
    you_are: {
      type: String,
    },

    typeof_req: {
      type: String,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    mobile_no: {
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

module.exports = mongoose.model("contact_us", contact_usSchema);
