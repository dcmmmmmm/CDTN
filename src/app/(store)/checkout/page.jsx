"use client";
import { ChevronRight, ShoppingBag } from "lucide-react";
import Steps from "../../../components/store/Checkout/Steps"
import Banner from "../../../components/store/Checkout/Banner"
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CheckoutStepsForm from "../../../components/store/Checkout/CheckoutStepsForm";

export default function CheckoutPage() {
  const steps = [
    {
      number: 1,
      name: "Personal Information",
    },
    {
      number: 2,
      name: "Shipping Address",
    },
    {
      number: 3,
      name: "Payment Method",
    },
    {
      number: 4,
      name: "Order Sumary",
    },
  ];
  
  return (
    <section className="py-12 bg-gray-50 sm:py-16 lg:py-20">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-2xl mx-auto">
          {/* Steps */}
          <Steps steps={steps}/>
          <div className="mt-6 overflow-hidden bg-white rounded-lg shadow md:mt-10">
            <div className="px-4 py-6 sm:px-8 sm:py-10">
              {/* Banner */}
              <Banner/>
              {/* Form Start*/}
              <CheckoutStepsForm/>
            </div>
          </div>
        </div>
      </div>
    </section>

  )
}
