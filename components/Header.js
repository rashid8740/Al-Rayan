"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Search, ShoppingCart, User } from "lucide-react";
import { useCart } from "../contexts/CartContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const { cart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header
      className={`bg-white shadow-md fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isSticky ? "py-2" : "py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div
              className={`font-bold text-[#005F73] transition-all duration-300 ${
                isSticky ? "text-xl md:text-2xl" : "text-2xl md:text-3xl"
              }`}
            >
              Al-Rayaan
            </div>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link
              href="/"
              className="text-[#005F73] hover:text-[#0A9396] transition duration-300"
            >
              Home
            </Link>
            <Link
              href="/shop"
              className="text-[#005F73] hover:text-[#0A9396] transition duration-300"
            >
              Shop
            </Link>
            <Link
              href="/about"
              className="text-[#005F73] hover:text-[#0A9396] transition duration-300"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-[#005F73] hover:text-[#0A9396] transition duration-300"
            >
              Contact
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <button className="text-[#005F73] hover:text-[#0A9396] transition duration-300">
              <Search size={isSticky ? 18 : 20} />
            </button>
            <button className="text-[#005F73] hover:text-[#0A9396] transition duration-300">
              <User size={isSticky ? 18 : 20} />
            </button>
            <Link
              href="/cart"
              className="relative text-[#005F73] hover:text-[#0A9396] transition duration-300"
            >
              <ShoppingCart size={isSticky ? 18 : 20} />
              <span
                className={`absolute -top-2 -right-2 bg-[#EE6C4D] text-white rounded-full flex items-center justify-center transition-all duration-300 ${
                  isSticky ? "text-[10px] w-3 h-3" : "text-xs w-4 h-4"
                }`}
              >
                {cartItemsCount}
              </span>
            </Link>
            <button
              className="md:hidden text-[#005F73] hover:text-[#0A9396] transition duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X size={isSticky ? 22 : 24} />
              ) : (
                <Menu size={isSticky ? 22 : 24} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <nav className="md:hidden py-4 border-t border-[#94D2BD]">
          <div className="container mx-auto px-4">
            <Link
              href="/"
              className="block py-2 text-[#005F73] hover:text-[#0A9396] transition duration-300"
            >
              Home
            </Link>
            <Link
              href="/shop"
              className="block py-2 text-[#005F73] hover:text-[#0A9396] transition duration-300"
            >
              Shop
            </Link>
            <Link
              href="/about"
              className="block py-2 text-[#005F73] hover:text-[#0A9396] transition duration-300"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block py-2 text-[#005F73] hover:text-[#0A9396] transition duration-300"
            >
              Contact
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
