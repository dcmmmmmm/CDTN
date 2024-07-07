import FormHeader from "../../../../../../../components/dashboard/FormHeader"
import React from "react";
import NewBannerForm from "../../../../../../../components/dashboard/Form/NewBannerForm"
import { getData } from "../../../../../../../lib/getData";

export default async function UpdateBannerPage({params: {id}}) {
  const banner = await getData(`banners/${id}`)
  console.log(banner)
  return (
    <div>
      {/* Form Header */}
      <FormHeader title="Update Banner" />
      {/* Form Container */}
      <NewBannerForm updateData = {banner}/>
    </div>
  )
}
