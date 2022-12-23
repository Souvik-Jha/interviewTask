const vendorModel = require("../Models/vendorModel.js")
const userModel = require("../Models/userModel")
const mongoose = require("mongoose")

function isValid(data){
    if(typeof data== "undefined" || data == null) return false
    if(typeof data == "string" && data.trim().length == 0) return false
    return true

}



const addVendor = async function(req,res){
    try{
        userId = req.params.userId
        if(!mongoose.isValidObjectId(userId)) return res.status(400).send({status:false,msg:"provide a valid UserId"})
        const userCheck = await userModel.findOne({_id:userId})
        if(!userCheck) return res.status(400).send({status:true,msg:"user not present"})

        if(userId != req.tokenId) return res.status(403).status({status:false,msg:"you are unauthorized"})

        let data = req.body
        let {VendorAddress,VendorPhone,VendorCategory} = data

        if(!VendorAddress) return res.status(400).send({status:false,msg:"provide vendorAddress"})
        if(!isValid(VendorAddress)) return res.status(400).send({status:false,msg:"VendorAddress is invalid"})
        
        
        if(!VendorPhone) return res.status(400).send({status:false,msg:"provide phone No."})
        if(!isValid(VendorPhone)) return res.status(400).send({status:false,msg:"phone No. is invalid"})

        if(!VendorCategory) return res.status(400).send({status:false,msg:"provide Vendor Category"})
        if(!isValid(VendorCategory)) return res.status(400).send({status:false,msg:"Vendor Category is invalid"})

        data.UserId = userId
        data.VendorEmail = userCheck.email
        data.VendorName = userCheck.fullname

        updateUser  = await userModel.updateOne({_id:userId},{userType:"Vendor"},{new:true})
        console.log(updateUser)
        let createUser = await vendorModel.create(data)
        return res.status(201).send({status:true,msg:createUser})

    }catch(err){
        console.log(err)
        return res.status(500).send({status:false,msg:err.message})
    }
}

module.exports = {addVendor}