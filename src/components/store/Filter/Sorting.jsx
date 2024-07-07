"use client"
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import React from 'react'

export default function Sorting({title,slug,isSearch}) {
  const searchParams = useSearchParams();
  const sortParams = searchParams.get("sort")
  const sortingLinks = [
    {
      title: "Relevance",
      href: `/category/${slug}`,
      sort: null
    },
    {
      title: "Hight To Low",
      href: `/category/${slug}?sort=desc`,
      sort: "desc"
    },
    {
      title: "Low To High",
      href: `/category/${slug}?sort=asc`,
      sort: "asc"
    }
  ]
  const pathname = usePathname();

  return (
    <div className='flex items-center md:justify-between sm:flex-wrap '>
      {/* <h2 className='text-white text-2xl'>Search Result - {title}</h2> */}
      <h2 className=' text-2xl'>{isSearch && "Search Result - "}{title}</h2>
      <div className='flex text-sm items-center gap-3'>
        <p>Sort by: </p>
        <div className='flex items-center'>
          {
            sortingLinks.map((link,i) => {
              return(
                <Link href={link.href} key={i} 
                  className={`${
                    link.sort === sortParams
                    ? "bg-white px-2 py-1 border border-sky-500 text-sky-500"
                    : "border border-red-500 px-2 py-1"
                  }`}>
                  {link.title}
                </Link>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}
