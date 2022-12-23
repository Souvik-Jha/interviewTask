const userModel = require("../Models/userModel")
const jwt = require("jsonwebtoken")

function isValid(data){
    if(typeof data== "undefined" || data == null) return false
    if(typeof data == "string" && data.trim().length == 0) return false
    return true
}

const signUp = async function(req,res){
    try{
        let data = req.body
        if(!Object.keys(data).length>0) return res.status(400).send({status: false,msg:"provide data to signUp"})
        let {country,password,email,fullname} = data 

        
        if(!fullname) return res.status(400).send({status:false,msg:"provide fullname"})
        if(!isValid(fullname)) return res.status(400).send({status:false,msg:"fullname is invalid"})
        
        if(!email) return res.status(400).send({status:false,msg:"provide email"})
        if(!isValid(email)) return res.status(400).send({status:false,msg:"email is invalid"})
        let emailCheck = await userModel.findOne({email})
        if(emailCheck) return res.status(400).send({status:false,msg:"this email is already present"})
        
        if(!password) return res.status(400).send({status:false,msg:"provide country"})
        if(!isValid(password)) return res.status(400).send({status:false,msg:"country is invalid"})
        
        if(!country) return res.status(400).send({status:false,msg:"provide country"})
        if(!isValid(country)) return res.status(400).send({status:false,msg:"country is invalid"})


        let createUser = await userModel.create(data)
        return res.status(201).send({status:true,msg:createUser})
    }catch(err){
        console.log(err)
        return res.status(500).send({status:false,msg:err.message})
    }
}

const signIn = async function(req,res){
    try{
        let data = req.body
        let {email,password} = data

        if(!email) return res.status(400).send({status:false,msg:"provide email"})
        if(!isValid(email)) return res.status(400).send({status:false,msg:"email is invalid"})
        let emailCheck = await userModel.findOne({email})
        if(!emailCheck) return res.status(400).send({status:false,msg:"this email is not present"})
        
        if(!password) return res.status(400).send({status:false,msg:"provide country"})
        if(!isValid(password)) return res.status(400).send({status:false,msg:"country is invalid"})

        const checkuser = await userModel.findOne({email,password})
        if(!checkuser) return res.ststus(400).send({status:false,msg:"provide correct credentials"})

        let token = jwt.sign(
            {userId : checkuser._id},
            "project Store"
        )
        res.header("x-api-key",token)
        return res.status(200).send({status:true,msg:"Sign In successfull", token: token})

    }catch(err){
        console.log(err)
        return res.status(500).send({status:false,msg:err.message})
    }
}


module.exports = {signIn,signUp}