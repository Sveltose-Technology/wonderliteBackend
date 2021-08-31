const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shophasproductSchema = new Schema(
  {
    product_title: {
      type: String,
      require: true,
    },
    productID: {
      type: String,
      require: true,
    },
    brandId: {
      type: String,
      require: true,
    },
    sortorder: {
      type: Number,
    },
    //roles
    //EM Employee
    //AA Account Manager
    //
  },
  { timestamps: true }
);

module.exports = mongoose.model("shophasproduct", shophasproductSchema);
