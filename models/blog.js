const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    blog_title: {
      type: mongoose.Schema.Types.ObjectId,
    },

    blog_img: {
      type: String,
    },
    sort_des: {
      type: String,
    },
    full_des: {
      type: String,
    },
    category: {
      type: String,
    },

    comment: {
      type: String,
    },
    active: {
      type: Boolean,
      default: true,
    },
    modifiedOn: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("blogSchema", blogSchema);
