const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    item_name: {
      type: String,
      require: true,
    },
    short_desc: {
      type: String,
    },
    // promotedbrands:{
    //   type :
    // }
    desc: {
      type: String,
      require: true,
    },
    code: {
      type: String,
      require: true,
    },
    hsn_code: {
      type: String,
      require: true,
    },
    productcategory: { type: Schema.Types.ObjectId, ref: "productcategory" },
    productsubcategory: {
      type: Schema.Types.ObjectId,
      ref: "subproductcategory",
    },
    make: {
      type: String,
    },
    unit: { type: Schema.Types.ObjectId, ref: "unit" },
    alt_unit: { type: Schema.Types.ObjectId, ref: "altunit" },
    gst_rate: { type: Schema.Types.ObjectId, ref: "gst_rate" },
    type_of_supply: {
      type: String,
    }, //goods && service
    varient: {
      type: String,
    }, //user input
    material: {
      type: String,
    }, //user input
    stock_qty: {
      type: Number,
    },
    stock_clearance_limit: {
      type: Number,
    },
    //rate: { type: Schema.Types.ObjectId, ref: "rate" },
    rate: {
      type: Number,
    },
    size: {
      type: String,
    },
    colour: {
      type: String,
    },
    product_img: {
      type: Array,
    },
    barcode: {
      type: Number,
    },
    brand: { type: Schema.Types.ObjectId, ref: "brand" },
    std_package: {
      type: String,
    },
    inc_duty_tax: {
      type: Number,
    },
    // product_title: {
    //   type: String,
    // },
    // productImg: {
    //   type: Array,
    // },
    sortorder: {
      type: Number,
    },
    status: {
      type: String,
      default: "Active",
    },
    dealer: {
      type: Number, //20
    },
    manufacturer: {
      type: Number,
    },
    stocklist: {
      type: Number,
    },

    distributer: {
      type: Number,
    },
    sretailer: {
      type: Number,
    },

    rate_retailer: {
      type: Number,
    },
    rate_builder_contractor: {
      type: Number,
    },
    newlaunch: {
      type: Boolean, //true,false
    },
    customer: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", productSchema);
