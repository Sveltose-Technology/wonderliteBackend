const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const webbannerSchema = new Schema(
  {
    banner_title: {
      type: String,
    },
    banner_img: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("web_banner", webbannerSchema);
