"use client"
import { BaggageClaim, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {Button} from '../ui/button'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/slices/cartSlice'
import toast from 'react-hot-toast'
import { useSession } from 'next-auth/react'
export default function Product({product}) {
  const dispatch = useDispatch()
  function handleAddToCart() {
    // gửi dữ liệu đến reducer addtocart
    dispatch(addToCart(product))
    toast.success("Item added Succesfully")
  }
  const {data: session} = useSession()
  const discount = (parseFloat(product.salePrice) / parseFloat(product.productPrice)).toFixed(2)
  return (
    <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
      <span className="bg-red-400 text-white px-2 py-1 absolute text-xs  md:tex t-sm rounded-bl-md"> {discount} % discount</span>
      <Link href={`/product/${product.slug}`}>
        <Image
          src={product.imageUrl ? product.imageUrl : "/AppleLogo.png"}
          alt={product.title}
          width={556}
          height={556}
          className="h-80 w-72 object-cover rounded-t-xl"
          loading="lazy"
        />
      </Link> 
      <div className="px-4 py-3 w-72">
        <Link href={`/product/${product.slug}`}>
          <p className="text-lg font-bold text-black truncate block capitalize">{product.title}</p>
        </Link>
        <div className="flex items-center">
          <p className="text-lg font-semibold text-black cursor-auto my-3">${product.salePrice}</p>
          <del>
            <p className="text-sm text-gray-600 cursor-auto ml-2">${product.productPrice}</p>
          </del>
                  
        </div>
        <div className="text-xs flex justify-between flex-wrap mt-1 gap-2">
          {session ? (
            <Button onClick={() => handleAddToCart()} className="flex items-center px-2 py-1 gap-x-2 bg-[#272829] text-sky-500 hover:bg-[#61677A]">
              <BaggageClaim />
              <span>Add</span>
            </Button>
          ): ""}
          <Button className="flex items-center py-1  bg-[#272829] text-sky-500 hover:bg-[#61677A]">
            <ChevronRight/>
              <Link href={`/product/${product.slug}`} >
              <span>View</span>
              </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
