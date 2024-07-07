import Link from "next/link";
import React from "react";
import CategorySlider from "./CategorySlider";
import { getData } from "../../lib/getData";

export default async function CategoryList({ category }) {
  return (
    <div className="bg-white mx-1 text-black font-bold text-sm rounded-xl overflow-hidden shadow-md">
      <div className="bg-[#61677A] py-4 px-6 font-bold flex justify-between items-center">
        <h2>{category.title}</h2>
        <Link
          href={`/category/${category.slug}`}
          className="bg-[#272829] text-sky-600 rounded-xl px-4 py-2 hover:bg-[#61677A] duration-300"
        >
          See All
        </Link>
      </div>
      <div className="bg-[#D8D9DA] p-4">
        <CategorySlider  products={category.products} />
      </div>
    </div>
  );
}
