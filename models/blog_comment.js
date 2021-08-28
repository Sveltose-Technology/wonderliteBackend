const mongoose = require("mongoose");
const schema = mongoose.Schema;

const commentblogSchema = new schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    website: {
      type: String, // Optional
    },
    // comment_count: {
    //   type: Number,
    //   default: 0,
    // },
    comment: {
      type: String,
    },
    commentby_cat: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("blog_comment", commentblogSchema);
