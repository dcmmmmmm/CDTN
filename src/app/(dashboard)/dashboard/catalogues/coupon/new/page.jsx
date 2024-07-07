"use client";
import FormHeader from "../../../../../../components/dashboard/FormHeader";
import NewCouponForm from "../../../../../../components/dashboard/Form/NewCouponForm"
import React from "react";

export default function NewCouponPage() {
  
  return (
    <div>
      {/* Form Header */}
      <FormHeader title="New Coupon" />
      <NewCouponForm/>
    </div>
  );
}
