
const express=require("express");

const app = express();

require('dotenv').config()
var port = process.env.PORT || 8002;

let bgm = process.env.APIKEY

const actionController=require("./route/action");

const mongoose=require("mongoose");

mongoose.connect(process.env.LINK,(data)=>{
console.log("connected to ecommerce db")
},(err)=>{
    console.log(err)
})

app.listen(port,(err)=>{
    if(!err){
        console.log("port started at 8002")
    }else{
        console.log(err)
    }
}) 

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.get("/",(req,res)=>{
    res.status(200).send("welcome")
})

app.use("/action",actionController)


