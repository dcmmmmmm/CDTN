
import NewBannerForm from "../../../../../../components/dashboard/Form/NewBannerForm";
import FormHeader from "../../../../../../components/dashboard/FormHeader";
import React from "react"

export default function NewBannerPage() {
  return (
    <div>
      {/* Form Header */}
      <FormHeader title="New Banner" />
      {/* Form Container */}
      <NewBannerForm/>
    </div>
  );
}
