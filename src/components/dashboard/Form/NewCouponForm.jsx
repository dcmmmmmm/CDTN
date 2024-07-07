"use client";
import SubmitButton from "../../FormInput/SubmitButton";
import TextInput from "../../FormInput/TextInput";
import ToggleInput from "../../FormInput/ToggleInput";
import { makePostRequest, makePutRequest } from "../../../lib/apiRequest";
import { generateCouponCode } from "../../../lib/generateCouponCode";
import { generateIsoFormattedDate } from "../../../lib/generateISOFormattedDate";
import { ConvertIsoDateToNormal} from "../../../lib/ConvertIsoDateToNormal"
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function NewCouponForm({updateData ={}}) {
  const expiryDateNormal = ConvertIsoDateToNormal(updateData.expireDate)
  const id = updateData?.id ?? ""
  updateData.expireDate = expiryDateNormal
  const [isLoading, setIsLoading] = useState(false);
  const [couponCode, setCouponCode] = useState();
  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { isActive: true, ...updateData } });
  const isActive = watch("isActive");
  const router = useRouter();
  function redirect() {
    router.push("/dashboard/catalogues/coupon");
  }
  async function onSubmit(data) {
    const couponCode = generateCouponCode(data.title, data.expireDate);
    const isoFormattedDate = generateIsoFormattedDate(data.expireDate);
    data.couponCode = couponCode;
    data.expireDate = isoFormattedDate;
    console.log(data);
    if(id) {
      data.id = id
      makePutRequest(
        setIsLoading,
        `api/coupons/${id}`,
        data,
        "Coupon",
        redirect,
      )
      console.log("UPDATE REQUEST: ", data)
    }else {
      makePostRequest(
        setIsLoading,
        "api/coupons",
        data,
        "Coupon",
        redirect,
        reset,
      );
    }

  }
  return (
    <div>
      {/* Form Container */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-xl shadow sm:p-6
      md:p-8 dark:bg-slate-900 dark:border-gray-700 mx-auto my-3"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 pt-4">
          <TextInput
            label="Coupon Title"
            name="title"
            register={register}
            errors={errors}
          />
          <TextInput
            label="Coupon Expire Date"
            name="expireDate"
            register={register}
            errors={errors}
            className="w-full"
            type="date"
          />
          <ToggleInput
            label="Active"
            name="isActive"
            trueTitle="Published"
            falseTitle="Not Published"
            register={register}
            errors={errors}
          />
        </div>
        <SubmitButton
          isLoading={isLoading}
          ButtonTitle={id? "Update Coupon" : "Create Coupon"}
          loadingButtonTitle={id? "Updating Coupon" :"Creating Coupon please wait..."}
        />
      </form>
    </div>
  );
}
