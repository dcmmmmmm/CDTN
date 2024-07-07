import React from 'react'
import ProductCart from './ProductCart'
import Link from 'next/link'
export default function CartItem({cartItems}) {
  return (
    <div className="w-full sm:w-3/4 bg-white px-10 py-10">
      <div className="flex justify-between border-b pb-8">
        <h1 className="font-semibold text-2xl">Shopping Cart</h1>
        <h2 className="font-semibold text-2xl">{cartItems.length} Items</h2>
      </div>
      {cartItems.length > 0 ? cartItems.map((item, index) => {
        return(
          <ProductCart cartItem={item} key={index}/>
        )
      }) : (
          <div className='flex items-center justify-center h-28 md:h-12 gap-3' >
            <p className="lowercase">NO ITEM IN YOUR CART </p>
            <Link href={'/'} className='text-cyan-400'>Shopping Now</Link>
          </div>
        )}

      <Link href="/" className="flex font-semibold text-indigo-600 text-sm mt-10">
        <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512">
          <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
        </svg>
          Continue Shopping
      </Link>
    </div>
  )
}
