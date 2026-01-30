import { useEffect, useState } from "react";
import { UploadProduct } from "../components/UploadProduct";
 import Summaryapi from '../common';
import AdminProductCard from "../components/AdminProductCard";


export default function AllProducts() {
   
 const [openUploadProduct ,setOpenUploadProduct]=useState(false);
 const [allProduct,setALLProduct]=useState([]);



const fetchAllProduct=async()=>{
   
 
 const response= await fetch(Summaryapi.allproduct.url);
 
  
 const dataResponse=await response.json();
 console.log( "productimage",dataResponse);
    setALLProduct(dataResponse?.data ||[])

}

  useEffect(()=>{
    console.log("useeffect")
   fetchAllProduct()

  },[])



  return (
    <div>

     <div className="bg-white py-2 px-4 flex justify-between items-center ">
       <h2 className="font-bold text-lg"> All Product</h2>
       <button className="border-2 border-red-600 text-red-600 rounded-full py-1 px-3 hover:bg-red-600 transition-all hover:text-white" onClick={()=>setOpenUploadProduct(true)}>Upload Product</button>
      </div> 
       {/*this is upload produt*/}

     <div  className="flex items-center  flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll">
       {
        allProduct.map((product,index)=>{
          return(

             <AdminProductCard data={product} key={index+"allProducts"} fetchdata={fetchAllProduct}/>
            
          )
        })
       }
     </div>

 
     { 
     openUploadProduct  &&(
         <UploadProduct onClose={()=>setOpenUploadProduct(false)} featchData={fetchAllProduct}/>
     )
        
     }

    
    </div>
  )
}
