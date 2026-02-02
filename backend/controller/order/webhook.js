const stripe=require("../../config/stripe");
const orderModel = require("../../models/orderModelProduct");

const endpointSecret = process.env.STRIPT_ENDPOINT_WEBHOOK_SECRET_KEY;


   async function getLineItems(lineItems) {
       let productItems=[];

       if(lineItems?.data?.length){
        for(const item of lineItems.data){
            const product= await stripe.products.retrieve(item.price.product)
             const productId=product.metadata.productId

             const productData={
                productId:productId,
                name:product.name,
                price: item.price.unit_amount/100,
                quantity:item.quentity,
                image:product.image
             }
             productItems.push(productData);
             
        }
       }
       return productItems;
   }





const webhooks=async(request,response)=>{
     const signature = request.headers['stripe-signature'];
     const payloadString=JSON.stringify( request.body);
     
     const header = stripe.webhooks.generateTestHeaderString({
       payload: payloadString,
      secret:endpointSecret,
      });



    let event;
     try {
      event = stripe.webhooks.constructEvent(payloadString , header, endpointSecret
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return response.sendStatus(400);
    }

    switch (event.type) {
    //   case "checkout.session.completed":
    //     const paymentIntent = event.data.object;
    //     console.log("✅ PaymentIntent succeeded:", paymentIntent.id);
    //     break;

      case "checkout.session.completed":
        const session = event.data.object;
          console.log("session",session);
        lineItems=await stripe.checkout.sessions.listLineItems(session.id)
        const productDetails= await getLineItems(lineItems)

           const orderDetails={
                productDetails:productDetails,
                 email:session.customer_email,
                 userId:session.metadata.userid,
                                 
           paymentDetails:{
             paymentId: session.payment_intent,
            payment_method_type:session.payment_method_type,
            payment_status:session.payment_status
            },
               shipping_options:session.shipping_options,
               totalAmount:session.amount_total/100

             }
             const order=new orderModel(orderDetails)
             const saveorder=await order.save();
       
        console.log("lineitems",lineItems)
        console.log("totalamount", session.amount_total/100);
       

        break;

      default:
        console.log(` Unhandled event type ${event.type}`);
    }


    response.status(200).send();

}


module.exports=webhooks;