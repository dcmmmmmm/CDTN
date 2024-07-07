import { getData } from "../../lib/getData";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function SidebarCategories() {
  const categories = await getData("categories");
  return (
    <div className="sm:col-span-3 bg-[#61677A] mx-1 text-black font-bold text-sm rounded-xl overflow-hidden shadow-md max-w-md border border-gray-200 hidden md:block ">
      <h2 className="py-3 px-6 font-bold bg-[#D8D9DA]">
        Shop By Categories ({categories.length})
      </h2>
      <div className="py-3 px-6 h-[300px] overflow-y-auto flex flex-col gap-2">
        {categories.map((category, index) => {
          return (
            <Link
              key={index}
              href={`/category/${category.slug}`}
              className="flex items-center gap-3 hover:bg-[#FFF6E0]  duration-200 transition-all rounded-full "
            >
              <Image
                src={category.imageUrl}
                alt={category.title}
                width={556}
                height={556}
                className="w-10 h-10 rounded-full border"
                loading="lazy"
              />
              <span>{category.title}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
