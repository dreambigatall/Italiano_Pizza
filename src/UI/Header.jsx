import React from 'react'
import { Link } from 'react-router-dom'
import SearchOrder from '../fetures/order/SearchOrder'
import Username from '../fetures/user/Username'

export default function Header() {
  return (
    <header className='bg-yellow-500 uppercase px-4 py-3 border-b border-stone-500 sm:px-6 flex items-center justify-between'>
       
      <Link to="/" className='tracking-widest'>fast react pizza co..</Link>
      
        <SearchOrder/>
        <Username/>
        </header>
  )
}
