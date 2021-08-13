const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bannerSchema = new Schema(
  {
    banner_title: {
      type: String,
    },
    banner_img: {
      type: String,
    },
    bannertype: {
      type: String,
    }, //HB,
    status: {
      type: String,
      default: "Active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("banner_img", bannerSchema);
