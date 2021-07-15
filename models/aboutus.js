const mongoose = require("mongoose")
const Schema = mongoose.Schema


const aboutusSchema = new Schema({
    aboutus_title: {
        type: String,
        require: true
    },
    display: {
        type: String,
        require: true
    },
    sortorder: {
        type: Number,
    },
    status: {
        type: String,
        default: "Active"
    }
},
    { timestamps: true }
)

module.exports = mongoose.model("aboutus", aboutusSchema)