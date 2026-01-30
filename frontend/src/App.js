import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom';
 import Header from './components/Header';
import Footer from './components/Footer';
 import { ToastContainer } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';
 import Summaryapi from './common';
import { useEffect } from 'react';
 import { useDispatch } from "react-redux";

import Context from './context';
import { setUserDetails } from './store/userSlice';

function App() {
 
  const dispatch=useDispatch();

  const fetchUserDetails=async()=>{
    const dataResponse= await  fetch(Summaryapi.current_user.url,{
      method:Summaryapi.current_user.method,
      credentials:"include"
    })

    const dataApi=await dataResponse.json();
         
    if(dataApi.success  || null){
       dispatch(setUserDetails(dataApi.data))

    }
    
  }


  const fetchUserAddToCart=async()=>{
       const dataResponse= await  fetch(Summaryapi.addToCartProductCount,{
      method:Summaryapi.addToCartProductCount.method,
      credentials:"include"
    })
    const dataApi=await dataResponse.json();
         
      console.log("dataapi",dataApi)
  }



  useEffect(()=>{
    //user details 
 fetchUserDetails();
 ///user details cart product
 fetchUserAddToCart();
  },[])


  return (
    <>

    <Context.Provider value={{
      fetchUserDetails,  //user-detail-featch
      fetchUserAddToCart

    }}>
     <ToastContainer />
    <Header/>
 <main  className='min-h-[calc(100vh-120px)] pt-14'>
  <Outlet/>
  
  </main>  
   <Footer/>
   </Context.Provider>
   </>
  );
}

export default App;   