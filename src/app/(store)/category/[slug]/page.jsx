import React from 'react'
import FilterComponents from '../../../../components/store/Filter/FilterComponents'
import { getData } from '../../../../lib/getData'

export default async function page({params : {slug}, searchParams}) {
  const {sort, min , max  } = searchParams;
  const page = searchParams.page || 1
  const category = await getData(`categories/filter/${slug}`)
  let products;
  // if(page) {
  //   products = await  getData(`products?cateId=${category.id}&page=${page}`)
  // }
  // else 
  if(max && min) {
    products = await  getData(`products?cateId=${category.id}&sort=asc&min=${min}&max=${max}`)
  }else if(min) {
    products = await  getData(`products?cateId=${category.id}&sort=asc&min=${min}`)
  }else if(max) {
    products = await  getData(`products?cateId=${category.id}&sort=asc&max=${max}`)
  }else if(sort) {
    products = await  getData(`products?cateId=${category.id}&sort=${sort}`)
  }else {
    products = await  getData(`products?cateId=${category.id}`)
  }

  return (
    <div>
      <FilterComponents category={category} products={products}/>
    </div>
  )
}
