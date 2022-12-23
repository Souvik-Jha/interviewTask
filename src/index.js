const express = require("express")
const BodyParser = require("body-parser")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const multer = require("multer")
const app = express()
const route = require("./Routes/route")

app.use(bodyParser.json())
app.use(multer().any())

mongoose.set('strictQuery', false)
mongoose.connect("mongodb+srv://Souvik_Jha:Govtjob1@cluster0.zb2phjl.mongodb.net/TASK",
{useNewUrlParser:true})
.then(()=>console.log("mongodb is connected"))
.catch((err)=>console.log(err))

app.use("/",route)

app.listen((process.env.PORT||3000),function(){
    console.log("Express app is running on port "+(process.env.PORT||3000))
})