import React, { useEffect, useState } from 'react'
 import Summaryapi from '../common';
 import { toast } from 'react-toastify';
 import moment from "moment"
 import { MdOutlineEdit } from "react-icons/md";
import ChangeUserRole from "../components/ChangeUserRole";



export default function Allusers() {

  const [allUser,setAllUser]=useState([]);
  const [openUpdateRole,setOpenUpdateRole]=useState(false);

  const [updateUserDetails, setUpdateUserDetails]=useState({
      
     email:"",
     name:"",
     role:"",
     _id:""
  }) 

 const featchAllUers=async()=>{
  const fetchData=await fetch(Summaryapi.alluser.url,{
    method:Summaryapi.alluser.method,
    credentials:"include"
  });
     
  const Responsedata= await fetchData.json();
  console.log(Responsedata);
   
  if(Responsedata.success){
      setAllUser(Responsedata.data)
  }
  if(Responsedata.error){
     toast.error(Responsedata.message);
  }


   
 }


  useEffect(()=>{
   featchAllUers();
  },[])


  return (
    <div className='bg-white pb-4'>
    <table className="w-full userTable  ">
      <thead>
       
         <tr className='bg-black text-white'>
           <th>Sr.</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Created Date</th>
          <th>Action</th>
         </tr>
      </thead>
      <tbody>
        {
           allUser.map((el,index)=>{
            return(
              <tr>
                <td>{index+1}</td>
                <td>{el?.name}</td>
                 <td>{el?.email}</td>
                 <td>{el?.role}</td>
                  <td>{moment(el?.createdAt).format("LL")}</td>
               <td><button className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500  hover:text-white' onClick=
               {()=>{
                 
                setUpdateUserDetails(el)
                setOpenUpdateRole(true)
                
                }}>
                <MdOutlineEdit /></button></td>
              </tr>
            )
           })
        }
      </tbody>

    </table>
        {
                openUpdateRole&&(
      <ChangeUserRole onClose={()=>setOpenUpdateRole(false)}
       name={updateUserDetails.name} 
       email={updateUserDetails.email} 
       role={updateUserDetails.role}
       userId={updateUserDetails._id}
       callFun={ featchAllUers}
       />
                )
        } 
       
  </div>
  )
}
