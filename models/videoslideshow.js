const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const videoslideshowSchema = new mongoose.Schema(
  {
    video_url: {
      type: String,
    },
    sortorder: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("videoslideshow", videoslideshowSchema);
