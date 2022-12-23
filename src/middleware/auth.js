const jwt = require("jsonwebtoken")

const authenticaiton =async function(req,res,next){
    try{
        let token = req.header("x-api-key")
        if(!token) return res.status(400).send("provide token")

        let decode = jwt.decode(token)
        if(!decode) return res.status(401).send({status:false,msg:"provide a valid token"})

        jwt.verify(token,"project Store",function (err, decoded) {
            if (err) {
                return res.status(401).send({ status: false, message: "invalid token" })
            } else {
                req.tokenId = decoded.userId
                console.log(req.tokenId)
                return next();
            }
        })


    }catch(err){
        console.log(err)
        return res.status(500).send({status:false,msg:err.message})
    }
}

module.exports = {authenticaiton}