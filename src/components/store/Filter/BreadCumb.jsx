"use client"
import { ChevronRight, Home } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'

export default function BreadCumb({title, resultCount}) {
  // const searchParams = useSearchParams();
  // const currentPage = searchParams.get("page") || 1
  // const pageSize = 3;
  // const startRange = (currentPage - 1) * pageSize + 1;
  // const endRange = Math.min(currentPage * pageSize, resultCount);
  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center'>
        <Link href={"/"} className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
          <Home className='w-3 h-3 me-2.5'/>
          Home
        </Link>
        <p className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
          <ChevronRight className='w-3 h-3 me-2.5'/>
            {title}
        </p>
      </div>
      <p className=''>{resultCount} results</p>
    </div>
  )
}
