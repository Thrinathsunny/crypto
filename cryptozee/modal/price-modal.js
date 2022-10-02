const mongoose=require("mongoose");

const priceschema=new mongoose.Schema ({
   price:{
    type:Number,
    required:true,
   },length:{
      type:Number,
      required:true
   }
})

const priceModal=mongoose.model("price",priceschema);

module.exports=priceModal;