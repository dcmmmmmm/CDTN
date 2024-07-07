import React from "react";
import {Label} from "../ui/label"
import {Input} from "../ui/input"
export default function SelectInput({
  label,
  name,
  register,
  className = "sm:col-span-2",
  options = [],
  multiple = false,
}) {
  return (
    <div className={className}>
      <Label htmlFor={name} className="block text-sm font-medium leading-6 ">
        {label}
      </Label>
      <div className="mt-2">
        <select
          {...register(`${name}`)}
          id={name}
          multiple={multiple}
          name={name}
          className="bg-white dark:bg-black dark:text-white block w-full rounded-xl border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
        >
          {options.map((option, i) => {
            return (
              <option key={i} value={option.id}>
                {option.title}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}
