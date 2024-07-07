"use client";
import NewCatagoryForm from "../../../../../../components/dashboard/Form/NewCategoryForm";
import FormHeader from "../../../../../../components/dashboard/FormHeader"
import React, { useState } from "react";

export default function NewCatagoryPage() {
  return (
    <div>
      {/* Form Header */}
      <FormHeader title="New Category" />
      {/* Form Container */}
      <NewCatagoryForm/>
    </div>
  );
}
