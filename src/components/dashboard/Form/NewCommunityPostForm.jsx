"use client";
import ImageInput from "../../FormInput/ImageInput";
import SelectInput from "../../FormInput/SelectInput";
import SubmitButton from "../../FormInput/SubmitButton";
import TextareaInput from "../../FormInput/TextAreaInput";
import TextInput from "../../FormInput/TextInput";
import ToggleInput from "../../FormInput/ToggleInput";
import { makePostRequest, makePutRequest } from "../../../lib/apiRequest";
import { generateSlug } from "../../../lib/generateSlug";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
export default function NewCommunityPostForm({ category, updateData ={} }) {
  const initialImageUrl = updateData?.imageUrl ?? ""
  const initialContent = updateData?.content ?? ""
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

  // Quill editor
  const [content, setContent] = useState(initialContent);
  //Custom Tool Bar
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "color", "image"],
      [{ "code-block": true }],
      ["clean"],
    ],
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "indent",
    "image",
    "code-block",
    "color",
  ];
  // Quill editor end

  const isActive = watch("isActive");
  const router = useRouter();
  function redirect() {
    router.push("/dashboard/community");
  }
  async function onSubmit(data) {
    const slug = generateSlug(data.title);
    data.slug = slug;
    data.imageUrl = imageUrl;
    data.content = content;
    console.log(data);
    if(id) {
      data.id = id
      makePutRequest(
        setIsLoading,
        `api/communities/${id}`,
        data,
        "Commnity Post",
        redirect,
      )
      console.log("UPDATE REQUEST: ", data)
    }else {
      makePostRequest(
        setIsLoading,
        "api/communities",
        data,
        "Community Post",
        redirect,
        reset,
      );
      setImageUrl("");
      setContent("");
      // router.push('/dashboard/community')
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
            label="Community Title"
            name="title"
            register={register}
            errors={errors}
            className="w-full"
          />
          <SelectInput
            label="Select Category"
            name="categoryId"
            register={register}
            errors={errors}
            className="w-full"
            options={category}
            multiple={false}
          />
          <TextareaInput
            label="Training Description"
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
            label="Training Thumbnail"
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            endpoint="TrainingThumbnailUploader"
          />
          {/* content */}
          <div className="sm:col-span-2">
            <label
              htmlFor="content"
              className=" block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Training Content
            </label>
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              modules={modules}
              formats={formats}
            />
          </div>
          {/* content end */}
        </div>

        <SubmitButton
          isLoading={isLoading}
          ButtonTitle={id? "Update CommunityPost" : "Create CommunityPost"}
          loadingButtonTitle={id? "Updating CommunityPost" :"Creating CommunityPost please wait..."}
        />
      </form>
    </div>
  );
}
