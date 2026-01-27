
 const addToCartModel =require("../../models/cartProduct");


const addToCartController=async(req,res)=>{
 try{

     const {productId}=req?.body;
     const currUser=req.userId;

     if (!productId) {
  return res.status(400).json({
    message: "productId is required",
    error: true,
    success: false
  });
}


     const isProductIsAvaliable=await addToCartModel.findOne({productId, userId:currUser});
     console.log("isproductavaliav",isProductIsAvaliable)

     if(isProductIsAvaliable){
        return res.json({
            message:"Already exit in add to card ",
            success:false,
            error:true
        })
     }

    const   payload={
        productId:productId,
        quantity:1,
        userId:currUser
    }

    const newAddToCart=new addToCartModel( payload);
    const svaeProduct=await  newAddToCart.save();

    res.json({
        data:svaeProduct,
        message:"Add to product",
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

module.exports=addToCartController;