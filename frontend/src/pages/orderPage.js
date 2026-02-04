import React, { useContext, useEffect, useState } from 'react'
import Summaryapi from '../common';
import moment  from "moment";
import displayINRcurrency from "../helpers/displayCurrency"

const OrderPage=()=>{
   const [data,setData]=useState([])

   
   const fetechOrderDetails=async()=>{
      const response=await fetch(Summaryapi.getOrder.url,{
        method:Summaryapi.getOrder.method,
        credentials:"include",
      })



      const responsedata=await response.json();
    setData(responsedata.data);

      console.log("order list",responsedata)
   }


   useEffect(()=>{
     fetechOrderDetails();
   },[])


   return(
    <div>
       {
        !data[0]&&(
          <p>No order available</p>
        )
       }
       <div className='p-4 w-full bg-slate-50'>
       {
         data.map((item,index)=>{
          return(
            <div key={item.userId+index} >
          <p className='font-medium text-lg'>{ moment(item.createdAt).format("LL")}</p>
            <div className='border rounded'>
              {
              item?.productDetails.map((product,index)=>{
                return(
                   <div key={product.productId+index}  className='flex gap-3 bg-slate-100'>
                    <img 
                   src={product.image[0]}
                   className='w-28 h-28 bg-slate-200 object-scale-down p-2'
                   />
                   <div >
                    <div className='font-medium text-lg text-ellipsis line-clamp-1'> {product.name}</div>
                   <div  className='flex items-center gap-5 mt-1'>
                   <div className='text-lg text-red-500'>{displayINRcurrency(product.price)}</div>
                   <p>Quantity:{product.Quantity}</p>
                      </div>
                    </div>
                  
                    </div>
                )
              })
              }
            </div>
                 <div className='flex  flex-col  lg:flex-row gap-2 p-2  '>
                   <div>
                 <div className='text-lg font-medium'> Payment Details :</div>
                 <p >payment_method_type: {item.paymentDetails.payment_method_type[0]}</p>
                 <p >Payment Status : {item.paymentDetails.payment_status}</p>
                  </div>
                  <div>
                    <div className='text-lg font-medium ml-4'>Shipping Details : </div>
                    {
                      item.shipping_options.map((shipping,index)=>{
                       return(
                        <div key={shipping.shipping_rate}  className='ml-4' >
                          Shipping Amount: {shipping.shipping_amount}
                          </div>
                       )
                      })

                    }
                  </div>
                  </div>
                  <div className='font-semibold mb-4 '>
                       Total Amount: {item.totalAmount}
                    </div>
              </div>
          )
         })
       }
       </div>
    </div>
   )
}
export default   OrderPage;