"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Minus, Plus, X, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      alert("Checkout complete! Thank you for your purchase.");
      setIsCheckingOut(false);
    }, 2000);
  };

  const formatPrice = (price) => {
    return `KSH ${price.toLocaleString()}`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 mt-2 ">
        <h1 className="text-lg md:text-3xl font-bold mb-4 text-gray-800">
          Your Cart
        </h1>
        {cart.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8 text-center">
            <ShoppingCart size={48} className="mx-auto mb-4 text-orange-500" />
            <p className="text-lg md:text-xl text-gray-600 mb-6">
              Your cart is empty.
            </p>
            <Link
              href="/shop"
              className="inline-block bg-orange-500 text-white px-5 py-2 rounded-full font-semibold hover:bg-orange-600 transition duration-300"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            <div className="lg:w-2/3">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-sm p-4 mb-3 flex items-center"
                >
                  <div className="relative w-16 h-16 md:w-24 md:h-24 mr-3 md:mr-6 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      layout="fill"
                      objectFit="contain"
                      className="rounded-md"
                    />
                  </div>
                  <div className="flex-grow min-w-0 flex flex-col md:flex-row md:items-center md:justify-between w-full">
                    <div className="md:w-1/3">
                      <h3 className="text-sm md:text-base font-semibold mb-1 md:mb-0 truncate">
                        {item.name}
                      </h3>
                      <p className="text-orange-600 font-medium text-sm md:text-base mb-1 md:mb-0">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                    <div className="flex items-center md:w-1/3 md:justify-center">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                        className="text-gray-500 hover:text-orange-500 transition-colors"
                      >
                        <Minus size={16} className="md:w-5 md:h-5" />
                      </button>
                      <span className="mx-2 w-6 md:w-8 text-center text-sm md:text-base font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="text-gray-500 hover:text-orange-500 transition-colors"
                      >
                        <Plus size={16} className="md:w-5 md:h-5" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-2 md:mt-0 md:w-1/3 md:justify-end">
                      <p className="text-sm md:text-base font-semibold text-gray-800 md:mr-4">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <X size={16} className="md:w-5 md:h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-md p-5">
                <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">
                  Order Summary
                </h2>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>
                </div>
                <div className="flex justify-between items-center mb-4 pt-3 border-t border-gray-200">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-xl font-bold text-orange-600">
                    {formatPrice(total)}
                  </span>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className={`w-full bg-orange-500 text-white py-2 rounded-full font-semibold ${
                    isCheckingOut
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-orange-600"
                  } transition duration-300`}
                >
                  {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
