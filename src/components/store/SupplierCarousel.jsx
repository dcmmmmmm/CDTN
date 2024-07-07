"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function SupplierCarousel({suppliers}) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5  ,
      slidesToSlide: 5, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
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
      dotListClass="custom-dot-list-style"
      itemClass="px-4"
    >
      {suppliers.map((supplier, index) => {
        return (
          <div key={index} className="rounded-xl mr-3 border overflow-hidden bg-[#FFF8E3] ">
            <Link href={`supplier/${supplier.id}`}>
              <Image
                src={supplier.imageUrl}
                alt={supplier.name}
                width={600}
                height={600}
                className="w-full  object-cover md:h-40"
                loading="lazy"
              />
            </Link>
            <div className="px-4">
              <Link href="#">
                <h2 className="px-2 text-center my-2">{supplier.name}</h2>
              </Link>
              </div>
            </div>
        );
      })}
    </Carousel>
  );
}


