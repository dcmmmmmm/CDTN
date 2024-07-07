import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
export default function CartSubTotal({subTotal}) {
  const shipping = 10
  const tax = 20
  const totalPrice = (Number(subTotal) + Number(shipping) + Number(tax)).toFixed(2)
  return (
    <div id="summary" className=" w-full md:w-1/4  px-8 py-10 bg-[#61677A]">
      <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
      <div className="flex justify-between mt-10 mb-5">
        <span className="font-semibold text-sm uppercase">Sub Total Price</span>
        <span className="font-semibold text-sm">$ {subTotal}</span>
      </div>
      <div className='flex items-center justify-between mb-3 '>
        <label className="font-medium inline-block text-sm uppercase gap-3">
          Shipping
        </label>
        <span>$ {shipping}</span>
      </div>
      <div className='flex items-center justify-between mb-3 '>
        <label className="font-medium inline-block text-sm uppercase gap-3">
          Tax
        </label>
        <span>$ {tax}</span>
      </div>
      <div className="py-5">
        <label
          htmlFor="Coupon"
          className="font-semibold inline-block mb-3 text-sm uppercase"
        >
          Coupon Code
        </label>
        <input
          type="text"
          id="Coupon"
          placeholder="Enter your code"
          className="p-2 text-sm w-full"
        />
        </div>
        <Button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">
          Apply
        </Button>
        <div className="border-t mt-8">
        <div className="flex font-semibold justify-between py-6 text-sm uppercase">
          <span>Total Price</span>
          <span>$ {totalPrice}</span>
        </div>
        <Button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
          <Link href={"/checkout"}>Checkout</Link>
        </Button>
      </div>
    </div>
  )
}
