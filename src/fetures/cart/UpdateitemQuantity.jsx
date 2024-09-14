import React from 'react'
import Button from '../../UI/Button'
import { useDispatch } from 'react-redux'
import { decreaseItemQuantity, increaseItemQuantity } from './cartSlice'

export default function UpdateitemQuantity({pizzaId,currentQuantity}) {
    const dispach=useDispatch()
  return (
    <div className='flex gap-1 items-center md:gap-3'>
        <Button type="round" onClick={()=>dispach(decreaseItemQuantity(pizzaId))}>-</Button>
        {currentQuantity}
        <Button type="round" onClick={()=>dispach(increaseItemQuantity(pizzaId))}>+</Button>
    </div>
  )
}
