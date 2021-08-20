const mongoose = require("mongoose");
const schema = mongoose.Schema;

const blogcategorySchema = new schema(
  {
    short_desc: {
      type: String,
    },
    full_desc: {
      type: String,
    },
    cat_img: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("blog_category", blogcategorySchema);
