const mongoose = require("mongoose");
const schema = mongoose.Schema;

const blognewsSchema = new schema(
  {
    blognews_title: {
      type: String,
    },
    Description: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("blog_news", blognewsSchema);
