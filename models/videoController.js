const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const videoSchema = new mongoose.Schema(
  {
    video_title: {
      type: String,
    },
    video_url: {
      type: String,
    },
    sortorder: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("videoController", videoSchema);
