import React, { useState } from 'react'
 import { IoMdClose } from "react-icons/io";
import  ROLE from "../common/role"
import Summaryapi from '../common';
import { toast } from 'react-toastify';

 function  ChangeUserRole({
    name,
    email,
    role,
    userId,
    onClose,
    callFun
 }) {

  const [userRole, setUserRole]=useState(role);

  const handleChangeSelect=(e)=>{
    setUserRole(e.target.value)
    console.log(e.target.value);
  }

    const updateUserRole=async()=>{
      const fetchRespone=await  fetch(Summaryapi.updateUser.url,{
        method:Summaryapi.updateUser.method,
        credentials:"include",
         headers:{
       "Content-Type": "application/json"
      },
      body:JSON.stringify({
        userId:userId,
        role:userRole
      })
      })


      const responseData=await fetchRespone.json();
 
      if(responseData.success){
      toast.success(responseData.message)
      onClose();
       callFun();

      }

      console.log("role updated",responseData)

    }


  return (

    <div className='fixed w-full h-full z-10 flex justify-between items-center  top-0 bottom-0 left-0 right-0 bg-slate-200 bg-opacity-50'>

    <div className=' mx-auto  bg-white shadow-md p-4 w-full  max-w-sm'>

       <button className='block ml-auto'> 
        <IoMdClose  onClick={onClose} />
       </button>
       
      <h1  className='pb-4 text-lg font-medium'> Change User Role</h1>   
      <p>Name : {name}</p>
      <p> Email : {email}</p>


         <div  className='flex items-center justify-between my-4'>
            <p>Role :</p>
           <select  className='border px-4 py-1' value={userRole} onChange={handleChangeSelect}>
            {
                Object.values(ROLE).map(el=>{
                    return(
        <option value={el} key={el}>{el}</option>
                    )
                })
            }
           
           </select>

         </div>
       
       <button className='w-fit  mx-auto block  py-1  px-3  rounded-full bg-red-600 text-white hover:bg-red-700' onClick={ updateUserRole}>Change Role </button>

        </div>

    </div>
   
  )
}


export default ChangeUserRole;
