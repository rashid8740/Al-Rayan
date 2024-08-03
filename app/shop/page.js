"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Mock data for categories and products (same as before)
const categories = [
  { id: 1, name: "Laptops" },
  { id: 2, name: "Smartphones" },
  { id: 3, name: "Accessories" },
  { id: 4, name: "Smartwatches" },
];

const products = [
  {
    id: 1,
    name: "Galaxy Notebook Pro",
    price: 1299,
    category: 1,
    image:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
  {
    id: 2,
    name: "iPhone 13 Pro",
    price: 999,
    category: 2,
    image:
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1167&q=80",
  },
  {
    id: 3,
    name: "Wireless Earbuds",
    price: 159,
    category: 3,
    image:
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1178&q=80",
  },
  {
    id: 4,
    name: "Smart Watch Series",
    price: 399,
    category: 4,
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
  },
];

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { addToCart } = useCart();

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow ">
        {" "}
        {/* Adjusted padding-top */}
        <div className="bg-gray-100 py-4 md:py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-8 text-center text-gray-800">
              Our Products
            </h1>
            <div className="flex flex-col md:flex-row">
              <aside className="md:w-1/4 mb-4 md:mb-0">
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-4 text-gray-800">
                    Categories
                  </h2>
                  <div className="flex flex-wrap md:flex-col">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`mr-2 mb-2 md:mr-0 py-1 px-3 rounded text-sm transition-colors ${
                        !selectedCategory
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                    >
                      All
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`mr-2 mb-2 md:mr-0 py-1 px-3 rounded text-sm transition-colors ${
                          selectedCategory === category.id
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 hover:bg-gray-300"
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
              </aside>

              <div className="md:w-3/4 md:pl-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white rounded-lg shadow-md overflow-hidden"
                    >
                      <div className="relative h-32 md:h-48">
                        <Image
                          src={product.image}
                          alt={product.name}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                      <div className="p-2 md:p-4">
                        <h3 className="text-sm md:text-lg font-semibold mb-1 md:mb-2 truncate">
                          {product.name}
                        </h3>
                        <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-4">
                          ${product.price}
                        </p>
                        <button
                          onClick={() => addToCart(product)}
                          className="w-full bg-blue-500 text-white px-2 py-1 md:px-4 md:py-2 rounded text-xs md:text-sm hover:bg-blue-600 transition duration-300"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
