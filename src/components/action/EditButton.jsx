import React from 'react'
import Link from 'next/link'
import { Pencil } from 'lucide-react'


export default function EditButton({editEndpoint, title}) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  return (
    <Link href={`${baseUrl}/dashboard/${editEndpoint}`} className='flex items-center text-emerald-400'>
      <Pencil className='mr-2 w-4 h-4'/>
      <span>Edit {title}</span>
    </Link>
  )
}
