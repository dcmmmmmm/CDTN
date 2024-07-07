import FormHeader from "../../../../../../../components/dashboard/FormHeader"
import React from "react";
import NewCouponForm from "../../../../../../../components/dashboard/Form/NewCouponForm"
import { getData } from "../../../../../../../lib/getData";

export default async function UpdateCouponPage({params: {id}}) {
  const coupon = await getData(`coupons/${id}`)
  console.log(coupon)
  return (
    <div>
      {/* Form Header */}
      <FormHeader title="Update Coupon" />
      {/* Form Container */}
      <NewCouponForm updateData = {coupon}/>
    </div>
  )
}
