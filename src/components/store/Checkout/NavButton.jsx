import React from 'react' 
import {Button} from "../../ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentStep } from '../../../redux/slices/checkoutSlice'

export default function NavButton() {
  const currentStep = useSelector((store) => store.checkout.currentStep)
  const dispatch = useDispatch()
  function handlePrevious() {
    dispatch(setCurrentStep(currentStep - 1))
  }

  return (
    <div className="flex items-center justify-between mt-8 ">
    {/* Prev  */}
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
        <Button
          type="submit"
          className="flex items-center justify-center gap-2 w-full text-sm font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-700 disabled:bg-gray-500"
        >
          Next Step
          <ChevronRight className='w-4 h-4'/>
      </Button>
      </div>
    </div>
  )
}
