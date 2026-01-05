
 const bcrypt=require("bcryptjs");
const userModel=require("../../models/userModels")
const otpModel=require("../../models/otpModel")

const  jwt = require('jsonwebtoken');

  async function changePassword(req,res) {
    try{
  
             const { email, code, password } = req.body


           const otpData = await otpModel.findOne({ email, code })

      

          if (!otpData) {
      return res.json({
        message: "Invalid OTP",
        success: false,
        error:true 

      })
    }
 
     const user = await userModel.findOne({ email })
    if (!user) {
      return res.json({
        message: "User not found",
        success: false,
        error:true

      })
    }


      const currTime = Date.now()
    if (otpData.expireIn < currTime) {
      return res.json({
        message: "OTP expired",
        success: false,
         error:true
      })
    }


      const hashedPassword = await bcrypt.hash(password, 10)
    user.password = hashedPassword
         const changepass=  await user.save()

    // 5️⃣ Delete OTP
    await otpModel.deleteOne({ email, code })

    // 6️⃣ Send response
    res.json({
  
      message: "Password changed successfully",
      success: true
    })



     

    }catch(err){
        res.json({
        message:err.message,
      error:true,
      success:false
       
    })
    }
    
} 


module.exports=changePassword;
