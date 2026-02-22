const reviewModel=require("../../models/reviews");

async function Getreview(req,res){
    try{
       
         const productId = req.params.productId;
       console.log("productid ",productId);
      
       const allReviewa=await reviewModel.find({ productId:productId}).populate("userId", "name").sort({createdAt:-1});
       console.log("allreview",allReviewa);
       res.json({
        data:allReviewa,
        message:"ok",
        error:false,
        success:true
       })

    }catch(err){
          res.status(400).json({
            message:err.message,
            error:true,
            success:false
        })
    }
}

module.exports=Getreview;