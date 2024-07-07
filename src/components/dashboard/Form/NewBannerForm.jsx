"use client";
import ImageInput from "../../FormInput/ImageInput";
import SubmitButton from "../../FormInput/SubmitButton";
import TextInput from "../../FormInput/TextInput";
import ToggleInput from "../../FormInput/ToggleInput";
import { makePostRequest } from "../../../lib/apiRequest";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { makePutRequest } from "../../../lib/apiRequest";

export default function NewBannerForm({updateData={}}) {
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
    router.push("/dashboard/catalogues/banner");
  }
  async function onSubmit(data) {
    data.imageUrl = imageUrl;
    console.log(data);
    if(id) {
      data.id = id
      // Update request
      makePutRequest(
        setIsLoading,
        `api/banners/${id}`,
        data,
        "Banner",
        redirect,
      )
      console.log("UPDATE REQUEST: ", data)
    }else {
      makePostRequest(
      setIsLoading,
      "api/banners",
      data,
      "Banner",
      redirect,
      reset,
    );
    setImageUrl("");
    }
  }
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-xl shadow sm:p-6
      md:p-8 dark:bg-slate-900 dark:border-gray-700 mx-auto my-3"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 pt-4">
          <TextInput
            label="Banner Title"
            name="title"
            register={register}
            errors={errors}
          />
          <TextInput
            label="Banner Link"
            name="link"
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
            label="Banner Image"
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            endpoint="BannerImageUploader"
          />
        </div>
        <SubmitButton
          isLoading={isLoading}
          ButtonTitle={id? "Update Banner" : "Create Banner"}
          loadingButtonTitle={id? "Updating Banner" :"Creating Banner please wait..."}
        />
      </form>
    </div>
  );
}
