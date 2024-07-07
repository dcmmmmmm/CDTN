import Image from "next/image";
import Link from "next/link";
import React from "react";
import HeroCarousel from "./HeroCarousel";
import advert from "../../../public/Adverts.gif";
import { CircleDollarSign, FolderSymlink, HelpCircle } from "lucide-react";
import SidebarCategories from "./SidebarCategories";
import { getData } from "../../lib/getData";

export default async function Hero() {
  const banners = await getData("banners");

  return (
    <div className="grid grid-cols-12 gap-8 mb-6 ">
      <SidebarCategories />
      <div className="col-span-full md:col-span-7 bg-white text-black font-bold text-lg rounded-xl">
        <HeroCarousel banners={banners} />
      </div>
      <div className="col-span-2 bg-[#61677A] rounded-xl p-3 hidden md:block">
        <Link href="/contact" className="flex items-center space-x-1 mb-3">
          <HelpCircle className="shrink-0 w-5 h-5 text-white" />
          <div className="flex flex-col">
            <h2 className="text-white uppercase text-sm">Help Center</h2>
            <p className="text-white text-[0.6rem]">Guide to Customer Care</p>
          </div>
        </Link>
        <Link href="#" className="text-white flex items-center space-x-1 mb-3">
          <FolderSymlink className="text-white shrink-0 w-5 h-5" />
          <div className="flex flex-col">
            <h2 className="text-white uppercase text-sm">Easy Return</h2>
            <p className="text-white text-[0.6rem]">Quick Return</p>
          </div>
        </Link>
        <Link
          href="/supplier-register"
          className="flex items-center space-x-1 mb-6"
        >
          <CircleDollarSign className="text-white shrink-0 w-5 h-5" />
          <div className="text-white flex flex-col">
            <h2 className="text-white uppercase text-sm">Sell on TypoType</h2>
            <p className="text-white text-[0.6rem]">Millon of Visitors</p>
          </div>
        </Link>

        <Image src={advert} alt="gif" className="w-full rounded-xl" />
      </div>
    </div>
  );
}
