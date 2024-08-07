"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Star, ShoppingCart, Plus, Minus } from "lucide-react";

const categories = [
  { id: null, name: "All Products" },
  { id: 1, name: "Laptops" },
  { id: 2, name: "Smartphones" },
  { id: 3, name: "Accessories" },
  { id: 4, name: "Smartwatches" },
];

const products = [
  {
    id: 1,
    name: "Galaxy Notebook Pro",
    price: 139999,
    originalPrice: 159999,
    category: 1,
    image:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    rating: 4.4,
    reviews: 1500,
    specs: {
      brand: "Samsung",
      processor: "Intel i7",
      ram: "16GB",
      storage: "512GB SSD",
    },
  },
  {
    id: 2,
    name: "iPhone 13 Pro",
    price: 109999,
    originalPrice: 119999,
    category: 2,
    image:
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1167&q=80",
    rating: 4.8,
    reviews: 2500,
    specs: {
      brand: "Apple",
      storage: "256GB",
      camera: "12MP",
    },
  },
  {
    id: 3,
    name: "Wireless Earbuds",
    price: 15999,
    originalPrice: 19999,
    category: 3,
    image: "/earbuds.png",
    rating: 4.2,
    reviews: 800,
    specs: {
      brand: "Sony",
      batteryLife: "24 hours",
      waterResistance: "IPX4",
    },
  },
  {
    id: 4,
    name: "Smart Watch Series",
    price: 39999,
    originalPrice: 44999,
    category: 4,
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
    rating: 4.6,
    reviews: 1800,
    specs: {
      brand: "Apple",
      displaySize: "1.9 inch",
      batteryLife: "18 hours",
    },
  },
  {
    id: 5,
    name: "4K Ultra HD Smart TV",
    price: 79999,
    originalPrice: 89999,
    category: 3,
    image:
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    rating: 4.5,
    reviews: 1200,
    specs: {
      brand: "Samsung",
      screenSize: "55 inch",
      resolution: "4K",
    },
  },
  {
    id: 6,
    name: "Noise-Cancelling Headphones",
    price: 29999,
    originalPrice: 34999,
    category: 3,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    rating: 4.7,
    reviews: 2200,
    specs: {
      brand: "Bose",
      batteryLife: "20 hours",
      noiseReduction: "Active",
    },
  },
];
export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { addToCart, removeFromCart, cart } = useCart();
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  const renderRating = (rating, reviews) => {
    return (
      <div className="flex items-center text-xs">
        <span className="text-orange-500 font-semibold mr-1">{rating}</span>
        <Star className="w-3 h-3 text-orange-500 fill-current" />
        <span className="text-gray-400 ml-1">({reviews.toLocaleString()})</span>
      </div>
    );
  };

  const calculateDiscount = (originalPrice, currentPrice) => {
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  };

  const formatPrice = (price) => {
    return `KSH ${(price / 100).toLocaleString()}`;
  };

  const getCartQuantity = (productId) => {
    const item = cart.find((item) => item.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 mt-6 text-gray-800">
            Our Products
          </h1>

          {/* Category Tabs */}
          <div className="mb-8 border-b border-gray-200 overflow-x-auto">
            <div className="flex space-x-8 pb-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`pb-2 text-sm font-medium transition-colors relative whitespace-nowrap
                    ${
                      selectedCategory === category.id
                        ? "text-orange-500"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                  {category.name}
                  {selectedCategory === category.id && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500"></span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
            {filteredProducts.map((product) => {
              const quantity = getCartQuantity(product.id);
              return (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-sm border overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  <Link href={`/product/${product.id}`}>
                    <div className="relative pt-[75%]">
                      <div
                        className="absolute inset-0 flex items-center justify-center"
                        style={{ top: "-10%" }}
                      >
                        <div className="relative w-3/4 h-3/4">
                          <Image
                            src={product.image}
                            alt={product.name}
                            layout="fill"
                            objectFit="contain"
                            className="transition-transform duration-300 hover:scale-105"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="p-2 sm:p-3">
                      <h3 className="text-sm font-medium mb-1 text-gray-800 line-clamp-2 h-10">
                        {product.name}
                      </h3>
                      {renderRating(product.rating, product.reviews)}
                      <div className="mt-1 space-y-1">
                        <div className="flex justify-between items-center">
                          <p className="text-base font-bold text-gray-900">
                            {formatPrice(product.price)}
                          </p>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-500 line-through mr-2">
                            {formatPrice(product.originalPrice)}
                          </span>
                          <span className="text-green-600 font-semibold">
                            -
                            {calculateDiscount(
                              product.originalPrice,
                              product.price
                            )}
                            %
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div className="p-2 sm:p-3">
                    <div className="mt-2 flex items-center justify-between">
                      {quantity === 0 ? (
                        <button
                          onClick={() => addToCart(product)}
                          className="w-full flex items-center justify-center text-orange-500 hover:text-orange-600 transition-colors duration-300"
                        >
                          <ShoppingCart size={16} className="mr-1" />
                          <span className="text-sm font-medium">Add</span>
                        </button>
                      ) : (
                        <div className="w-full flex items-center justify-between bg-orange-100 rounded-full px-2 py-1">
                          <button
                            onClick={() => removeFromCart(product.id)}
                            className="text-orange-500 hover:text-orange-600 transition-colors duration-300"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="text-sm font-medium text-gray-700">
                            {quantity}
                          </span>
                          <button
                            onClick={() => addToCart(product)}
                            className="text-orange-500 hover:text-orange-600 transition-colors duration-300"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
