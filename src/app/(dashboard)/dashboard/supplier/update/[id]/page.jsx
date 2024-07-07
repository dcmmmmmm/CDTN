import React from 'react'
import { getData } from '../../../../../../lib/getData'
import FormHeader from '../../../../../../components/dashboard/FormHeader';
import NewSupplierForm from '../../../../../../components/dashboard/Form/NewSupplierForm';

export default async function UpdateSupplierPage({params: {id}}) {
  const supplier = await getData(`suppliers/${id}`)
  console.log(supplier)
  return (
    <div>
      {/* Form Header */}
      <FormHeader title="Update Supplier" />
      {/* Form Container */}
      <NewSupplierForm updateData = {supplier}/>
    </div>
  );
}
