const mongoose=require("mongoose");



const otpSchema=new mongoose.Schema({
 
 email:String,
 code:String,
 expireIn:Number
},{
    timestamps:true
})


const otpModel=mongoose.model("otp",otpSchema);

module.exports=otpModel;
