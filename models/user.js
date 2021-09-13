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
    usertype: {
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
    address_main: {
      type: String,
    },
    address_landmark: {
      type: String,
    },
    address_pincode: {
      type: String,
    },
    address_locality: {
      type: String,
    },
    address_city: {
      type: String,
    },
    address_state: {
      type: String,
    },
    address_county: {
      type: String,
    },
    address_mobile: {
      type: String,
    },
    address_altmobile: {
      type: String,
    },
    address_dellocatetype: {
      type: String,
    }, //Home //Office
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
    address: {
      type: String,
    },
    country: {
      type: String,
      require: true,
    },
    state: {
      type: String,
      require: true,
    },
    city: {
      type: String,
      require: true,
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
    farm_name: {
      type: Number,
    },
    pancard_no: {
      type: String,
    },
    eb_license: {
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
