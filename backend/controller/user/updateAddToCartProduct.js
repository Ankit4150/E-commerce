    const addToCartModel =require("../../models/cartProduct");
  
  const updateAddToCartToProduct=async(req,res)=>{
 

     try{

          const currUserId=req.userId;
          const addToCartProductId=req?.body?._id;
          const qty=req.body.quantity

          const updateProduct=await  addToCartModel.updateOne( {_id:addToCartProductId},{
            ...(qty && {quantity:qty})
          })

     res.json({
          message:"Product Update ",
          data:updateProduct,
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

module.exports=updateAddToCartToProduct;