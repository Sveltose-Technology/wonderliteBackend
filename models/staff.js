const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const staffSchema = new Schema(
  {
    staffID: {
      type: String,
      require: true,
    },
    staffname: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    desc: {
      type: String,
      require: true,
    },
    staffImage: {
      type: String,
    },
    sortorder: {
      type: Number,
    },
    status: {
      type: String,
      default: "Active",
    },
    role: {
      type: String,
      default: "EM",
    },
    //roles
  //EM Employee
    //AA Account Manager
    //
  },
  { timestamps: true }
);

module.exports = mongoose.model("staff", staffSchema);
