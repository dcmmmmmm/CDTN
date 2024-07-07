"use client"
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function SearchForm() {
  const {register, handleSubmit, reset} = useForm();
  const router = useRouter()
  function hanldeSearch(data) {
    const {searchTerm } = data;
    console.log(searchTerm)
    reset()
    router.push(`/search?search=${searchTerm}`)
  }
  return (
    <form onSubmit={handleSubmit(hanldeSearch)} action="" className="relative lg:mx-4 w-max ">
      <div className="flex items-center gap-3">
        <input
          {...register("searchTerm")}
          type="search"
          className="peer cursor-pointer relative z-10 h-12 w-12 rounded-full border bg-transparent pl-12 outline-none focus:w-full focus:cursor-text focus: focus:pl-16 focus:pr-4"
        />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-gray-500 px-3.5 peer-focus:border-white peer-focus:white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <Button variant="ghost" type="submit">
          Search
        </Button>
      </div>
    </form>
  );
}
