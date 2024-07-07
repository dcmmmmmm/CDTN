import NewProductForm from "../../../../../../components/dashboard/Form/NewProductForm"
import { getData } from "../../../../../../lib/getData";
import React from "react";

export default async function NewProductPage() {
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
  return <NewProductForm category={categories} supplier={suppliers} />;
}
