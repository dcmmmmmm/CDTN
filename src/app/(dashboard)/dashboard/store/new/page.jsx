"use client"
import FormHeader from "../../../../../components/dashboard/FormHeader";
import React from "react";
import NewStoreForm from "../../../../../components/dashboard/Form/NewStoreForm"
export default function NewStorePage() {
  return (
    <div>
      {/* Form Header */}
      <FormHeader title="New Store" />
      {/* Form Container */}
      <NewStoreForm/>
    </div>
  );
}
