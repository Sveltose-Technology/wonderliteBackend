const mongoose = require("mongoose");
const schema = mongoose.Schema;

const blognewsSchema = new schema(
  {
    news_title: {
      type: String,
    },
    // news_subtitle: {
    //   type: String,
    // },
    news_img: {
      type: String,
    },
    description: {
      type: String,
    },
    date: {
      type: String,
    },
    time: {
      type: String,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("blog_news", blognewsSchema);
