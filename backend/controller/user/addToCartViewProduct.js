   const addToCartModel =require("../../models/cartProduct");

    
 const addToCartViewProduct=async(req,res)=>{
    try{

      const currUser=req.userId;

      const allProduct=await addToCartModel.find({userId:currUser}).populate("productId");
      
      res.json({
        data: allProduct,
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

module.exports= addToCartViewProduct;