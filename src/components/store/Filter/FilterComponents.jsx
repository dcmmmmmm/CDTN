import { ChevronRight, Home} from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import BreadCumb from './BreadCumb'
import Sorting from './Sorting'
import FilterProduct from './FilterProduct'
import Filter from './Filter'

export default function FilterComponents({category, products}) {
  const {title, slug} = category
  const productCount =  category.products.length;
  return (
    <div>
      <div className='bg-white text-black py-8 px-4 text-xs space-y-6'>
        {/* Breadcumb */}
        <BreadCumb title={title} resultCount={productCount}/>
        {/* Sorting */}
        <Sorting title ={title} slug={slug} isSearch={category?.isSearch}/>
      </div>
        <div className='md:grid md:grid-cols-12 py-8 gap-10 sm:flex'>
          <div className='col-span-3  '>
            <Filter slug={slug} isSearch={category?.isSearch}/>
          </div>
          <div className='col-span-9'>
            <FilterProduct productCount={productCount} products={products}/>
          </div>
        </div>
      </div>
  )
}
