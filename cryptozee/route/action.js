const express = require("express");
const router = express.Router();
const transactionModal=require("../modal/transactions-modal")
const  axios = require("axios");
const priceModal = require("../modal/price-modal");
const getPrice = ()=>{
    var valo;
    axios.get("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr").then((data)=>{
       valo=data.data.ethereum.inr
   priceModal.find().then((data)=>{
    let length = data.length;
    priceModal.create({price:valo,length:length+1})
   })  
    }).catch((err)=>{
        console.log(err)
    })
   
}

router.get("/gettransactions", (req,res)=>{
    setInterval(getPrice, 600000);
    let address = req.query.address
     axios.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${address}&endblock=99999999&page=1&offset=10&sort=asc&apikey=1EH8KUJUGP4X6NDDQ2CCMCWJMZI4AG2T3Y`).then((move)=>{
       let array=move.data.result
  transactionModal.insertMany(array)
      
      res.status(200).send(array)
   }).catch((err)=>{
       console.log(err)
   })
   
})

router.get("/balance",(req,res)=>{
   getPrice()
    let balance=0;
 transactionModal.find({$or: [{from:req.query.address }, {to:req.query.address}]}).then((data)=>{
   
    for(let obj of data){
      
        if(obj.from===req.query.address){
            balance=balance-parseInt(obj.value)
        }else{
            balance=balance+parseInt(obj.value)
        } 
    }
   
   priceModal.find().then((data)=>{
   let size=data.length;
   let currentprizeofetherum = data[size-1]
   res.status(200).send({availablebalance :balance,currentprizeofetherum:`${currentprizeofetherum.price} rupees`})
   });
 
   }).catch((err)=>{
    res.status(400).send(err)
   })
})
module.exports =router