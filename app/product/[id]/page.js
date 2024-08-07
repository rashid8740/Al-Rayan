"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Star,
  ShoppingCart,
  Plus,
  Minus,
  ChevronRight,
  Check,
  Heart,
} from "lucide-react";

// Mock data for products (replace with actual data from your shop page)
const products = [
  {
    id: 1,
    name: "Galaxy Notebook Pro",
    price: 139999,
    image:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
  {
    id: 2,
    name: "iPhone 13 Pro",
    price: 109999,
    image:
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1167&q=80",
  },
  {
    id: 3,
    name: "Wireless Earbuds",
    price: 15999,
    image: "/earbuds.png",
  },
  {
    id: 4,
    name: "Smart Watch Series",
    price: 39999,
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
  },
  {
    id: 5,
    name: "4K Ultra HD Smart TV",
    price: 79999,
    image:
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
  {
    id: 6,
    name: "Noise-Cancelling Headphones",
    price: 29999,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  },
];

// Mock data for a single product (replace with actual data fetching in a real application)
const product = {
  id: 1,
  name: "Galaxy Notebook Pro",
  price: 139999,
  originalPrice: 159999,
  category: 1,
  images: [
    "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
    "https://images.unsplash.com/photo-1602080858428-57174f9431cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2051&q=80",
  ],
  rating: 4.4,
  reviews: 1500,
  specs: {
    brand: "Samsung",
    processor: "Intel i7",
    ram: "16GB",
    storage: "512GB SSD",
    display: "15.6-inch 4K AMOLED",
    battery: "Up to 12 hours",
    weight: "1.3 kg",
  },
  description:
    "Experience unparalleled performance with the Galaxy Notebook Pro. Featuring a stunning 4K AMOLED display, powerful Intel i7 processor, and all-day battery life, this laptop is perfect for both work and play. Its sleek design and lightweight build make it the ideal companion for on-the-go professionals and creative enthusiasts alike.",
  variations: [
    { name: "Color", options: ["Silver", "Space Gray", "Midnight Blue"] },
    { name: "RAM", options: ["8GB", "16GB", "32GB"] },
    { name: "Storage", options: ["256GB", "512GB", "1TB"] },
  ],
};

export default function ProductPage() {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariations, setSelectedVariations] = useState({});
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const { addToCart } = useCart();
  const [suggestedProducts, setSuggestedProducts] = useState([]);

  useEffect(() => {
    // Initialize selected variations
    const initialVariations = {};
    product.variations.forEach((variation) => {
      initialVariations[variation.name] = variation.options[0];
    });
    setSelectedVariations(initialVariations);

    // Randomly select 4 products for the "You May Also Like" section
    const shuffled = products.sort(() => 0.5 - Math.random());
    setSuggestedProducts(shuffled.slice(0, 4));
  }, []);

  const handleAddToCart = () => {
    const productToAdd = {
      ...product,
      quantity,
      selectedVariations,
    };
    addToCart(productToAdd);
  };

  const handleVariationChange = (variationName, option) => {
    setSelectedVariations((prev) => ({
      ...prev,
      [variationName]: option,
    }));
  };

  const handleImageHover = (e) => {
    if (isZoomed) {
      const { left, top, width, height } =
        e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      setZoomPosition({ x, y });
    }
  };

  const formatPrice = (price) => {
    return `KSH ${(price / 100).toLocaleString()}`;
  };

  const calculateDiscount = (originalPrice, currentPrice) => {
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link href="/" className="text-gray-600 hover:text-orange-500">
                Home
              </Link>
            </li>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <li className="inline-flex items-center">
              <Link
                href="/shop"
                className="text-gray-600 hover:text-orange-500"
              >
                Shop
              </Link>
            </li>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <li>
              <span className="text-gray-500">{product.name}</span>
            </li>
          </ol>
        </nav>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            {/* Product Images */}
            <div className="md:w-1/2 p-4">
              <div
                className="relative h-[500px] overflow-hidden rounded-lg cursor-zoom-in bg-gray-100"
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onMouseMove={handleImageHover}
              >
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className={`rounded-lg transition-transform duration-200 ${
                    isZoomed ? "scale-150" : ""
                  }`}
                  style={
                    isZoomed
                      ? {
                          transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                        }
                      : {}
                  }
                />
              </div>
              <div className="mt-4 grid grid-cols-4 gap-4">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-24 rounded-md overflow-hidden ${
                      selectedImage === index
                        ? "ring-2 ring-orange-500"
                        : "border border-gray-200"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="md:w-1/2 p-6 md:p-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                {product.name}
              </h1>
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  {product.rating} ({product.reviews.toLocaleString()} reviews)
                </span>
              </div>
              <div className="mb-6">
                <span className="text-3xl font-bold text-gray-900">
                  {formatPrice(product.price)}
                </span>
                <span className="ml-2 text-lg text-gray-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="ml-2 text-sm font-semibold text-green-600">
                  Save {calculateDiscount(product.originalPrice, product.price)}
                  %
                </span>
              </div>
              <p className="text-gray-600 mb-6">{product.description}</p>

              {/* Product Variations */}
              {product.variations.map((variation) => (
                <div key={variation.name} className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    {variation.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {variation.options.map((option) => (
                      <button
                        key={option}
                        onClick={() =>
                          handleVariationChange(variation.name, option)
                        }
                        className={`px-4 py-2 border rounded-md ${
                          selectedVariations[variation.name] === option
                            ? "border-orange-500 text-orange-500 bg-orange-50"
                            : "border-gray-300 text-gray-700 hover:border-orange-500 hover:text-orange-500"
                        } transition-colors duration-200`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <div className="flex items-center mb-4">
                <div className="w-1/3 flex items-center border border-gray-300 rounded-l-md h-12 mr-2 rounded-sm">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-gray-600 hover:text-orange-500 h-full"
                  >
                    <Minus size={16} />
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="1"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, parseInt(e.target.value)))
                    }
                    className="w-full text-center border-none focus:ring-0 h-full"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-gray-600 hover:text-orange-500 h-full"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="w-2/3 bg-orange-500 text-white h-12 px-6 rounded-r-md hover:bg-orange-600 transition duration-300 flex items-center justify-center"
                >
                  <ShoppingCart size={20} className="mr-2" />
                  Add to Cart
                </button>
              </div>

              <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition duration-300 flex items-center justify-center mb-6">
                <Heart size={20} className="mr-2" />
                Add to Wishlist
              </button>

              {/* Product Specifications */}
              <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Key Specifications
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="flex items-start">
                      <Check size={16} className="text-green-500 mr-2 mt-1" />
                      <div>
                        <span className="text-gray-600 font-medium">
                          {key}:
                        </span>
                        <span className="text-gray-800 ml-1">{value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Suggested Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {suggestedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden transition-transform duration-300 hover:shadow-md hover:-translate-y-1"
              >
                <div className="relative h-48">
                  <Image
                    src={product.image}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-900 font-bold mb-3">
                    {formatPrice(product.price)}
                  </p>
                  <Link
                    href={`/product/${product.id}`}
                    className="block w-full bg-orange-100 text-orange-500 text-center py-2 px-4 rounded-md hover:bg-orange-200 transition duration-300"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
