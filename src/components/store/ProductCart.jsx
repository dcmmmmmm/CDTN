"use client"
import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import { useDispatch } from 'react-redux'
import { decrementQty, incrementQty, removeFromCart } from '../../redux/slices/cartSlice'
import { Minus, Plus } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ProductCart({cartItem}) {
  const dispatch = useDispatch()
  function handleCartItemDelete(cartId) {
    // delete cart item logic here
  dispatch(removeFromCart(cartId))
  toast.success("Item Remove Successfuly")
  }
  function handleCartItemIncrement(cartId) {
    // Incrementcart item logic here
  dispatch(incrementQty(cartId))
  }
  function handleCartItemDecrement(cartId) {
    // Decrement cart item logic here
  dispatch(decrementQty(cartId))
  }
  return (
    <div className="md:flex items-strech py-8 md:py-10 lg:py-8 border-t border-gray-50">
      <div className="md:w-4/12 2xl:w-1/4 w-full">
        <Image width={450} height={450} src={cartItem.imageUrl} alt={cartItem.title} className="h-full object-center object-cover md:block hidden" />
        <Image width={450} height={450} src={cartItem.imageUrl} alt={cartItem.title} className="md:hidden w-full h-full object-center object-cover" />
      </div>
      <div className="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
        <div className="flex items-center justify-between w-full">
          <p className="text-base font-black leading-none text-gray-800">{cartItem.title}</p>
          <div className='flex justify-between items-center '>
            <div className='rounded-lg border  border-black flex gap-3 items-center'>
              <Button onClick={() => handleCartItemDecrement(cartItem.id)} variant="ghost" className="border-r border-gray-400 rounded-none">
                <Minus/>
              </Button>
              <p className='flex-grow'>{cartItem.qty}</p>
              <Button onClick={() => handleCartItemIncrement(cartItem.id)} variant="ghost" className="border-l border-gray-400 rounded-none">
                <Plus/>
              </Button>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between pt-5">
          <div className="flex itemms-center justify-center">
            <Button variant="ghost" onClick={() => handleCartItemDelete(cartItem.id)} className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer">
              Remove
            </Button>
          </div>
          <p className="text-base font-black leading-none text-gray-800">$ {cartItem.salePrice}</p>
        </div>
      </div>
    </div>
  )
}
