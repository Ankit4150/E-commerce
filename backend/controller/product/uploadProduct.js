const uploadProductPermission = require("../../helpers/permission");
const productModule = require("../../models/productModel")


async function UploadProductController(req,res) {
        
    try{


        const    sessionUserId=req.userId;

        if(!uploadProductPermission( sessionUserId)){
            throw new Error ("permission denied ")
        }

  const  uploadProduct=new productModule(req.body)
  const saveProduct=await   uploadProduct.save();
  res.status(201).json({
    message:"Product upload  successfully",
    error:false,
    success:true ,
    data:saveProduct
  })


    }catch(err){
           res.status(400).json({
            message:err.message,
            error:true,
            success:false
        })
    }



};


module.exports=UploadProductController;