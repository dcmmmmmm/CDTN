import Link from "next/link";
import React from "react";
import SupplierCarousel from "./SupplierCarousel";
import { getData } from "../../lib/getData";

export default async function SupplierList() {
  const suppliers = await getData('suppliers');
  return (
    <div className="bg-[#FFF8E3] mx-1 text-black font-bold text-sm rounded-xl overflow-hidden shadow-md  border border-gray-200">
      <div className="bg-[#61677A] py-4 px-6 font-bold flex justify-center items-center">
        <h2 className="uppercase text-bold ">Shop By Supplier</h2>
      </div>
      <div className="bg-[#D8D9DA] p-4">
        <SupplierCarousel suppliers={suppliers} />
      </div>
    </div>
  );
}

