import React, { useState } from 'react'
import TextInput from '../../../FormInput/TextInput';
import NavButton from '../NavButton';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentStep, updateCheckoutFormData } from '../../../../redux/slices/checkoutSlice';

export default function ShippingAddressForm() {
  const dispatch = useDispatch()
  const currentStep = useSelector((store) => store.checkout.currentStep)
  const existingFormData = useSelector((store) => store.checkout.checkoutFormData)
  const initialShippingCost = existingFormData.shippingCost || ""
  const [shippingCost, setShippingCost] = useState(initialShippingCost)
  console.log(shippingCost)
  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...existingFormData
    }
  });

  async function processData(data) {
    data.shippingCost = shippingCost;
    console.log(data)
     // update the checkout data
     dispatch(updateCheckoutFormData(data))
     // update the current step
     dispatch(setCurrentStep(currentStep + 1))
  }

  return (
    <form onSubmit={handleSubmit(processData)}>
      <p className="mt-6 text-base font-bold text-gray-900">
        Shipping Address
      </p>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 pt-4">
        <TextInput
          label="Street Address"
          name="streetAddress"
          register={register}
          errors={errors}
          className='w-full'
        />
        <TextInput
          label="City"
          name="city"
          register={register}
          errors={errors}
          className='w-full'
        />
        <TextInput
          label="Country"
          name="country"
          register={register}
          errors={errors}
          className='w-full'
        />
        <TextInput
          label="District"
          name="district"
          register={register}
          errors={errors}
          className='w-full'
        />
        {/* Shipping Cost */}
        <h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white mt-4">
          Shipping Cost?
        </h3>
        <div className="mx-auto max-w-6xl  ">
          <div className="flex flex-wrap justify-center gap-3">
            <label className="cursor-pointer" >
              <input required type="radio" className="peer sr-only" name="shipping-cost" id='cheap' value={"0"} onChange={(e) => setShippingCost(e.target.value)}/>
              <div className="w-72 max-w-xl rounded-md bg-white dark:bg-gray-900 p-5 text-gray-600 dark:text-gray-300 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-sky-600 peer-checked:ring-blue-400 peer-checked:ring-offset-2">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold uppercase text-gray-500 dark:text-gray-400">Standard Shipping</p>
                    <div>
                      <svg className="text-gray-500 dark:text-gray-400" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m10.6 13.8l-2.175-2.175q-.275-.275-.675-.275t-.7.3q-.275.275-.275.7q0 .425.275.7L9.9 15.9q.275.275.7.275q.425 0 .7-.275l5.675-5.675q.275-.275.275-.675t-.3-.7q-.275-.275-.7-.275q-.425 0-.7.275ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z" /></svg>
                    </div>
                  </div>
                  <div className="flex items-end justify-between">
                    <p className='text-lg font-bold'> Delivery after 3-5 days </p>
                    <p className="text-sm font-bold">$0</p>
                  </div>
                </div>
              </div>
            </label>

            <label className="cursor-pointer">
              <input required type="radio" className="peer sr-only" name="shipping-cost" id='expensive' value={"49"}  onChange={(e) => setShippingCost(e.target.value)}/>
              <div className="w-72 max-w-xl rounded-md bg-white dark:bg-gray-900 p-5 text-gray-600 dark:text-gray-300 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-sky-600 peer-checked:ring-blue-400 peer-checked:ring-offset-2">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold uppercase text-gray-500 dark:text-gray-400">Express Shipping</p>
                    <div>
                      <svg className="text-gray-500 dark:text-gray-400" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m10.6 13.8l-2.175-2.175q-.275-.275-.675-.275t-.7.3q-.275.275-.275.7q0 .425.275.7L9.9 15.9q.275.275.7.275q.425 0 .7-.275l5.675-5.675q.275-.275.275-.675t-.3-.7q-.275-.275-.7-.275q-.425 0-.7.275ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z" /></svg>
                    </div>
                  </div>
                  <div className="flex items-end justify-between">
                    <p className="text-lg font-bold">Delivery after 1-2 days</p>
                    <p className="text-sm font-bold">$49</p>
                  </div>
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>
      <NavButton/>
    </form>
  )
}
