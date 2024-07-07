"use client";
import React from "react";
import Carousel from "nuka-carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
export default function HeroCarousel({ banners }) {
  const DefaultControlsConfig = {
    nextButtonClassName: "rounded-full",
    nextButtonText: <ChevronRight />,
    pagingDotsClassName: "me-2 w-4 h-4 text-black",
    prevButtonClassName: "rounded-full",
    prevButtonText: <ChevronLeft />,
  };
  return (
    <Carousel
      defaultControlsConfig={DefaultControlsConfig}
      autoplay
      className="rounded-xl overflow-hidden"
      wrapAround
    >
      {banners.map((banner, index) => {
        return (
          <Link href={banner.link} key={index}>
            <Image
              src={banner.imageUrl}
              className="w-full "
              width={712}
              height={384}
              alt={banner.title}
              loading="lazy"
            />
          </Link>
        );
      })}
    </Carousel>
  );
}
