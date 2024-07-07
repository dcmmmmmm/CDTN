import React from 'react'
import { getData } from '../../../lib/getData'
import Product from '../Product'
import PaginationFilter from './Pagination'
import { Button } from '../../ui/button'

export default async function FilterProduct({products, productCount}) {
  const pageSize = 3;
  const totalPages = Math.ceil(productCount / pageSize)
  return (
    <div>
      <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        {
          products.map((product, i) => {
            return(
              <Product product={product} key={i}/>
            )
          })
        }
      </div>
      {/* <div className='p-8 mx-auto flex items-center justify-center text-sky-400 w-full '>
        <PaginationFilter totalPages={totalPages}/>
      </div> */}
    </div>
  )
}
