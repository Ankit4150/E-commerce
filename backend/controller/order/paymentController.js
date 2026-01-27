  const stripe=require("../../config/stripe")
  const userModel =require("../../models/userModels");

  const paymentController=async(req,res)=>{
  try{
   

    const user= await  userModel.findOne({_id: req.userId});


     const cartItems=req.body;
 
     console.log("cart items",cartItems);

      const params={
          submit_type:"pay",
          mode:"payment",
          payment_method_types:['card'],
          billing_address_collections:'auto',
          shipping_options:[
            {
                shipping_rate:"shr_1SnHaGK4H7kIXeiTA73o4tv1"
            }
          ],
          costumer_email:user.email,
          line_itmes:cartItem.map((item,index)=>{
            return {
                price_data:{
                    currency:"inr",
                    product_data:{
                    name:item.productId.productName,
                    images:item.productId.productImage,
                    metadata:{
                      productId:item.productId._id
                    }
                    },
                    unit_amount:item>productId.sellingPrice
                },
                adjustable_quantity:{
                  enabled:true,
                  minimum:1
                },
                
                  quantity:item.quantity
            }
          }),
          success_url:"http://localhost:3000/success",
          cancle_url:"http://localhost:3000/cancle"
      }
    
   const session = await stripe.checkout.sessions.create(params);


  }catch(err){
       res.status(400).json({
            message:err.message,
            error:true,
            success:false
        })
  }
  }


  module.exports=paymentController;