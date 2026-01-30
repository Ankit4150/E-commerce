import React, { useState } from 'react'
 import { MdModeEdit } from "react-icons/md";
 import AdminEditProduct from "../components/AdminEditProduct"
 import displayINRcurrency from "../helpers/displayCurrency"


export default function AdminProductCard({
    data,fetchdata
})
 {

    const [editProduct,setEditProduct]=useState(false);
    

  return (
            <div className="bg-white rounded  p-4" >
              <div className='w-40'>

              <div  className='w-32 h-32 flex justify-center items-center '>
               <img src={data?.productImage[0]}  width={100} height={100} className=' max-auto  object-fill h-full'/>
              </div>
                 


                <h1 className='text-ellipsis line-clamp-2'>{data.productName}</h1>
       
       <div>
              <p className='font-semibold'>
                {
                 displayINRcurrency(data.sellingPrice)
                }
                 
               
              </p>
             <div  className='w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full  hover:text-white cursor-pointer' onClick={()=>setEditProduct(true)}>
                <MdModeEdit/>
                 </div>
       </div>
               
              </div>
                {
                  editProduct &&(
                       <AdminEditProduct productData={data} onClose={()=>setEditProduct(false)} fetchdata={fetchdata}/>
                  )
                }
             
             </div>
  )
}
