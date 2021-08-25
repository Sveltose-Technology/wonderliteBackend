const mongoose = require("mongoose");
const blog_category = require("./blog_category");

const blogSchema = new mongoose.Schema(
  {
    blog_title: {
      type: String,
    },
    blog_category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: blog_category,
    },
    // comment_count: {
    //   type: Number,
    //   default: 0,
    // },
    comments: {
      type: String,
    },
    // reply: {
    //   type: String,
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("blogSchema", blogSchema);
