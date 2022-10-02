const mongoose=require("mongoose");

const transactionschema=new mongoose.Schema ({
    blockNumber: {type:String},
    timeStamp:  {type:String},
    hash:  {type:String},
    nonce:  {type:String},
    blockHash:  {type:String},
    transactionIndex:  {type:String},
    from:  {type:String},
    to:  {type:String},
    value: {type:String},
    gas:  {type:String},
    gasPrice:  {type:String},
    isError:  {type:String},
    txreceipt_status: {type:String},
    input:  {type:String},
    contractAddress:  {type:String},
    cumulativeGasUsed:  {type:String},
    gasUsed:  {type:String},
    confirmations:  {type:String},
    methodId:  {type:String},
    functionName:  {type:String},
    address:{type:String}
})

const transactionModal=mongoose.model("transactions",transactionschema);

module.exports=transactionModal;