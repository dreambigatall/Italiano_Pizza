import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function SearchOrder() {
    const[orderId, setOrderId]=useState("");
    const navigate=useNavigate();
    function handelSubmit(e){
        e.preventDefault();
        if(!orderId) return;
         navigate(`/order/${orderId}`)
         setOrderId("");

    }
  return (
    <div>
        <form onSubmit={handelSubmit}>
        <input placeholder='search the order by id'
         value={orderId}
        onChange={(e)=>setOrderId(e.target.value)}
        className='rounded-full px-4 py-2 text-sm placeholder:text-stone-400 sm:w-64 sm:focus:w-72 transition-all duration-300
        focus:outline-none focus:ring focus:ring-yellow-500 sm:focus:ring-opacity-15 '/>
        </form>
    </div>
  )
}
