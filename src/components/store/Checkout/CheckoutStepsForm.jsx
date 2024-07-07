"use client"
import React from 'react'
import PersonalDetailForm from "./CheckoutStepForm/PersonalDetailForm"
import ShippingAddressForm from "./CheckoutStepForm/ShippingAddressForm"
import PaymentMethodForm from "./CheckoutStepForm/PaymentMethodForm"
import OrderSummaryForm from "./CheckoutStepForm/OrderSummaryForm"
import { useSelector } from 'react-redux'
export default function CheckoutStepsForm() {
  const currentStep = useSelector((store) => store.checkout.currentStep)
  // const currentStep = 1
  function renderFormByStep(step) {
    if(step === 1) {
      return <PersonalDetailForm/>
    }else if( step === 2) {
      return <ShippingAddressForm/>
    } else if(step === 3) {
      return <PaymentMethodForm/>
    } else if(step === 4) {
      return <OrderSummaryForm/>
    }
  }
  return (
    <div>
      {renderFormByStep(currentStep)}
    </div>
  )
}
