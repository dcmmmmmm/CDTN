import { UploadDropzone } from "../../lib/uploadthing";
import { Pencil } from "lucide-react";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";

export default function UserImageInput({
  label,
  image = "",
  setImage,
  className = "col-span-full",
  endpoint = "",
}) {
  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-4 ">
        <label
          htmlFor="course-image"
          className="block text-sm font-medium leading-6 "
        >
          {label}
        </label>
        {image && (
          <button
            onClick={() => setImage("")}
            type="button"
            className="flex space-x-2 bg-black text-white rounded-xl shadow py-2 px-4 dark:bg-white dark:text-black"
          >
            <Pencil className="w-5 h-5" />
            <span>Change Image</span>
          </button>
        )}
      </div>
      {image ? (
        <Image
          src={image}
          alt="Item image"
          width={1000}
          height={667}
          className="w-full h-64 object-contain"
        />
      ) : (
        <UploadDropzone
          className="rounded-xl border-gray-700 dark:border-white bg-gray-300 dark:bg-black"
          endpoint={endpoint}
          onClientUploadComplete={(res) => {
            setImage(res[0].url);
            // Do something with the response
            toast.success("Image Upload complete");
            console.log("Files: ", res);
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
