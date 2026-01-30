import React, { useEffect, useState } from 'react'
import { useLocation, useParams  } from "react-router-dom";
import productCategory from '../helpers/productCategory';
  import CategryWiseProductDisplay from "../components/CategoryWiseProductDispaly"
 import VerticalCard from "../components/verticalCart"

  import Summaryapi from '../common';
export default function CategoryProduct() {
  
    const params=useParams();
    console.log("params:", params)

    const [data,setData]=useState([]);
    const [loading,setLoading]=useState(false);
    const [sortBy,setSortBy]=useState("");

        const location=useLocation();
        const urlSearch=new URLSearchParams(location.search);
        const urlCategoryListinArray=urlSearch.getAll("category")

           const    urlCategoryListinObject={};
                urlCategoryListinArray.forEach(el=>{
                   urlCategoryListinObject[el]=true;
                })
                     console.log("urlCategoryListinArray",urlCategoryListinArray);
                console.log(" urlCategoryListinObject", urlCategoryListinObject);
              
          

    const [selectCategory,setSelectCategory]=useState({});
    const [feleterCatigoryList,setFilterCatigoryList]=useState([]);


    const fetchData=async()=>{
      const response=await fetch(Summaryapi.filterProduct.url,{
        method:Summaryapi.filterProduct.method,
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
          category:feleterCatigoryList
        })
      });
      const dataResponse=await response.json();
       setData(dataResponse?.data);
      console.log( "dataresponse",dataResponse);
    }

    

      const handleSelectCatigory=(e)=>{
      const {name,value,checked}=e.target;

        setSelectCategory((prev)=>{
          return{
            ...prev,
            [value]:checked
          }
        })
      }
    console.log("selecet category ",selectCategory);


    useEffect(()=>{
       fetchData();
                
    },[feleterCatigoryList])

    useEffect(()=>{
    const arrayofCatigory=Object.keys(selectCategory).map(categoryKeyName=>{
       if(selectCategory[categoryKeyName]){
        return  categoryKeyName
       } 
       return null;
    }).filter(el=>el)
    setFilterCatigoryList(arrayofCatigory)

    
    },[selectCategory])

 const handleOnChangeSortBy=(e)=>{
  const {value}=e.target;

  setSortBy(value);
  if(value==="asc"){
     setData(preve=> preve.sort((a,b)=>a.sellingPrice-b.sellingPrice))
  }
     if(value==="dsc"){
     setData(preve=> preve.sort((a,b)=>b.sellingPrice-a.sellingPrice))
  }


 }


 useEffect(()=>{

 },[sortBy])
  return (
    <div className='container mx-auto p-4 '>
      {/***desktop version */}
      <div className='hidden lg:grid  grid-cols-[200px_1fr]'>
        {/***left side  */}
       <div  className='bg-white p-2  min-h-[calc(100vh-120px)] overflow-y-scroll'>
        {/**sort by */}

        <div className=''>
          <h3  className='text-base uppercase font-medium text-slate-500 border-b pb-1  border-slate-300'>sort by</h3>
            <form className='text-sm flex flex-col gap-2 py-2 '>
              <div className='flex items-center gap-3'>
                <input type='radio' name='sortBy' onChange={handleOnChangeSortBy} chacked={sortBy==='asc'}  value={"asc"}/>
                <label>Price Low To High</label>
              </div>
              
               <div  className='flex items-center gap-3'>
                <input type='radio' name='sortBy' onChange={handleOnChangeSortBy} chacked={sortBy==='dsc'} value={"dsc"}/>
                <label>High To lOw</label>
              </div>
            </form>
        </div>

          {/**filter  by */}

        <div className=''>
          <h3  className='text-base uppercase font-medium text-slate-500 border-b pb-1  border-slate-300'>category</h3>
            <form className='text-sm flex flex-col gap-2 py-2 '>
             {
              productCategory.map((CategoryName,index)=>{
                return (
                  <div className='flex items-center gap-3'>
                    <input type='checkbox'name={"category"}  checked={selectCategory[CategoryName?.value]}value={CategoryName?.value} id={CategoryName?.value} onChange={ handleSelectCatigory}/>
                    <label htmlFor={CategoryName?.value} >{CategoryName?.value}</label>
                  </div>
                )
              })
             }
            </form>
        </div>


          </div>


          {/** right side product*/}
          <div className='px-4' >
            <p className='text-medium text-slate-800 text-lg my-2'>Search Result : {data.length}</p>
              <div   className=' min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-129px)]'>
                 {
               data.length!==0  &&(
              < VerticalCard data={data} loading={loading}/>
               )
              }
              </div>
          </div>

      </div>
       
    </div>
  )
}
