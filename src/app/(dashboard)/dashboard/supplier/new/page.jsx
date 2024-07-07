"use client";
import NewSupplierForm from "../../../../../components/dashboard/Form/NewSupplierForm";
import FormHeader from "../../../../../components/dashboard/FormHeader";
import React from "react";

export default function NewSupplierPage() {
  
  return (
    <div>
      {/* Form Header */}
      <FormHeader title="New Supplier" />
      {/* Form Container */}
      <NewSupplierForm/>
    </div>
  );
}
