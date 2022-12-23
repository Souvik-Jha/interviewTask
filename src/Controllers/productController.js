const productModel =require("../Models/productModel")
const vendorModel = require('../Models/vendorModel')

function isValid(data){
    if(typeof data== "undefined" || data == null) return false
    if(typeof data == "string" && data.trim().length == 0) return false
    return true
}


const addProduct = async function(req,res){
    try{
        let vendorId = req.params.vendorId
        if(!mongoose.isValidObjectId(vendorId)) return res.status(400).send({status:false,msg:"provide a valid vendorId"})
        const vendorCheck = await vendorModel.findOne({_id:vendorId})
        if(!vendorCheck) return res.status(400).send({status:true,msg:"vendor not present"})
        if(req.tokenId!=vendorCheck.UserId) return res.status(403).send({status:false,msg:"you are unauthorized"})

        let data = req.body
        let {ProductName, ProductPrice, ProductImage} = data

        if(!ProductName) return res.status(400).send({status:false,msg:"provide product Name"})
        if(!isValid(ProductName)) return res.status(400).send({status:false,msg:"Product Name is invalid"})

        if(!ProductPrice) return res.status(400).send({status:false,msg:"provide Price"})
        if(!isValid(ProductPrice)) return res.status(400).send({status:false,msg:"price is invalid"})

        data.vendorId = vendorId
        addProduct = await productModel.create(data)
        return res.status(201).send({status:true,data:addProduct})

    }catch(err){
        console.log(err)
        return res.status(500).send({status:false,data:err.message})
    }
}

const updateProduct = async function(req,res){
    try{
        let productId = req.params.productId
        if(!mongoose.isValidObjectId(productId)) return res.status(400).send({status:false,msg:"provide a valid productId"})
        const productCheck = await productModel.findOne({_id:productId})
        if(!productCheck) return res.status(400).send({status:true,msg:"product not present"})
        if(productCheck.isDeleted == true) return res.status(400).send({status:false,msg:"product already deleted"})
        const vendorCheck = await vendorModel.findOne({_id:productCheck.vendorId})
        if(req.tokenId!=vendorCheck.UserId) return res.status(403).send({status:false,msg:"you are unauthorized"})

        let data = req.body
        let {ProductName, ProductPrice, ProductImage} = data

        if(ProductName) {
        if(!isValid(ProductName)) return res.status(400).send({status:false,msg:"Product Name is invalid"})
        }

        if(ProductPrice){
        if(!isValid(ProductPrice)) return res.status(400).send({status:false,msg:"price is invalid"})
        }

        let updateData  = await productModel.updateOne({_id:productId},data,{new:true})
        return res.status(200).send({status:false,msg:updateData})


    }catch(err){
        console.log(err)
        return res.status(500).send({status:false,data:err.message})
    }
}

const getProduct = async function(req,res){
    try{
        let vendorId = req.params.vendorId
        if(!mongoose.isValidObjectId(vendorId)) return res.status(400).send({status:false,msg:"provide a valid vendorId"})
        const vendorCheck = await vendorModel.findOne({_id:vendorId})
        if(!vendorCheck) return res.status(400).send({status:true,msg:"vendor not present"})

        let {ProductName,ProductId} = req.query
        if(ProductName) {
            if(!isValid(ProductName)) return res.status(400).send({status:false,msg:"Product Name is invalid"})
        }
        if(ProductId){
            if(!mongoose.isValidObjectId(vendorId)) return res.status(400).send({status:false,msg:"provide a valid vendorId"})
        }

        let getProduct = await productModel.find({...query,isDeleted:false})
        if(!getProduct.length) return res.status(404).send({status:false,data:"no such Product"})
        return res.status(200).send({status:false,data:getProduct})

    }catch(err){
        console.log(err)
        return res.status(500).send({status:false,data:err.message})
    }
}

const deleteProduct = async function(req,res){
    try{
        let productId = req.params.productId
        if(!mongoose.isValidObjectId(productId)) return res.status(400).send({status:false,msg:"provide a valid productId"})
        const productCheck = await productModel.findOne({_id:productId})
        if(!productCheck) return res.status(400).send({status:true,msg:"product not present"})
        if(productCheck.isDeleted == true) return res.status(400).send({status:false,msg:"product already deleted"})
        const vendorCheck = await vendorModel.findOne({_id:productCheck.vendorId})
        if(req.tokenId!=vendorCheck.UserId) return res.status(403).send({status:false,msg:"you are unauthorized"})

        let deleteData  = await productModel.updateOne({_id:productId},{isDeleted:true},{new:true})
        return res.status(200).send({status:false,msg:deleteData})
    }catch(err){
        console.log(err)
        return res.status(500).send({status:false,data:err.message})
    }
}

module.exports={addProduct,deleteProduct,getProduct,updateProduct}