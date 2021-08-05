const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userID: {
      type: String,
      require: true,
    },
    username: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    expireIn: {
      type: Number,
    },
    code: {
      type: String,
      default: 1234,
    },
    pincode: {
      type: Number,
    },
    phone_no: {
      type: Number,
    },
    mobile_no: {
      type: Number,
    },
    email: {
      type: String,
    },
    website: {
      type: String,
    },
    date_of_birth: {
      type: Number,
    },
    marriage_anniversary: {
      type: Number,
    },
    gstin_no: {
      type: String,
    },
    udhyog_adhar_no: {
      type: String,
    },
    licence_no: {
      type: Number,
    },
    technician_assot_no: {
      type: String,
    },
    gov_licence_no: {
      type: String,
      user_img: {
        type: String,
      },
    },
    aadhar_no: {
      type: Number,
    },
    pancard_no: {
      type: String,
    },
    bank_name: {
      type: String,
    },
    bank_user_name: {
      type: String,
    },
    bank_account_no: {
      type: Number,
    },
    ifsc_code: {
      type: String,
    },
    role: {
      type: String,
      require: true,
    }, //Dealer: DL ,Distributer:Ds, Customer:CS, Technician:Tc,Retailer: RL
    userImage: {
      type: String,
      require: true,
    },
    resetLink: {
      data: String,
      default: "",
    },

    cart: [{ type: Schema.Types.ObjectId, ref: "product" }],
    sortorder: {
      type: Number,
    },

    status: {
      type: String,
      default: "Active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
