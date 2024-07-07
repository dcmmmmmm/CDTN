import { UploadDropzone } from "../../lib/uploadthing";
import { Pencil, XCircle } from "lucide-react";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";
import {Button} from "../ui/button"
export default function MultiImageInput({
  label,
  imageUrls = [],
  setImageUrls,
  className = "col-span-full",
  endpoint = "",
}) {
  function handleImageRemove (imageIndex) {
    const updatedImages = imageUrls.filter((image,i) => i !== imageIndex);
    setImageUrls(updatedImages)
  }
  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-4 ">
        <label
          htmlFor="course-image"
          className="block text-sm font-medium leading-6 "
        >
          {label}
        </label>
      </div>
      {imageUrls.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {
            imageUrls.map((imageUrl,i) => {
              return(
                <div className="relative mb-6" key={i}>
                  <Button onClick={() => handleImageRemove(i)} className="absolute -top-4 -right-2 bg-white text-slate-900 rounded-full">
                    <XCircle className=""/>
                  </Button>
                  <Image
                    src={imageUrl}
                    alt="Item Image"
                    width={1000}
                    height={667}
                    className="w-full h-36 object-cover"
                  />
                </div>
              )
            })
          }
        </div>
      ) : (
        <UploadDropzone
          className="rounded-xl border-gray-700 dark:border-white bg-gray-300 dark:bg-black"
          endpoint={endpoint}
          onClientUploadComplete={(res) => {
            console.log(res)
            const urls = res.map((item) => item.url)
            setImageUrls(urls)
            console.log(urls)
            console.log("Upload Completed");
          }}
          onUploadError={(error) => {
            // Do something with the error.
            toast.error("Image Upload Failed, Try again");
            console.log(`ERROR! ${error.message}`);
          }}
        />
      )}
    </div>
  );
}
