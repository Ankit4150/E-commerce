
 import React, { useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from"../helpers/fetchCategoryWiseProduct"
import  displayINRcurrency from "../helpers/displayCurrency"
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import Context from '../context';
import { useContext } from "react";

export default function HorizontalCardProduct({category,heading}) {
     const [data,setData]=useState([]);
      const [loading ,setLoading]=useState(true);
      const loadingList=new Array(13).fill(null);
    const [scroll,setScroll]=useState(0);
    const scrollElement=useRef();

          const {fetchUserAddToCart}=useContext(Context);

          const handleAddToCart=async(e,id)=>{
             await addToCart(e,id)
             fetchUserAddToCart();
          }

          const fetchData=async()=>{
            setLoading(true);
            const categoryProduct=await fetchCategoryWiseProduct(category);
             setLoading(false);
           // console.log("horizontal data",categoryProduct.data)
                 setData(categoryProduct?.data)
          }

  useEffect(()=>{
     fetchData();
  },[])

 const scrollRight=()=>{
        scrollElement.current.scrollLeft +=300;
 }

  const scrollLight=()=>{
        scrollElement.current.scrollLeft -=300;
 }

    
  return (
    <div className=' container amx-auto px-5 my-6 relative'>
         <h2  className=' text-2xl font-semibold py-4'>{heading}</h2>

      <div  className='flex items-center gap-4 md:gap-6 overflow-scroll Scrollbar-none' ref={scrollElement}>
         <button className='bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block transition-all' onClick={scrollLight} ><FaAngleLeft  /></button>
         <button className='bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block transition-all'onClick={scrollRight} > <FaAngleRight /> </button>

            {

               loading ?(
                 loadingList.map((product,index)=>{
              return(
                
           <div className='w-full min-w-[280px] md:min-w-[320px]    max-w-[280px] md:max-w-[320px]   h-36 bg-white rounded-sm shadow flex'>
            <div className='bg-slate-200  h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse'>
             
            </div>

         <div className='p-4 grid w-full gap-2'>
          <h2  className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200  animate-pulse p-1 rounded-full'>
            </h2 >
            <p className='capitalize  text-slate-500 animate-pulse p-1 rounded-full bg-slate-200'> </p>
           <div className='flex gap-3 w-full'>
           <p className='text-red-600 font-medium  bg-slate-200 w-full animate-pulse p-1 rounded-full'></p>
           <p className='text-slate-500 line-through  bg-slate-200 w-full animate-pulse p-1 rounded-full'></p>
            </div>

              <button className= ' text-white px-3 py-0.5 text-sm  w-full bg-slate-200 animate-pulse p-1 rounded-full'>Add to Cart</button>
         </div>


          </div>

              )
            })

               ):(
                    
            data.map((product,index)=>{
              return(
                
           <Link to={"product/"+product?._id} className='w-full min-w-[280px] md:min-w-[320px]    max-w-[280px] md:max-w-[320px]   h-36 bg-white rounded-sm shadow flex'>
            <div className='bg-slate-200  h-full p-4 min-w-[120px] md:min-w-[145px]'>
              <img src={product.productImage[0]} className='object-scale-down  h-full  hover:scale-110 transition-all  '/>
            </div>

         <div className='p-4 grid'>
          <h2  className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>
            {product?.productName}</h2 >
            <p className='capitalize  text-slate-500'> {product?.category }</p>
           <div className='flex gap-3'>
           <p className='text-red-600 font-medium'>{displayINRcurrency( product?.sellingPrice)}</p>
           <p className='text-slate-500 line-through'>{displayINRcurrency(product?.price) }</p>
            </div>

              <button className='bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 text-sm rounded-full' onClick={(e)=>handleAddToCart(e,product?._id)}>Add to Cart</button>
         </div>


          </Link>

              )
            })
               )

          }
      </div>




    </div>
  )
}
