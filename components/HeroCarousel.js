"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    title: "Galaxy S13+ Ultra",
    subtitle: "Supercharged for pros.",
    description: "From $999.00",
    buttonText: "Buy Now",
    image: "/apple.png",
    bgColor: "bg-gray-100",
  },
  {
    title: "New Arrivals",
    subtitle: "Smartwatches",
    description: "Discover our collection of cutting-edge smartwatches",
    buttonText: "Explore",
    image: "/apple.png",
    bgColor: "bg-blue-100",
  },
  {
    title: "Summer Sale",
    subtitle: "Smartphones",
    description: "Upgrade your mobile experience with our latest offers",
    buttonText: "View Deals",
    image: "/apple.png",
    bgColor: "bg-yellow-100",
  },
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    let timer;
    if (isAutoPlaying) {
      timer = setInterval(nextSlide, 5000);
    }
    return () => clearInterval(timer);
  }, [isAutoPlaying, nextSlide]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <div
      className="relative overflow-hidden lg:h-[50vh]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="flex transition-transform duration-500 ease-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`w-full flex-shrink-0 ${slide.bgColor} h-full`}
          >
            <div className="container mx-auto px-4 py-8 md:py-12 lg:py-8 h-full">
              <div className="flex flex-row items-center h-full lg:justify-center">
                <div className="w-1/2 pr-8 lg:w-5/12 lg:pr-12">
                  <h2 className="text-4xl md:text-5xl lg:text-4xl font-bold mb-2 md:mb-3 text-gray-800 leading-tight">
                    {slide.title}
                  </h2>
                  <h3 className="text-xl md:text-2xl lg:text-xl font-semibold mb-3 md:mb-4 text-gray-600">
                    {slide.subtitle}
                  </h3>
                  <p className="text-lg md:text-xl lg:text-base mb-6 md:mb-8 text-gray-700">
                    {slide.description}
                  </p>
                  <button className="bg-black text-white w-40 px-6 py-3 text-lg md:text-xl lg:text-base rounded-xl hover:bg-gray-800 transition duration-300 flex items-center justify-center">
                    {slide.buttonText}
                  </button>
                </div>
                <div className="w-1/2 h-64 flex justify-center items-center lg:w-5/12">
                  <div className="relative w-full h-full">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      layout="fill"
                      objectFit="contain"
                      className="lg:max-h-[40vh] lg:max-w-[90%]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 md:left-4 -translate-y-1/2 bg-white/80 text-gray-800 p-1.5 md:p-2 rounded-full hover:bg-white transition duration-300"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 md:right-4 -translate-y-1/2 bg-white/80 text-gray-800 p-1.5 md:p-2 rounded-full hover:bg-white transition duration-300"
        aria-label="Next slide"
      >
        <ChevronRight size={20} />
      </button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-2 bg-white/50 rounded-full px-2 py-1">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all m-1 ${
                i === currentSlide ? "bg-black w-4 md:w-5" : "bg-gray-400"
              }`}
              onClick={() => setCurrentSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
