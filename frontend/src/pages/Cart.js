
import React, { useEffect, useState, useContext } from 'react';
 import  displayINRcurrency from "../helpers/displayCurrency"
 import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {loadStripe} from '@stripe/stripe-js';

   import Summaryapi from '../common';
import Context from "../context/index"



export default function Cart() {
  const navigate = useNavigate();
   const context=useContext(Context)
 const [data,setData]=useState([]);
 const [loading,setLoading]=useState(false);
 const loadingCart=new Array(context.cartProductCount).fill(null);


  
 const fetchData=async()=>{
  setLoading(true);
  console.log( "usrl ",Summaryapi.addToCartProductView.url)
       const response=await fetch(Summaryapi.addToCartProductView.url,{
        method:Summaryapi.addToCartProductView.method,
        credentials:"include",
        headers:{
        "Content-Type": "application/json"
        }
       })
        setLoading(false)
       const responseData=await  response.json();
       
       if(responseData.success){
        setData(responseData.data)
       }
            
  }

  useEffect(() => {
    fetchData()
  }, [])

 console.log("cart data",data) 

 const increaseQty=async(id,qty)=>{
      const response=await fetch(Summaryapi.updateCartProduct.url,{
        method:Summaryapi.updateCartProduct.method,
        credentials:"include",
        headers:{
           "Content-Type": "application/json"
        },
        body:JSON.stringify(
          {
            _id:id,
           quantity:qty+1
        }
      )
      })
      
      const responseData=await response.json();

      if(responseData.success){
         fetchData();
      }
 }


 const descreaseQty=async(id,qty)=>{
     if(qty>=2){
       const response=await fetch(Summaryapi.updateCartProduct.url,{
        method:Summaryapi.updateCartProduct.method,
        credentials:"include",
        headers:{
           "Content-Type": "application/json"
        },
        body:JSON.stringify(
          {
              _id:id,
           quantity:qty-1
        }
      )
      })
      
      const responseData=await response.json();

      if(responseData.success){
         fetchData();
      }

     }
 }


 const deleteCartProduct=async(id)=>{

 const response=await fetch(Summaryapi.deleteCartProduct.url,{
        method:Summaryapi.deleteCartProduct.method,
        credentials:"include",
        headers:{
           "Content-Type": "application/json"
        },
        body:JSON.stringify(
          {
              _id:id,
          
        }
      )
      })
      
      const responseData=await response.json();

      if(responseData.success){
         fetchData();
         context.fetchUserAddToCart();
         
      }

 }

   const toatalQTY=data.reduce((previousValue,currValue)=>previousValue + currValue.quantity,0);
   const totalPrice=data.reduce((preve,curr)=>preve+(curr.quantity* curr?.productId?.sellingPrice),0)


    const paymentHandle=async()=>{
     // alert("hii")
     console.log("payment")
      //const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
         const  response=await fetch(Summaryapi.payment.url,{
            method:Summaryapi.payment.method,
        credentials:"include",
        headers:{
           "Content-Type": "application/json"
        },
        body:JSON.stringify({cartItems:data})
         })
         console.log("payment")
        const   responseData=await response.json();

             if (responseData?.url) {
       window.location.href = responseData.url;
      }

         console.log("payment response ", responseData)
    }


  return (
    <div  className='container mx-auto p-4'>

      <div className='text-center text-lg  my-3'>
           {
        data.length===0 && !loading &&(
           <p className='bg-white py-5'>No Data</p>
        )
       }
      </div>
        <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
          {/**view product */}
          <div className='w-full max-w-3xl'>
               {
                loading ?(
                       loadingCart.map((el,index)=>{
                        return (
                           <div key={el+"add to cart Loading "+index} className='w-ful  bg-slate-200 h-32 my-2 border  border-slate-300 animate-pulse rounded'> </div>
                          )
                       })

                    
                ):(
                  
                     data.map((product,index)=>{
                      return(
                         <div key={product?._id+"add to cart Loading "} className='w-ful  bg-white h-32 my-2 border  border-slate-300 rounded grid grid-cols-[128px,1fr]'> 
                         <div className='w-28 h-32 bg-slate-200'>
                          <img src={product?.productId?.productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply'/>
                         </div>
                         <div className='px-4 py-2 relative'>
                             {/**delete product */}

                             <div className='absolute right-0  text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white' onClick={()=>deleteCartProduct(product?._id)}>
                              <MdDelete /> 
                              </div>


                          <h2 className=' text-lg lg:text-2xl  text-ellipsis line-clamp-1 ' >
                              {product?.productId?.productName}</h2>
                            <p className='capitlize text-slate-500'>  {product?.productId?.category}</p>
                            <p className=' text-red-500  font-medium text-lg'> { displayINRcurrency(product?.productId?.sellingPrice)}</p>
                            <div className='flex items-center gap-3 mt-1'>
                              <button className=' border border-red-600 text-red-600   hover:bg-red-600  hover:text-white w-6 h-6 flex justify-center items-center rounded'onClick={()=>descreaseQty(product?._id,product?.quantity)}>-</button>
                              <span>{product?.quantity}</span>
                               <button className=' border border-red-600 text-red-600 w-6 h-6  hover:bg-red-600  hover:text-white flex justify-center items-center rounded'onClick={()=>increaseQty(product?._id,product?.quantity)}>+</button>
                            </div>
                          </div>
                         </div>
                      )
                     })
                  
                )
               }
          </div>
          {/***summery */}



         {
          data[0]&&(
             <div className='mt-5 lg:mt-0 w-full max-w-sm'>
              {
            loading ?(
               <div className='h-36 bg-slate-200 border border-slate-200 animate-pulse'>
              Total
            </div>
            ):(
               <div className='h-36 bg-slate-200'>
                <h2 className='text-white bg-red-600 px-4 py-1'> Summary</h2>
                <div className='flex items-center justify-between px-4  gap-2 font-medium text-lg text-slate-600 '> 
                  <p>Quantity</p>
                  <p>{toatalQTY}</p>
                  </div>
                  <div className='flex items-center justify-between px-4  gap-2  font-medium text-lg text-slate-600'>
                     <p> Total Price</p>
                    <p>{displayINRcurrency(totalPrice)}</p>
                    </div>
                    <button className='bg-blue-600 p-2 text-white w-full' onClick={paymentHandle}> Payment</button>
             
            </div>
            )
            }
          </div>
          )
         }

          
        </div>



    </div>
  )
}
