const orderModel=require("../../models/orderModelProduct")

const oredrController=async(req,res)=>{
    try{

        const currUserid=req.userId;
        const orderList=await  orderModel.find({  userId:currUserid}).sort({createdAt:-1})
        //  console.log("orderbackend",orderList)

        res.json({
            data:orderList,
            message:"order list",
            success:true
        })

    }catch(err){
      res.status(500).json({
        message:err.message||err,
        err:true
        
      })
    }

}

module.exports=oredrController;