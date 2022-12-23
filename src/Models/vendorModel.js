const mongoose = require("mongoose")

const vendorSchema = new mongoose.Schema({
    VendorName:{
        type:String,
        required: true
    },
    VendorPhone:{
        type:String,
        required: true
    },
    VendorEmail:{
        type:String,
        required: true
    },
    VendorAddress:{
        type:String,
        required: true
    },
    VendorCategory:{
        type:String,
        required: true
    },
    UserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})

module.exports = mongoose.model("Vendor",vendorSchema)