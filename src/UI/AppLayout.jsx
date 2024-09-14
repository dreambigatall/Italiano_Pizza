import React from 'react'
import Header from './Header'
import CartOverview from '../fetures/cart/CartOverview'
import { Outlet, useNavigation } from 'react-router-dom'
import Loading from './Loading';

export default function AppLayout() {
  const navigation =useNavigation();
  console.log(navigation)
  console.log(navigation.state)
  const isLoading=navigation.state==="loading"
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <Loading/>}
     <Header/>
     
    <div className='overflow-scroll'>
   
   <main className=' max-w-3xl mx-auto '>
   <Outlet/>
   </main>
   </div>
   <CartOverview/>
    </div>
  )
}
