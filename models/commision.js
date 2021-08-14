const mongoose = require("mongoose"),
const Schema = mongoose.Schema

const commissionSchema = new Schema (
{
    comission_for:{
        type:String
    },
    category:{
        type:String,
    },
    subcategory:{
        type:String
    },
    commission_rate:{
        type:Number
    },
    type:{
        type:String
    },

},{timestamps:true}
)

module.exports = mongoose.model("commission",commissionSchema)