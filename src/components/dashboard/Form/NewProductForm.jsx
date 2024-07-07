"use client";
import ImageInput from "../../FormInput/ImageInput";
import SelectInput from "../../FormInput/SelectInput";
import SubmitButton from "../../FormInput/SubmitButton";
import TextareaInput from "../../FormInput/TextAreaInput";
import TextInput from "../../FormInput/TextInput";
import ToggleInput from "../../FormInput/ToggleInput";
import FormHeader from "../FormHeader";
import MultiImageInput from "../../FormInput/MultiImageInput"
import { makePostRequest, makePutRequest } from "../../../lib/apiRequest";
import { generateSlug } from "../../../lib/generateSlug";
import { generateProductCode} from "../../../lib/generateProductCode"
import { Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function NewProductForm(
  {category,supplier,updateData={}}
) {
  const initialImageUrl = updateData?.imageUrl ?? ""
  const initialTags = updateData?.tags ?? []

  const id = updateData?.id ?? ""
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [productImages, setProductImages] = useState([])
  // TAGS
  const [tags, setTags] = useState(initialTags);
  const [tag, setTag] = useState("");
  const [showTagForm, setShowTagForm] = useState(false);
  function addTag() {
    setTags([...tags, tag]);
    setTag("");
  }
  function removeTag(index) {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  }
  //TAGS end
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { isActive: true, isWholeSale: false, ...updateData } });
  const isActive = watch("isActive");
  const isWholeSale = watch("isWholeSale");
  const router = useRouter();
  function redirect() {
    router.push("/dashboard/catalogues/product");
  }
  async function onSubmit(data) {
    const slug = generateSlug(data.title);
    const productCode = generateProductCode('TPT', data.title);
    data.slug = slug;
    data.productCode = productCode;
    data.qty = 1;
    data.productImages = productImages;
    data.tags = tags;
    console.log(data);
    if(id) {
      data.id = id
      makePutRequest(
        setIsLoading,
        `api/products/${id}`,
        data,
        "Product",
        redirect,
      )
      console.log("UPDATE REQUEST: ", data)
    }else {
      makePostRequest(
        setIsLoading,
        "api/products",
        data,
        "Product",
        redirect,
        reset,
      );
      setProductImages([]);
      setTags([]);
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
            label="Product Title"
            name="title"
            register={register}
            errors={errors}
          />
          <TextInput
            label="Product SKU"
            name="sku"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Product Barcode"
            name="barcode"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Product Price (Before Discount)"
            name="productPrice"
            register={register}
            errors={errors}
            type="number"
            className="w-full"
          />
          <TextInput
            label="Product Price (Discounted)"
            name="salePrice"
            register={register}
            errors={errors}
            type="number"
            className="w-full"
          />
          <SelectInput
            label="Select Categories"
            name="categoryId"
            register={register}
            errors={errors}
            className="w-full"
            options={category}
            multiple={false}
          />
          <SelectInput
            label="Select Suppliers"
            name="supplierId"
            register={register}
            errors={errors}
            className="w-full"
            options={supplier}
            multiple={false}
          />
          <TextInput
            label="Product Stock"
            name="productStock"
            register={register}
            errors={errors}
            type="number"
            className="w-full"
          />
          <TextInput
            label="Unit"
            name="unit"
            register={register}
            errors={errors}
            type="text"
            className="w-full"
          />
          <ToggleInput
            label="WholeSale"
            name="isWholeSale"
            trueTitle="True"
            falseTitle="False"
            register={register}
            errors={errors}
          />
          {/* {isWholeSale && (
            <>
              <TextInput
                label="WholeSale Price"
                name="wholeSalePrice"
                register={register}
                errors={errors}
                type="number"
                className="w-full"
              />
              <TextInput
                label="Minimum Wholesale Quantity"
                name="wholesaleQty"
                register={register}
                errors={errors}
                type="number"
                className="w-full"
              />
            </>
          )} */}
          <ToggleInput
            label="Active"
            name="isActive"
            trueTitle="Published"
            falseTitle="Not Published"
            register={register}
            errors={errors}
          />
          <MultiImageInput
            label="Product Image"
            imageUrls={productImages}
            setImageUrls={setProductImages}
            endpoint="MultiProductImageUploader"
          />
          {/* <ImageInput
            label="Product Image"
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            endpoint="ProductImageUploader"
          /> */}
          <TextareaInput
            label="Product Description"
            name="description"
            register={register}
            errors={errors}
          />
          {/* Tags (Input item array) */}
          <div className="sm:col-span-2">
            {showTagForm ? (
              <form className="flex items-center">
                <label htmlFor="voice-search" className="sr-only">
                  Search
                </label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 21 21"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z"
                      />
                    </svg>
                  </div>
                  <input
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    type="text"
                    id="voice-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Create Tags..."
                    required
                  />
                </div>
                <button
                  onClick={addTag}
                  type="button"
                  className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-xl border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <Plus className="h-4 w-4 me-2" />
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setShowTagForm(false)}
                  className="ml-3 shrink-0 w-8 h-8 bg-red-700 rounded-xl flex items-center justify-center"
                >
                  <X className="w-4 h-4 " />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setShowTagForm(true)}
                type="button"
                className="flex items-center space-x-2 py-2 "
              >
                <Plus />
                <span>Add Tags</span>
              </button>
            )}
            <div className="flex flex-wrap gap-4 mt-4">
              {tags.map((item, i) => {
                return (
                  <div
                    onClick={() => removeTag(i)}
                    key={i}
                    className="flex space-x-2 items-center bg-slate-400 px-4 py-2 rounded-xl cursor-pointer"
                  >
                    <p>{item}</p>
                    <X className="w-4 h-4" />
                  </div>
                );
              })}
            </div>
            {/* End Tags (Input item array) */}
          </div>
        </div>
        <SubmitButton
          isLoading={isLoading}
          ButtonTitle={id? "Update Product" : "Create Product"}
          loadingButtonTitle={id? "Updating Product" :"Creating Product please wait..."}
        />
      </form>
    </div>
  );
}
