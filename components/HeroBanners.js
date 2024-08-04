"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const MainBanner = ({ banners }) => {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev === 0 ? 1 : 0));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-lg h-full bg-gray-100">
      {banners.map((banner, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentBanner ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={banner.image}
            alt={banner.title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-10 lg:p-12">
            <div className="text-white max-w-md">
              <p className="text-orange-500 text-sm md:text-base uppercase mb-2 md:mb-3">
                {banner.subtitle}
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
                {banner.title}
              </h2>
              <p className="text-sm md:text-base mb-6 md:mb-8">
                {banner.price}
              </p>
            </div>
            <div>
              <Link
                href={banner.link}
                className="bg-black text-white py-2 px-6 rounded-full inline-block text-center text-sm md:text-base font-semibold hover:bg-orange-600 transition-colors duration-300"
              >
                Buy Now
              </Link>
            </div>
          </div>
        </div>
      ))}
      <div className="absolute bottom-4 right-4 flex space-x-2">
        {banners.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentBanner ? "bg-white" : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

const SmallBanner = ({ title, subtitle, price, image, link }) => (
  <div className="relative overflow-hidden rounded-lg h-full bg-gray-100">
    <Image
      src={image}
      alt={title}
      layout="fill"
      objectFit="cover"
      className="transition-transform duration-300 hover:scale-105"
    />
    <div className="absolute inset-0 p-4 md:p-5 flex flex-col justify-between mr-5">
      <div>
        <p className="text-orange-500 text-xs md:text-sm uppercase mb-1">
          {subtitle}
        </p>
        <h3 className="text-gray-800 text-base md:text-lg font-bold mb-1">
          {title}
        </h3>
        <p className="text-gray-600 text-xs md:text-sm">{price}</p>
      </div>
      {link && (
        <Link
          href={link}
          className="text-gray-800 underline text-xs md:text-sm hover:text-gray-600"
        >
          Shop Now
        </Link>
      )}
    </div>
  </div>
);

const HeroBanners = () => {
  const mainBanners = [
    {
      title: "IPad S13+ Pro.",
      subtitle: "Supercharged for pros.",
      price: "From $999.00 or $41.62/mo",
      image: "/mainbanner1.jpg",
      link: "/product/ipad-s13-pro",
    },
    {
      title: "New Arrivals",
      subtitle: "Latest Tech",
      price: "Starting from $499.00",
      image: "/mainbanner2.jpg",
      link: "/new-arrivals",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:h-[60vh]">
        <div className="h-[30vh] lg:h-full">
          <MainBanner banners={mainBanners} />
        </div>
        <div className="grid grid-cols-2 gap-4 h-[30vh] lg:h-[60vh]">
          <SmallBanner
            title="Laptops"
            subtitle="Best Sale"
            price="From $1699.00"
            image="/laptop-banner.jpg"
            link="/category/laptops"
          />
          <SmallBanner
            title="Buy IPad Air"
            subtitle="New Arrival"
            price="From $599 "
            image="/ipad-air-banner.jpg"
            link="/product/ipad-air"
          />
          <SmallBanner
            title="Smartwatch 7"
            subtitle="15% Off"
            price="Shop the latest band."
            image="/smartwatch-banner.jpg"
            link="/category/smartwatches"
          />
          <SmallBanner
            title="AirPods Max"
            subtitle="Free Engraving"
            price="High-fidelity audio"
            image="/airpods-max-banner.jpg"
            link="/product/airpods-max"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroBanners;
