import React, { useContext, useState } from 'react'
import Logo from './Logo'
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
 import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import Summaryapi from '../common';
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { setUserDetails } from '../store/userSlice';
import  ROLE from "../common/role"
import Context from "../context/index"
import { useNavigate } from "react-router-dom";

export default function Header() {

   
             const navigate = useNavigate();
   const [menuDisplay , SetMenuDisplay ]=useState(false);
   const user = useSelector(state=>state?.user?.user)
      const dispatch=useDispatch();

   const context=useContext(Context)
   

   const handleLogout=async()=>{
   const fatchData=await fetch(Summaryapi.logout_user.url,{
    method:Summaryapi.logout_user.method,
    credentials:"include"
   })
    const data=await   fatchData.json();

   if(data.success){
    toast.success(data.message)
    dispatch(setUserDetails(null))
      navigate("/")
   }

   if(data.error){
    toast.error(data.message)
   }

   }

   const handleSearch=(e)=>{
    const {value}=e.target;
    if(value)
    {
           navigate(`/search?q=${value}`)
    }else{
      navigate("/search")
    }
   
   }


  return (
    <header className='h-16  shadow-sm bg-white  fixed w-full z-40'>
    <div className='container mx-auto flex items-center px-4 justify-between'>
      <div>
         <Link to={"/"}> <Logo w={90} h={50}/></Link>
      </div>

    <div className='flex items-center w-full justify-between max-w-sm  border rounded-full focus-within:shadow pl-1'>
      <input type='text' placeholder='search product here ..'  className='w-full outline-none' onChange={handleSearch}/>
      <div className='text-lg min-w-[50px] h-8  bg-red-600  flex items-center justify-center rounded-r-full text-white'> <GrSearch /></div>
    </div>
    <div className='flex items-center  gap-7'>


    <div className='relative  flex justify-center  '>


    {
      user?._id&&(
          <div className='text-3xl cursor-pointer relative flex justify-center' onClick={()=>SetMenuDisplay(prev=>!prev)}>
        {
            user?.profilePic ?( 
          <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name}/>
        ):(<FaRegCircleUser />)

        }
      </div>
      )
    }

       {
        menuDisplay &&(
            <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded  '>
             
            <nav>

              {
                user?.role ==  ROLE.ADMIN &&(
                      <Link to={"/admin-panel/all-products"} className='whitespace-nowrap hidden md:block  hover:bg-slate-100 p-2' onClick={()=>SetMenuDisplay(prev=>!prev) }> Admin Panel</Link>
                )
              }
                <Link to={'/order'} className='whitespace-nowrap hidden md:block  hover:bg-slate-100 p-2' onClick={()=>SetMenuDisplay(prev=>!prev) }>Order</Link>
            </nav>
         </div>
        )
       }
    </div>


      {
         user?._id&&(
                     <Link to={"/cart"} className='text-2xl  relative'>
                     <span> <FaShoppingCart/></span> 

                 <div  className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                 <p className='text-sm'>{context.cartProductCount}</p>
                </div> 
               </Link>
               )
               }


    

      <div>
        {
          user?._id ?(
            <button onClick={handleLogout} className='px-3 py-1 rounded-full bg-red-600 text-white hover:bg-red-700' >Logout</button>
          ): (<Link  to={"login"}className='px-3 py-1 rounded-full bg-red-600 text-white hover:bg-red-700'>Login</Link>)
        }
       
      </div>
    </div>
     </div>
    </header>
  )
}
