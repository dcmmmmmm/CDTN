"use client"
import React from 'react'
import TextInput from '../../../FormInput/TextInput'
import { useForm } from 'react-hook-form';
import NavButton from '../NavButton'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentStep, updateCheckoutFormData } from '../../../../redux/slices/checkoutSlice';
import { useSession } from 'next-auth/react';
export default function PersonalDetailForm() {
  const {data:session, status} = useSession()
  const userId = session?.user?.id
  const currentStep = useSelector((store) => store.checkout.currentStep)
  const existingFormData = useSelector((store) => store.checkout.checkoutFormData)
  const dispatch = useDispatch()
  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...existingFormData,
    }
  });

  async function processData(data) {
    if(userId) {
      data.userId = userId;
      // update the checkout data
      dispatch(updateCheckoutFormData(data))
      // update the current step
      dispatch(setCurrentStep(currentStep + 1))
    }
    
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(processData)}>
      <p className="mt-6 text-base font-bold text-gray-900">
        Personal Details
      </p>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 pt-4">
        <TextInput
          label="First Name"
          name="firstName"
          register={register}
          errors={errors}
          className='w-full'
        />
        <TextInput
          label="Last Name"
          name="lastName"
          register={register}
          errors={errors}
          className='w-full'
        />
        <TextInput
          label="Email Address"
          name="email"
          type='email'
          register={register}
          errors={errors}
          className='w-full'
        />
        <TextInput
          label="Phone Number"
          name="phoneNumber"
          type='tel'
          register={register}
          errors={errors}
          className='w-full'
        />
      </div>
      <NavButton/>
    </form>
  )
}
