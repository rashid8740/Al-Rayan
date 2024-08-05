import React from "react";
import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    name: "Laptops",
    image: "/envy.png",
    link: "/category/laptops",
    description: "Powerful machines for work",
  },
  {
    name: "Smartphones",
    image: "/iphone2.png",
    link: "/category/smartphones",
    description: "Stay connected",
  },
  {
    name: "Speakers",
    image: "/speaker2.png",
    link: "/category/accessories",
    description: "Enhance your digital lifestyle",
  },
  {
    name: "Smartwatches",
    image: "/apple.png",
    link: "/category/smartwatches",
    description: "Wearable tech for every day",
  },
];

const FeaturedCategories = () => {
  return (
    <section className="">
      <div className="mx-auto ">
        <h2 className="text-2xl text-center sm:text-2xl md:text-2xl font-bold mb-6 sm:mb-8 text-gray-800">
          Featured Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {categories.map((category, index) => (
            <Link href={category.link} key={index} className="group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 transform border hover:scale-105">
                <div className="relative aspect-square">
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ top: "-15%" }}
                  >
                    <div className="relative w-4/5 h-3/5">
                      <Image
                        src={category.image}
                        alt={category.name}
                        layout="fill"
                        objectFit="contain"
                        className="transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-2 sm:p-3 md:p-4">
                    <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 group-hover:text-orange-600 transition-colors duration-300">
                      {category.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1 opacity-100 group-hover:opacity-100 transition-opacity duration-300">
                      {category.description}
                    </p>
                  </div>
                </div>
                <div className="p-2 sm:p-3 bg-orange-100 group-hover:bg-orange-200 transition-colors duration-300">
                  <span className="text-orange-600 text-xs sm:text-sm font-medium flex items-center justify-between">
                    Shop Now
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 sm:h-5 sm:w-5 transform group-hover:translate-x-1 transition-transform duration-300"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
