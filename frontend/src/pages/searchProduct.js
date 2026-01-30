
import React, { useEffect, useState } from 'react'
import Summaryapi from '../common';
 import VerticalCart from'../components/verticalCart';
   
import { useLocation } from "react-router-dom";


export default function SearchProduct() {
const [data,SetData]=useState([]);
const [loading,setLoading]=useState(true);

 const query= useLocation();

   const fetchProduct=async()=>{

    setLoading(true);
    console.log("query.search",query.search)
       const response=await fetch(Summaryapi.searchProduct.url+query.search);
       const dataResponse=await response.json();
      setLoading(false);
       SetData(dataResponse.data)
   }

 useEffect(()=>{
   fetchProduct();
 },[query])

  return (
    <div className='container mx-auto p-4'>

      {
        loading &&(
          <p className='text-lg  text-center'>Loading....</p>
        )
      }
      <p className='text-lg font-semibold p-4'>Serach Results : {data.length} </p>
        {
          data.length === 0 &&!loading &&(
           <p className='bg-white text-lg text-center p-4'>No Data Found</p>
          )
        }
        {
          data.length !==0 && !loading &&(
            <VerticalCart loading={loading} data={data}/>
          )
        }

    </div>
  )
}
