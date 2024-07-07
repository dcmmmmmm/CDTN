"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../../ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { setCurrentStep } from '../../../../redux/slices/checkoutSlice';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function OrderSummaryForm() {
  const [loading, setLoading ] = useState(false)
  const router = useRouter()
  const checkoutFormData = useSelector((store) => store.checkout.checkoutFormData)
  const cartItems = useSelector((store) => store.cart)
  const currentStep = useSelector((store) => store.checkout.currentStep)
  const dispatch = useDispatch()
  console.log(cartItems)

  async function submitData() {
    // const orderItems = cartItems;
    const data = {
      orderItems: cartItems,
      checkoutFormData,
    }
    try {
      setLoading(true);
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const response = await fetch(`${baseUrl}/api/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (response.ok) {
        setLoading(false);
        toast.success(`Order Created Successfully`);
        router.push(`/order-confirm/${responseData.id}`)
      } else {
        setLoading(false);
        toast.error("SomeThing Went Wrong, Please Try Again")
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }

  }

  function handlePrevious() {
    dispatch(setCurrentStep(currentStep - 1))
  }

  return (
    <div className='my-6'>
      <p className="mt-6 text-base font-bold text-gray-900">
        Order Summary
      </p>
      {
        cartItems.map((cartItem,index) =>{
          return(
            <div className="md:flex items-strech py-8 md:py-10 lg:py-8 border-t border-gray-50" key={index}>
              <div className="md:w-4/12 2xl:w-1/4 w-full">
                <Image width={450} height={450} src={cartItem.imageUrl} alt={cartItem.title} className="h-full object-center object-cover md:block hidden" />
                <Image width={450} height={450} src={cartItem.imageUrl} alt={cartItem.title} className="md:hidden w-full h-full object-center object-cover" />
              </div>
              <div className="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
                <div className="flex items-center justify-between w-full">
                  <p className="text-base font-black leading-none text-gray-800">{cartItem.title}</p>
                  <div className='flex justify-between items-center '>
                    <div className='rounded-lg border  border-black flex gap-3 items-center'>
                      <p className='flex-grow mx-4 rounded-xl'>{cartItem.qty}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-5">
                  <p className="text-base font-black leading-none text-gray-800">$ {cartItem.salePrice}</p>
                </div>
              </div>
            </div>
          )
        })
      }
      <div className="flex items-center justify-between mt-8 ">

    {currentStep > 1 &&
      <div className="">
        <Button
          onClick={handlePrevious}
          type="button"
          className="flex items-center justify-center gap-2 w-full text-sm font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-700"
        >
          <ChevronLeft className='w-4 h-4 '/>
          Prev Step
        </Button>
      </div>
    }
      {/* Next */}
      <div className="">
      {loading ? (
        <Button disabled className="flex items-center justify-center gap-2 w-full text-sm font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-700 disabled:bg-gray-500">
          Processing Please Wait...
        </Button>
      ): (
        <Button
          onClick={submitData}
          className="flex items-center justify-center gap-2 w-full text-sm font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-700 disabled:bg-gray-500"
        >
          Process to Payment
          <ChevronRight className='w-4 h-4'/>
      </Button>
      )}
      
      </div>
    </div> 
  </div>
  )
}
