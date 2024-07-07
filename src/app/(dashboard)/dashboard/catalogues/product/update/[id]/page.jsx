import FormHeader from "../../../../../../../components/dashboard/FormHeader"
import React from "react";
import NewProductForm from "../../../../../../../components/dashboard/Form/NewProductForm"
import { getData } from "../../../../../../../lib/getData";

export default async function UpdateProductPage({params: {id}}) {
  const product = await getData(`products/${id}`)
  console.log(product)
   // categories and supplier
   const categoriesData = await getData("categories");
   const categories = categoriesData.map((category) => {
     return {
       id: category.id,
       title: category.title,
     };
   });
   console.log(categories);
 
   const supplierData = await getData("suppliers");
   const suppliers = supplierData.map((supplier) => {
     return {
       id: supplier.id,
       title: supplier.name,
     };
   });
   console.log(suppliers);
  return (
    <div>
      {/* Form Header */}
      <FormHeader title="Update Product" />
      {/* Form Container */}
      <NewProductForm  category={categories} supplier={suppliers} updateData = {product}/>
    </div>
  )
}
