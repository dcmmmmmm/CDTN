"use client"
import { Circle } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'

export default function PriceFilter({slug}) {
  const searchParmas = useSearchParams()
  const minParams = searchParmas.get("min")
  const maxParams = searchParmas.get("max")
  console.log(maxParams,minParams)
  const priceRanges = [
    {
      display: "Under 300",
      max: 300,
    },
    {
      display: "Between 100 and 300",
      max: 300,
      min: 100,
    },
    {
      display: "Between 300 and 500",
      max: 500,
      min: 300,
    },
    {
      display: "Between 500 and 700",
      max: 700,
      min: 500,
    },
    {
      display: "Above 700",
      min: 700,
    },
  ]
  const router = useRouter();
  const {handleSubmit, reset, register} = useForm()
  function onSubmit(data) {
    const { min , max } = data;
    console.log(min, max);
    if(min && max ) {
      router.push(`/category/${slug}?sort=asc&min=${min}&max=${max}`)
      reset()
    } else if(min) {
      router.push(`/category/${slug}?sort=asc&min=${min}`)
      reset()
    } else if(max) {
      router.push(`/category/${slug}?sort=asc&max=${max}`)
      reset()
    }
  }
  return (
    <div>
      <div className=''>
        <div className='flex justify-between items-center'>
          <h2 className='text-xl font-medium text-white' >Price</h2>
          <Link 
            className='text-white bg-sky-700 hover:bg-slate-500 focus:ring-4 focus:ring-sky-300 font medium rounded-lg text-sm px-5 py-2.5 me-2 '
            href={`/category/${slug}`}>
              Reset Filter
            </Link>
        </div>
        {/* filter */}
        <div className='flex flex-col gap-3 py-4'>
          {
            priceRanges.map((range,i) => {
              return(
                <Link href={range.max && range.min 
                          ? `/category/${slug}?sort=asc&max=${range.max}&min=${range.min}` 
                          : range.max ? `/category/${slug}?sort=asc&max=${range.max}` : `/category/${slug}?sort=asc&min=${range.min}`} key={i}
                      className={`${
                        (range.min && range.min == minParams) ||
                        (range.max && range.max == maxParams) ||
                        (range.min && range.max && range.min == minParams && range.max == maxParams) ? 
                        " flex gap-2 items-center text-sky-500 text-sm"
                        :"flex gap-2 items-center text-white text-sm"
                      }`}
                >
                  <Circle className='w-4 h-4 flex-shrink-0'/>
                  {range.display}
                </Link>
              )
            })}
        </div>
        <form action="" onSubmit={handleSubmit(onSubmit)}
              className='grid grid-cols-3 gap-4 my-4'>
          <div className='col-span-1'>
            <input 
              {...register("min")} 
              type='number'
              id="cvv-input"
              aria-describedby='helper-text-explanation'
              className='bg-gray-50 border border-gray-300 text-black text-sm
              rounded-lg focus:ring-sky-500 focus:border-sky-500 blokc w-full p-2.5'
              placeholder='min'/>
          </div>
          <div className='col-span-1'>
            <input 
              {...register("max")} 
              type='number'
              id="cvv-input"
              aria-describedby='helper-text-explanation'
              className='bg-gray-50 border border-gray-300 text-black text-sm
              rounded-lg focus:ring-sky-500 focus:border-sky-500 blokc w-full p-2.5'
              placeholder='max'/>
          </div>
          <div className='col-span-1'>
            <button 
              type='submit'
              id="cvv-input"
              className='text-white bg-sky-700 hover:bg-sky-500 focus:ring-4 focus:ring-sky-300 font-medium
              rounded-lg text-sm px-5 py-2.5 me-2 mb-2'
              placeholder='max'>
                Filter
              </button>
          </div>
        </form>
      </div>
    </div>
  )
}
