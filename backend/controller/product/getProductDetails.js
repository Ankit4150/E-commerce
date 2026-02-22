   const productModule = require("../../models/productModel")
  
  const getProductDetails=async(req ,res)=>{
    try{
      const {productId}=req.body;
      

         const product=await productModule.findById(productId);

            res.json({
                data:product,
                meassage:"ok",
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

module.exports=getProductDetails;

