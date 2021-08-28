const mongoose = require("mongoose");
const blog_category = require("./blog_category");

const blogSchema = new mongoose.Schema(
  {
    blog_title: {
      type: String,
    },
    blog_img: {
      type: String,
    },
    full_desc: {
      type: String,
    },
    short_desc: {
      type: String,
    },
    category: {
      type: String,
    },

    categorybytype: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("blogSchema", blogSchema);
