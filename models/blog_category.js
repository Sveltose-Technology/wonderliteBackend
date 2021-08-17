const mongoose = require("mongoose");
const schema = mongoose.Schema;

const blog_categorySchema = new schema(
  {
    antibiotic: {
      type: String,
      require: true,
    },
    diseases: {
      type: schema.Types.ObjectId,
    },
    healthcare: {
      type: String,
    },
    heart_rate: {},
    hospital: {
      type: String,
    },
    infectious: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("blog_category", blogcategorySchema);
