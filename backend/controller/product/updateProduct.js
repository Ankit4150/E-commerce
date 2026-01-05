    const productModule = require("../../models/productModel")
    const uploadProductPermission = require("../../helpers/permission");
   async function  updateProductController(req,res) {
     try{

                 if(!uploadProductPermission( req.userId)){
            throw new Error ("permission denied ")
        }

        const   { _id, ...resbody}=req.body;
        const updateProduct=await productModule.findByIdAndUpdate(_id,resbody)

        res.json({
            message:"Product Update Successfully",
            data:updateProduct,
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


module.exports=updateProductController;