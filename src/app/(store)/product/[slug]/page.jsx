import React from 'react'
import Breadcumb from "../../../../components/store/Breadcumb"
import Image from 'next/image'
import { Button } from '../../../../components/ui/button'
import CategorySlider from '../../../../components/store/CategorySlider'
import { Minus, Plus, Share2, Tag, BaggageClaim, Send, Info } from 'lucide-react'
import { getData } from '../../../../lib/getData'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { getServerSession } from 'next-auth'
import ProductShareBtn from '../../../../components/store/ProductShareBtn'
export default async function ProductDetailPage({params:{slug}}) {
  const product = await getData(`products/product/${slug}`)
  const {id} = product
  const catId = product.categoryIds
  const category =  await getData(`categories/${catId}`)
  const categoryProducts = category.products
  const products = categoryProducts.filter((product) => product.id !== id)
  const session = getServerSession()
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  const urlToShare = `${baseUrl}/product/${slug}`
  return(
    <>
      <Breadcumb product={product}/>
      <div className="bg-[#61677A] dark:bg-gray-800 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
              <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                <Image className="w-full h-full object-cover" src={product.imageUrl} alt={product.title} height={500} width={500}/>
              </div>
              {
                session ? (
                  <div className="flex -mx-2 mb-4">
                    <div className="w-1/2 px-2">
                      <Button className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">Add to Cart</Button>
                    </div>
                    <div className="w-1/2 px-2">
                      <Button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">Add to Wishlist</Button>
                    </div>
                  </div>
                ) : (
                  <div className="">
                    <section className="flex flex-col flex-wrap pt-12">
                      <div className="flex flex-row flex-wrap justify-center">
                        <div className="flex justify-center text-center m-2 h-24 w-64">
                          <div className="flex-shrink-0 rounded-full bg-gray-100 w-24 h-24 border border-blue-500 z-10">
                            <Info className="p-2 w-24 h-24 text-blue-500"/>
                          </div>
                          <div className="flex flex-col text-left bg-blue-500 text-white text-xs self-center pl-16 pr-4 py-2 -ml-12 rounded-r-full">
                            <h3 className="text-lg">You Are not sign in</h3>
                            <p className="w-64 text-xs overflow-y-hidden overflow-x-auto">
                              You can add Product when you are signed in. <Link href={"/login"}>Click Here</Link>
                            </p>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                )
              }
            </div>
            <div className="md:flex-1 px-4">
              <div className='flex items-center justify-between'>
                <h2 className="text-2xl font-bold text-white mb-2">{product.title}</h2>
                <ProductShareBtn urlToShare ={urlToShare}/>
              </div>
              <p className="text-slate-100 text-sm mb-4">
                SKU: {product.sku}
              </p>
              <div className="flex mb-4">
                <div className="mr-4">
                  <span className="font-bold text-black ">Price: </span>
                  <span className="text-white ">${product.salePrice}</span>
                </div>
                <div>
                  <span className="font-bold text-black ">Stock: </span>
                  <span className="text-white ">{product.productStock}</span>
                </div>
              </div>
        
              <div className="mb-4">
                <div className='flex justify-between items-center py-6'>
                  <div className='rounded-lg border  border-black flex gap-3 items-center'>
                    <Button variant="ghost" className="border-r border-gray-400 rounded-none">
                      <Minus/>
                    </Button>
                    <p className='flex-grow'>1</p>
                    <Button variant="ghost" className="border-l border-gray-400 rounded-none">
                      <Plus/>
                    </Button>
                  </div>
                </div>
              </div>
              <div>
                <span className="font-bold text-white ">Product Description:</span>
                <p className="text-slate-100 text-sm mt-2">
                  {product.description}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 p-4 my-8 rounded-xl">
          <h2 className='mb-4 text-2xl font-semibold '>Similar Products</h2>
            <CategorySlider products={products} />
        </div>
      </div>
    </>
  )
}
