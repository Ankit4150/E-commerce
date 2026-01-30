
 import React, { useContext, useState } from 'react'
 import login from "../assest/signin.gif"
 import { FaEye } from "react-icons/fa";
 import { FaEyeSlash } from "react-icons/fa";
 import { Link, useNavigate } from "react-router-dom";
 import Summaryapi from '../common';
 import { toast } from 'react-toastify';
 import Context from '../context'
   




export default function PasswordForm({email}) {

 const nevigate=useNavigate();
 
    const [data,setData]=useState({
     otp:"",
     password:"",
     confirmPassword:"",
    })

    

 
   
 
    
    const handleOnChange=(e)=>{
     const {name,value}=e.target
 
     setData((prev)=>{
         return{
             ...prev,
             [name]:value
         }
     })
 }


    const handleOnSubmit=async(e)=>{
              const payload = {
      email,
      code: data.otp,
      password: data.password
    }
 

             e.preventDefault();
            
           if(data.password===data.confirmPassword){
              const resposneData=await fetch(Summaryapi.changePassword.url,{
              method:Summaryapi. changePassword.method,
              headers:{
              "Content-Type":"application/json"
              },
              body:JSON.stringify(payload),
             })
               const dataApi=  await resposneData.json();
            
               if(dataApi.success){
                toast.success(dataApi.message)
                nevigate("/login")
               }
                if(dataApi.error){
                toast.error(dataApi.message)
               }

           
           }else{
            console.log("please check password and confirmpassword ");
           }
      }

 
 
 

  return (

    <>
     <saction id="login">
        <div  className='max-auto container p-4'>
            <div className='bg-white p-5 w-full max-w-sm mx-auto  '>
        <div className='w-20 h-20 max-auto  '>
            
           <img src={login}alt="login.icons"/>
            
             </div>




            <form className='pt-6 flex  flex-col gap-2' onSubmit={handleOnSubmit}>
               <div className='grid'>
                <label>otpCode:</label>
                <div className='bg-slate-100 p-2' >
                    <input  type='number' 
                     placeholder='enter otpCode' 
                     maxLength="4"
                     className='w-full h-full outline-none bg-transparent'
                     name="otp"
                     value={data.otp}
                    
                     onChange={handleOnChange}
                     />
                </div>
            </div>

            <div  className='grid'>
                <label>password:</label>
                <div  className='bg-slate-100 flex p-2'>
                    <input  type='password'
                      placeholder='enter password'
                      name="password"
                      
                      value={data.password}
                      onChange={handleOnChange}
                       className='w-full h-full outline-none bg-transparent'
                       />
                   
                </div>
            </div>
             <div  className='grid'>
                <label>confirm password:</label>
                <div  className='bg-slate-100 flex p-2'>
                    <input  type='password'
                      placeholder='enter confirm password'
                      name="confirmPassword"
                      
                       value={data.confirmPassword}
                      onChange={handleOnChange}
                       className='w-full h-full outline-none bg-transparent'
                       />
                   
                </div>
            </div>
                   
            <div className='flex'>
                       <button className='bg-blue-600 hover:bg-blue-700 text-white font-sm  px-1 py-1 w-38 max-w-[255px] rounded-full hover:scale-110 transition-all  block mt-2'>Change password </button>
               <Link to="/login"> <button className='bg-red-600 hover:bg-red-700 text-white px-4 py-1 w-full max-w-[255px] rounded-full hover:scale-110 transition-all mx-auto block mt-4'>Back</button></Link>   
                 </div>


            </form>
           
              
            </div>
        </div>
    </saction></>
  )
}
