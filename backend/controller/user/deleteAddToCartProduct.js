 const addToCartModel =require("../../models/cartProduct");

const deleteAddTopCartProduct=async(req,res)=>{
     try{

        const currUserId=req.userId;
        const addToCartProductId=req?.body?._id;

        const deleteProduct= await addToCartModel.deleteOne({_id:addToCartProductId});
            
        res.json({
          message:"Product Delete Form Cart",
          error:false,
          success:true,
          data:deleteProduct
        })




     }catch(err){
          res.status(400).json({
            message:err.message,
            error:true,
            success:false
            })
     }
}

module.exports=deleteAddTopCartProduct;