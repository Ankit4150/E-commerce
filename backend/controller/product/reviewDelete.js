const revieModel=require("../../models/reviews")

async function reviewDelete(req,res){
  try{
 


    const {reviewId,userid}=req.body;



    console.log("review id " ,req.body)
     const detetereview=await  revieModel.findOneAndDelete({_id:reviewId,userId:userid});
     console.log("dalete review",detetereview)
       if(!detetereview){
       return  res.json({
           message:"unauthorized",
           success:false,
           error:true,
        })
       }

       res.json({
      message: "Review deleted successfully",
      success: true,
      error: false
    });
  }catch(err){
          res.status(400).json({
            message:err.message,
            error:true,
            success:false
        })
    }
}

module.exports=reviewDelete;