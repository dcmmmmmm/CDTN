"use client"
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import { useSelector } from 'react-redux';

export default function Steps({steps}) {
  const cartItems = useSelector((store) => store.cart)
  const currentStep = useSelector((store) => store.checkout.currentStep)
  return (
    <nav className="flex">
      <ol
        role="list"
        className="flex flex-wrap gap-y-5 md:gap-y-0 items-center gap-x-1.5"
      >
        <li>
          <div className="-m-1">
            <Link
              href={'/cart'}
              title=""
              className="inline-flex items-center p-1 text-sm font-medium text-gray-500 rounded-md focus:outline-none focus:ring-2 focus:text-gray-900 focus:ring-gray-900 hover:text-gray-700"
            >
              Cart
              <span className="inline-flex items-center justify-center w-5 h-5 ml-2 text-xs font-bold bg-gray-400 rounded-full text-gray-50">
                {" "}
                {cartItems.length}{" "}
              </span>
            </Link>
          </div>
        </li>
        {steps.map((step, i) => {
          return (
            <li key={i}>
              <div className="flex items-center">
                <ChevronRight className="flex-shrink-0 w-4 h-4 text-gray-400" />
                <div className="-m-1">
                  <p
                    className={`p-1 ml-1.5 text-sm font-medium text-gray-500 rounded-md focus:outline-none focus:ring-2 focus:text-gray-900 focus:ring-gray-900 hover:text-gray-700 
                      ${step.number === currentStep?"text-sky-500":""}`}
                  >
                    {" "}
                    {step.name}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  )
}
