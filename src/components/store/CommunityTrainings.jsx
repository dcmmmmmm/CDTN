import Link from "next/link";
import React from "react";
import CommunityPostSlider from "./TrainingsSlider";
import { getData } from "../../lib/getData";

export default async function CommunityPosts() {
  const communities = await getData("communities");
  return (
    <div className="bg-white mx-1 text-black font-bold text-sm rounded-xl overflow-hidden shadow-md  border border-gray-200">
      <div className="bg-[#FFF8E3]  py-4 px-6 font-bold flex justify-between items-center">
        <h2>TypoType Community</h2>
        <Link
          href={"#"}
          className="bg-[#F3D7CA] text-black rounded-xl px-4 py-2 hover:bg-[#ecd3c7] duration-300"
        >
          See All
        </Link>
      </div>
      <div className="bg-[#E6A4B4]  p-4">
        <CommunityPostSlider communities={communities} />
      </div>
    </div>
  );
}
