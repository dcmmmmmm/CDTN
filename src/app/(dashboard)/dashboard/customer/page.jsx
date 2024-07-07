import React from 'react'
import DataTable from '../../../../components/data-table-components/DataTable'
import {columns} from "./columns"
import { getData } from '../../../../lib/getData'

export default async function page() {
  const customers  = await getData('/customers')
  console.log(customers)
  return (
    <div>
      <h2 className='text-2xl font-bold text-black dark:text-white'>Customers</h2>
      <div className="pt-8">
        <DataTable columns={columns} data={customers}/>
      </div>
    </div>
  )
}
