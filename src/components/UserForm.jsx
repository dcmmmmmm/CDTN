"use client";
import SubmitButton from "../components/FormInput/SubmitButton";
import TextInput from "../components/FormInput/TextInput";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { makePutRequest } from "../lib/apiRequest";
import UserImageInput from "./FormInput/UserImageInput";

export default function UserForm({customer}) {
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { isActive: true, ...customer } });
  const isActive = watch("isActive");
  const router = useRouter();
  function redirect() {
    router.push(`/profile/${customer.id}`);
  }
  async function onSubmit(data) {
    data.image = image;
    console.log(data);
    makePutRequest(
      setIsLoading,
      `api/customers/${customer.id}`,
      data,
      "Customer Profile",
      redirect,
      reset,
    )
    console.log("UPDATE REQUEST: ", data)
  }
  return (
    <div>
      {/* Form Container */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 overflow-hidden bg-white dark:bg-slate-900 rounded-lg shadow md:mt-10 px-4 py-6 sm:px-8 sm:py-10"
      >
        <p className="mt-6 text-base font-bold text-gray-900 dark:text-white">
        Personal Details
        </p>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 pt-4 pb-4">
          <TextInput
            label="UserName"
            name="name"
            register={register}
            errors={errors}
            className='w-full'
          />
          <TextInput
            label="Date Of Birth"
            type="date"
            name="dateOfBirth"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Email Address"
            name="email"
            type='email'
            register={register}
            errors={errors}
            className='w-full'
          />
          <TextInput
            label="Phone Number"
            name="phoneNumber"
            type='tel'
            register={register}
            errors={errors}
            className='w-full'
          />
          <TextInput
            label="Address"
            name="address"
            register={register}
            errors={errors}
            className='w-full'
          />
          <UserImageInput
            label="User Image Upload"
            image={image}
            setImage={setImage}
            endpoint="AdminImageUploader"
          />
        </div>
        <SubmitButton
            isLoading={isLoading}
            ButtonTitle={"Edit Profile" }
            loadingButtonTitle={"Editing Profile, please wait...!"}
          />
      </form>
    </div>
  );
}
