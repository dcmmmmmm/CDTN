import React from 'react'
import FormHeader from '../../../../../../components/dashboard/FormHeader'
import NewStoreForm from '../../../../../../components/dashboard/Form/NewStoreForm'
import { getData } from '../../../../../../lib/getData'
export default async function UpdateStorePage({params: {id}}) {
  const store = await getData(`stores/${id}`)
  console.log(store)

  return (
    <div>
    {/* Form Header */}
    <FormHeader title="Update Stores" />
    {/* Form Container */}
    <NewStoreForm updateData = {store}/>
  </div>
  )
}
