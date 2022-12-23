const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    ProductName:{
        type:String,
        required: true
    },
    ProductPrice:{
        type:String,
        required: true
    },
    ProductImage:{
        type:File,
        required: true
    },
    vendorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Vendor",
        required: true
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

module.exports = mongoose.model("Product",productSchema)