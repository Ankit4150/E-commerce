
 const bcrypt=require("bcryptjs");
const userModel=require("../../models/userModels")
const otpModel=require("../../models/otpModel")

const  jwt = require('jsonwebtoken');

  async function uesrEmail(req,res) {
   try {
    const { email } = req.body

    const user = await userModel.findOne({ email })
    if (!user) {
      return res.json({
        message: "Email does not exist",
        success: false
      })
    }

    const otpCode = Math.floor(1000 + Math.random() * 9000)

    const otpData = await otpModel.findOneAndUpdate(
      { email },
      {
        code: otpCode,
        expireIn: Date.now() +10 * 1000
      },
      { upsert: true, new: true }
    )

    res.status(201).json({
      data: otpData,
      success: true,
      error: false,
      message: "Check your email for OTP"
    })

  }
    
    catch(err){
        res.json({
        message:err.message,
      error:true,
      success:false
       
    })
    }
    
} 




 

//module.exports=changePassword;


module.exports=uesrEmail;
