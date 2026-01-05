
 const bcrypt=require("bcryptjs");
const userModel=require("../../models/userModels")

const  jwt = require('jsonwebtoken');

  async function userSignInController(req,res) {
    try{
   const {email,password}=req.body;
          
  
         
         if(!email){
             throw new Error("please provide Email");
         }
         
         if(!password){
             throw new Error("please provide Password ");
         }
          const user=await userModel.findOne({email})

          if(!user){
            throw new Error("user not found ")
          }

        const checkPassword= await bcrypt.compare(password,user.password);

     console.log("password ",checkPassword)
    if( checkPassword){
          
      const tokenData={
          _id:user.id,
          email:user.email
      }
      const token=jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 *8 });
       
        const tokenOption={
          httpOnly:true,
          secure:true
        }


      res.cookie("token",token,tokenOption).status(200).json({
        message:"login successfully",
        data:token,
        error:false,
        success:true
      })



          }
       else{
        throw new Error("please check password ");
        }

    }catch(err){
        res.json({
        message:err.message,
      error:true,
      success:false
       
    })
    }
    
} 


module.exports= userSignInController;
