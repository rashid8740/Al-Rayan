"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";
import { Star, ShoppingCart, Plus, Minus } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Galaxy Notebook Pro",
    price: 139999,
    originalPrice: 159999,
    image:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    rating: 4.4,
    reviews: 1500,
  },
  {
    id: 2,
    name: "iPhone 13 Pro",
    price: 109999,
    originalPrice: 119999,
    image:
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1167&q=80",
    rating: 4.8,
    reviews: 2500,
  },
  {
    id: 3,
    name: "Wireless Earbuds",
    price: 15999,
    originalPrice: 19999,
    image: "/earbuds.png",
    rating: 4.2,
    reviews: 800,
  },
  {
    id: 4,
    name: "Smart Watch Series",
    price: 39999,
    originalPrice: 44999,
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
    rating: 4.6,
    reviews: 1800,
  },
  {
    id: 5,
    name: "4K Ultra HD Smart TV",
    price: 79999,
    originalPrice: 89999,
    image:
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    rating: 4.5,
    reviews: 1200,
  },
  {
    id: 6,
    name: "Noise-Cancelling Headphones",
    price: 29999,
    originalPrice: 34999,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    rating: 4.7,
    reviews: 2200,
  },
];

const FeaturedProducts = () => {
  const { addToCart, removeFromCart, cart } = useCart();
  const [hoveredProduct, setHoveredProduct] = useState(null);

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
    return `KSH ${price.toLocaleString()}`;
  };

  const getCartQuantity = (productId) => {
    const item = cart.find((item) => item.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <section className="py-6 sm:py-8 md:py-1">
      <div className="container mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-gray-800">
          Featured Products
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
          {products.map((product, index) => {
            const quantity = getCartQuantity(product.id);
            const hiddenClass = index === 5 ? "lg:hidden" : "";
            return (
              <div
                key={product.id}
                className={`bg-white rounded-lg shadow-sm border overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 ${hiddenClass}`}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
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
    </section>
  );
};

export default FeaturedProducts;
