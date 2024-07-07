"use client";
import ImageInput from "../../FormInput/ImageInput";
import SubmitButton from "../../FormInput/SubmitButton";
import TextInput from "../../FormInput/TextInput";
import ToggleInput from "../../FormInput/ToggleInput";
import TextareaInput from "../../FormInput/TextAreaInput";
import { makePostRequest, makePutRequest } from "../../../lib/apiRequest";
import { generateSlug } from "../../../lib/generateSlug";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function NewCatagoryForm({updateData={}}) {
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
    router.push("/dashboard/catalogues/category");
  }
  async function onSubmit(data) {
    const slug = generateSlug(data.title);
    data.slug = slug;
    data.imageUrl = imageUrl;
    console.log(data);
    if(id) {
      data.id = id;
      // Update request
      makePutRequest(
        setIsLoading,
        `api/categories/${id}`,
        data,
        "Category",
        redirect,
      )
      console.log("UPDATE REQUEST: ", data)
    }else {
      // Create request
      makePostRequest(
        setIsLoading,
        "api/categories",
        data,
        "Category",
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
            label="Category Title"
            name="title"
            register={register}
            errors={errors}
          />
          <TextareaInput
            label="Category Description"
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
          <ImageInput
            label="Category Image"
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            endpoint="CategoryImageUploader"
          />
        </div>

        <SubmitButton
          isLoading={isLoading}
          ButtonTitle={id? "Update Category" : "Create Category"}
          loadingButtonTitle={id? "Updating Category" :"Creating Category please wait..."}
        />
      </form>
    </div>
  );
}
