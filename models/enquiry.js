const mongoose = require("mongoose");
const Schema  =  mongoose.Schema

const enquirySchema = new Schema({
    userId:{
        type:String,
        require:true
    },
    product_name:{
        type:String,
        require:true
    },
    product_model:{
        type:String,
        require:true
    },
    qty:{
        type:Number,
        require:true
    },
    address:{
        type:String,
        require:true
    },
 sortorder:{
     type:Number,
     require:true
 },
 status:{
     type:String,
     default:"Active"
 }
})


module.exports = mongoose.model("enquiry",enquirySchema)