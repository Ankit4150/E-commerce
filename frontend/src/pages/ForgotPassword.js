import React, { useContext, useRef, useState } from 'react'
import  PasswordForm from "../components/passwordForm";


import { Link, useNavigate } from "react-router-dom";
import Summaryapi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';


export default function ForgotPassword() {

    // const [email, setEmail] = useState("");
    //     const emailRef=useRef();

  const [data,setData]=useState({
     email:"",
    })
    const [otpForm,setOtpForm]=useState(true);


const navigate=useNavigate();

  


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
          
         e.preventDefault();

     const  dataResponse=await fetch(Summaryapi.sendOtp.url,{
      method:Summaryapi.sendOtp.method,
      credentials:"include",
      headers:{
       "Content-Type": "application/json"
      },
      body:JSON.stringify({email:data.email})
     });
  
     const dataApi=await dataResponse.json();
     
     if(dataApi.success){
      toast.success(dataApi.message)
      setOtpForm(false);
     //  navigate("/")
     
     }else{
        toast.error(dataApi.message)
     }

  }

  return (
    <saction id="login" >
        <div  className='max-auto container p-4  '>
            <div className='bg-white p-5 w-full max-w-sm mx-auto  '>
              {
                otpForm?(
            <form className='pt-6 flex  flex-col gap-2'onSubmit={handleOnSubmit}>
               <div className='grid'>
                <label>Email:</label>
                <div className='bg-slate-100 p-2' >
                    <input  type='email' 
                     placeholder='enter email' 
                     className='w-full h-full outline-none bg-transparent'
                     name="email"
                     value={data.email}
                      onChange={handleOnChange}
                     // ref={ emailRef}
                     />
                </div>
            </div>   
                 <div className='flex'>
                       <button className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 w-full max-w-[115px] rounded-full hover:scale-110 transition-all mx-auto block mt-4'>Send OTP</button>
                   <button className='bg-red-600 hover:bg-red-700 text-white px-4 py-1 w-full max-w-[115px] rounded-full hover:scale-110 transition-all mx-auto block mt-4'>Back</button>
                 </div>
            </form>
            ):<PasswordForm email={data.email}/>
           }
               
            </div>
        </div>
    </saction>
  )
}
