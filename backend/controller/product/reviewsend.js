
const mongoose=require("mongoose");
const reviwModels=require("../../models/reviews")

async function Reviewsend(req,res) {
      try{
        const currUser=req.userId;
      
         const {review,productId}=req.body;

         if(!review){
            throw new Error("please enter data");
         }

        const payload={
            review:review,
            userId:currUser,
             productId:productId
        }

        const newreview=new reviwModels(payload);
        const save=  await newreview.save();
       res.json({
           data:save,
           message:"add review",
           success:true,
           error:false
       })

      }catch(err){
      res.status(400).json({
            message:err.message,
            error:true,
            success:false
        })
    }

}

module.exports=Reviewsend;