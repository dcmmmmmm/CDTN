"use client";
import ImageInput from "../../FormInput/ImageInput";
import SubmitButton from "../../FormInput/SubmitButton";
import TextInput from "../../FormInput/TextInput";
import ToggleInput from "../../FormInput/ToggleInput";
import FormHeader from "../../dashboard/FormHeader";
import TextareaInput from "../../FormInput/TextAreaInput";
import { makePostRequest } from "../../../lib/apiRequest";
import { generateSupplier} from "../../../lib/generateSupplier"
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { makePutRequest } from "../../../lib/apiRequest";

export default function NewSupplierForm({updateData={}}) {
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
    router.push("/dashboard/supplier");
  }
  async function onSubmit(data) {
    const code = generateSupplier(data.name)
    data.code = code;
    data.imageUrl = imageUrl;
    console.log(data);
    if(id) {
      data.id = id
      makePutRequest(
        setIsLoading,
        `api/suppliers/${id}`,
        data,
        "Supplier",
        redirect,
      )
      console.log("UPDATE REQUEST: ", data)
    }else {
      makePostRequest(
        setIsLoading,
        "api/suppliers",
        data,
        "Supplier",
        redirect,
        reset,
      );
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
          label="Supplie's Name"
          type="text"
          name="name"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="Supplier's Email"
          type="email"
          name="email"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="Supplier's Phone Number"
          type="tel"
          name="phoneNumber"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="Supplier's Address"
          type="text"
          name="address"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="Supplier's Notes"
          type="text"
          name="notes"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="Kind of categories that you can supply for us "
          type="text"
          name="mainCategories"
          register={register}
          errors={errors}
          className="w-full"
        />
       
        <TextareaInput
          label="Supplier's Payment Terms"
          type="text"
          name="terms"
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
        <ImageInput
          label="Supplier's Logo"
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          endpoint="SupplierLogoUploader"
        />
      </div>

        <SubmitButton
          isLoading={isLoading}
          ButtonTitle={id? "Update Supplier" : "Create Supplier"}
          loadingButtonTitle={id? "Updating Supplier" :"Creating Supplier please wait..."}
        />
      </form>
    </div>
  );
}
