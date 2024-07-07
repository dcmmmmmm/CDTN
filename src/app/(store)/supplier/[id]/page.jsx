import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { getData } from '../../../../lib/getData'
import CategoryList from '../../../../components/store/CategoryList'
import { Button } from '../../../../components/ui/button'
import Product from '../../../../components/store/Product'
import Breadcumb from '../../../../components/store/Breadcumb'
export default async function page({params: {id}}) {
  const supplier = await getData(`suppliers/details/${id}`)
  const allCategories = await getData('categories')
  return (
    <div>
        <Breadcumb/>
        <div className="bg-white rounded-lg py-8 gap-10 flex flex-col">
          <div className='flex'>
            <Image width={50} height={50} alt={supplier.name} src={supplier.imageUrl} className='rounded-full w-14 h-14 object-cover'/>
            <div className='px-3 '>
              <h2 className='py-1 line-clamp-2'>{supplier.name}</h2>
              <p>{supplier.terms}</p>
            </div>
          </div>
          <div className='px-3 grid grid-cols-4 gap-1'>
            {
              allCategories.map((categories,i) => {
                return(
                  <Link className="border border-sky-500 w-full px-2 text-center rounded-lg hover:bg-sky-500" href={`/category/${categories.slug}`} key={i}>
                    {categories.title}
                  </Link>
                )
              })
            }
          </div>
        </div>
        <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
          {
            supplier.products.map((product, i ) => {
              return (
                <div className='p-8' key={i}>
                  <Product  product={product}/>
                </div>
              )
            })
          }
        </div>
    </div>
      
  )
}
