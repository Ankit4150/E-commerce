const productModule = require("../../models/productModel")



const getCategoryProduct=async(req,res)=>{
    try{

        const productCategory=await productModule.distinct("category");

        console.log("category" ,productCategory);

   const productByCategory=[];

   for(const category of  productCategory ){
    const  product=await  productModule.findOne({category});
     productByCategory.push(product);
   }
   

   res.json({
    message:"category  product",
    data: productByCategory,
    success:true,
    error:false
   })


    } catch(err){
        res.status(400).json({
            message:err.message,
            error:true,
            success:false
        })
    }
}

module.exports=getCategoryProduct;