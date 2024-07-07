"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function CommunityPostSlider({ communities }) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <Carousel
      swipeable={false}
      draggable={false}
      showDots={true}
      responsive={responsive}
      ssr={true} // means to render carousel on server-side.
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={1000}
      keyBoardControl={true}
      customTransition="all .5"
      transitionDuration={500}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      // deviceType={this.props.deviceType}
      dotListClass="custom-dot-list-style"
      itemClass="px-4"
    >
      {communities.map((community, index) => {
        return (
          <div
            key={index}
            className="rounded-xl mr-3 border bg-[#FFF8E3] overflow-hidden"
          >
            <Link href={"#"}>
              <Image
                src={community.imageUrl}
                alt={community.title}
                width={556}
                height={556}
                className="w-full"
                loading="lazy"
              />
            </Link>
            <h2 className=" px-2 text-center mt-2 text-xl ">
              {community.title}
            </h2>
            <p className="px-4 line-clamp-3">{community.description}</p>
            <div className="flex justify-between items-center px-4 py-2">
              <Link
                href={"#"}
                className="bg-[#F3D7CA] text-black rounded-xl px-4 py-2 hover:bg-[#ecd3c7] duration-300"
              >
                Read More
              </Link>
              <Link href={"#"} className="">
                Talk to the Consultant
              </Link>
            </div>
          </div>
        );
      })}
    </Carousel>
  );
}
