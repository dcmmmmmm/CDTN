import React from 'react'
import PriceFilter from './PriceFilter'
import SupplierFilter from './SupplierFilter'
export default function Filter({slug, isSearch}) {
  return (
    <div className=' my-10'>
      <PriceFilter slug={slug} isSearch={isSearch} />
      {/* <SupplierFilter/> */}
    </div>
  )
}
