"use client"
import React from "react";
import { useSelector } from "react-redux";
import CartItem from "../../../components/store/CartItem"
import CartSubTotal from "../../../components/store/CartSubTotal"
import Breadcumb from "../../../components/store/Breadcumb"
import Link from "next/link";
export default function CartPage() {
  const cartItems = useSelector((store) => store.cart)
  const subTotal = cartItems.reduce((acc, currentItem) => {
    return acc + (currentItem.salePrice * currentItem.qty)
  },0).toFixed(2) ?? 0;
  console.log(cartItems)
  return (
    <div className="container mx-auto mt-10">
      <Breadcumb/>
      {cartItems.length > 0 ? (
        <div className="sm:flex shadow-md my-10">
          {/* Cart Item */}
          <CartItem cartItems={cartItems}/>
          {/* Order & Payment */}
          <CartSubTotal subTotal={subTotal}/>
        </div>
      ): (
        <div className='flex items-center justify-center h-28 md:h-12 gap-3' >
          <p className="uppercase text-white">NO ITEM IN YOUR CART </p>
          <Link href={'/'} className='text-cyan-400'>Shopping Now</Link>
        </div>
      )}
    </div>
  );
}
