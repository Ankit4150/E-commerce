import React, { useEffect, useState } from 'react'
 import Summaryapi from '../common';
 import { Link, useNavigate } from "react-router-dom";

export default function CategoryList() {

    const [categoryProduct,setCategoryProduct]=useState([]);
    const [loading,setLoading]=useState(false);

   const categoryLoading =new Array (13).fill(null);


const featchCategoryProduct=async()=>{
setLoading(true);
        const response=await fetch(Summaryapi.categoryProduct.url);
        const responseData= await response.json();
           setLoading(false);
            setCategoryProduct( responseData.data);

    }

 
    useEffect(()=>{
         featchCategoryProduct() ;
    },[])




  return (
    <div className='container mx-auto p-4'> 
    <div className='flex items-center gap-4 justify-between  overflow-scroll Scrollbar-none' >
         {


         loading?(
          
             categoryLoading.map((el,index)=>{
               return( 
               <div className='w-16 h-16   md:w-20 md:h-20  rounded-full overflow-hidden  bg-slate-200  animate-pulse' key={"categoryLoading"+index}>
            </div>
            )
             })
          
         
         ):

        ( categoryProduct.map((product,index)=>{
           return(
            <Link  to={"/product-category?category="+product.category} className='cursor-pointer' key={product?.category}>
                <div className='w-16 h-16   md:w-20 md:h-20  rounded-full overflow-hidden p-4 bg-slate-200 flex justify-center items-center'>
                     <img src={product?.productImage[0]} alt={product?.category} className='h-full  mix-blend-multiply object-scale-down hover:scale-125 transition-all '/>
                    </div>
                    <p className='text-center text-sm  md:text-base capitalize'>{product?.category}</p>
                </Link>
        )
       }))
    }
    </div>
        </div>
  )
}
