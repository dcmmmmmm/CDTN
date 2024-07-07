"use client"
import SubmitButton from "../../../components/FormInput/SubmitButton";
import TextareaInput from "../../../components/FormInput/TextAreaInput";
import TextInput from "../../../components/FormInput/TextInput";
import ToggleInput from "../../../components/FormInput/ToggleInput";
import { makePostRequest } from "../../../lib/apiRequest";
import { generateSlug } from "../../../lib/generateSlug";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { makePutRequest } from "../../../lib/apiRequest";
export default function NewStorePage({updateData={}}) {
  const initialImageUrl = updateData?.imageUrl ?? ""
  const id = updateData?.id ?? ""
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [isLoading, setIsLoading] = useState(false);

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
    router.push("/dashboard/store");
  }
  async function onSubmit(data) {
    const slug = generateSlug(data.title);
    data.slug = slug;
    data.imageUrl = imageUrl;
    console.log(data);
    if(id) {
      data.id = id
      makePutRequest(
        setIsLoading,
        `api/stores/${id}`,
        data,
        "Store",
        redirect,
      )
      console.log("UPDATE REQUEST: ", data)
    }else {
      makePostRequest(setIsLoading, "api/stores", data, "Store", redirect, reset,);
      setImageUrl("");
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
            label="Store Name"
            name="title"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Store Address"
            name="address"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextareaInput
            label="Store Description"
            name="description"
            register={register}
            errors={errors}
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
          ButtonTitle={id? "Update Store" : "Create Store"}
          loadingButtonTitle={id? "Updating Store" :"Creating Store please wait..."}
        />
      </form>
    </div>
  );
}
