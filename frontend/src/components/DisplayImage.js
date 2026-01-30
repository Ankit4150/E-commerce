import React from 'react'
import { IoMdClose } from "react-icons/io";
export default function DisplayImage({
    imgUrl,
    onclose
}) {
  return (
  <div className='fixed bottom-0 top-0 right-0 left-0 flex justify-center items-center'>
    <div   className='bg-white shadow-lg rounded max-w-5xl mx-auto p-4'>
        
                <div   className='w-fit ml-auto hover:text-red-600 text-2xl cursor-pointer' onClick={onclose}> 
              <IoMdClose  />
                  </div> 
      <div className='flex justify-center p-4 max-w-[80vh] max-h-[80vh]'>
        <img  src={imgUrl} className='w-full h-full '/>
      </div>
    </div>
     
  </div>
  )
}
