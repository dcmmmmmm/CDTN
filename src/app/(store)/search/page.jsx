import React from 'react'
import FilterComponents from '../../../components/store/Filter/FilterComponents'
import { getData } from '../../../lib/getData';

export default async function Search({searchParams}) {
  const {sort, min, max, search } = searchParams;
  const page = searchParams.page || 1;
  
  let products;
  if(search) {
    products = await  getData(`products?search=${search}`)
  }
 else {
    products = await  getData(`products?search=`)
  }
  const category = {
    title: search,
    slug: "",
    products,
    isSearch: true
  }
  return (
    <div>
      {/* <FilterComponents products={products}/> */}
      <FilterComponents category={category} products={products}/>
    </div>
  )
}
