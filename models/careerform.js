const mongoose = require("mongoose");
const schema = mongoose.Schema;

const careerformSchema = new schema(
  {
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    email_address: {
      type: String,
    },
    phone_no: {
      type: String,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    enterfield_choice: {
      type: String,
    },
    summary: {
      type: String,
    },

    career_img: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("careerform", careerformSchema);
