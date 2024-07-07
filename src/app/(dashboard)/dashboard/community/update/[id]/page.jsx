import React from 'react'
import FormHeader  from '../../../../../../components/dashboard/FormHeader'
import NewTrainingForm from "../../../../../../components/dashboard/Form/NewCommunityPostForm"
import { getData } from '../../../../../../lib/getData';
export default async function UpdateCommunityPage({params: {id}}) {
  const community = await getData(`communities/${id}`)
  console.log(community)
   // categories and supplier
   const categoriesData = await getData("categories");
   const categories = categoriesData.map((category) => {
     return {
       id: category.id,
       title: category.title,
     };
   });
   console.log(categories);
 
  return (
    <div>
      {/* Form Header */}
      <FormHeader title="Update Commnunity Post" />
      {/* Form Container */}
      <NewTrainingForm  category={categories}  updateData = {community}/>
    </div>
  )
}
