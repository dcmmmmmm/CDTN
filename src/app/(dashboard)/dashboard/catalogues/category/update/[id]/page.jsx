import FormHeader from "../../../../../../../components/dashboard/FormHeader"
import React from "react";
import NewCategoryForm from "../../../../../../../components/dashboard/Form/NewCategoryForm"
import { getData } from "../../../../../../../lib/getData";
export default async function UpdateCatagoryPage({params : {id}}) {
  const category = await getData(`categories/${id}`)
  console.log(category)
  return (
    <div>
      {/* Form Header */}
      <FormHeader title="Update Category" />
      {/* Form Container */}
      <NewCategoryForm updateData = {category}/>
    </div>
  );
}
