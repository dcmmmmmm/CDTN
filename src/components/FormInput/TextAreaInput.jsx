"use client";
import { Textarea } from "../ui/textarea"
import {Label} from "../ui/label"
export default function TextareaInput({
  label,
  name,
  register,
  errors,
  isRequired = true,
  className = "sm:col-span-2",
}) {
  return (
    <div className={className}>
      <Label
        htmlFor={name}
        className="block text-sm font-medium leading-6  mb-2 "
      >
        {label}
      </Label>
      <div className="mt-2">
        <Textarea
          {...register(`${name}`, { required: isRequired })}
          name={name}
          id={name}
          rows={3}
          className="bg-white dark:bg-black dark:text-white block w-full rounded-xl border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black dark:focus:ring-white sm:text-sm sm:leading-6"
          defaultValue={""}
        />
        {errors[`${name}`] && (
          <span className="text-sm text-red-600 ">{label} is required</span>
        )}
      </div>
    </div>
  );
}
