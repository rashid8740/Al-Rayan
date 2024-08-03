"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  Search,
  ShoppingCart,
  User,
  Phone,
  X,
  ChevronRight,
  Home,
  ShoppingBag,
  Gift,
  LayoutGrid,
  Zap,
  Layers,
  Award,
} from "lucide-react";
import { useCart } from "../contexts/CartContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useCart();
  const pathname = usePathname();

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const menuItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/shop", label: "Our Store", icon: ShoppingBag },
    {
      href: "/special",
      label: "Special",
      icon: Gift,
      badge: { text: "SALE", color: "bg-green-500" },
    },
    {
      href: "/categories",
      label: "Categories",
      icon: LayoutGrid,
      badge: { text: "HOT", color: "bg-red-500" },
    },
    { href: "/top-deals", label: "Top Deals", icon: Zap },
    { href: "/elements", label: "Elements", icon: Layers },
    { href: "/top-offers", label: "Top Offers", icon: Award },
  ];

  return (
    <header className="w-full sticky top-0 z-50">
      {/* Mobile header */}
      <div className="lg:hidden">
        <div className="flex justify-between items-center px-4 py-2 bg-white shadow-md">
          <Link
            href="/"
            className="text-xl font-bold text-blue-600 flex items-center"
          >
            <ShoppingCart size={24} className="mr-2" />
            Al-Rayaan
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/account">
              <User size={24} className="text-gray-600" />
            </Link>
            <Link href="/cart" className="relative">
              <ShoppingCart size={24} className="text-gray-600" />
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemsCount}
              </span>
            </Link>
          </div>
        </div>
        <div className="flex items-center px-4 py-2 bg-blue-600">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500">
              <Search size={20} />
            </button>
          </div>
          <button
            onClick={() => setIsMenuOpen(true)}
            className="ml-4 text-white hover:text-blue-200"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Desktop header */}
      <div className="hidden lg:block bg-white">
        {/* Top bar */}
        <div className="w-full border-b">
          <div className="container mx-auto px-4 flex justify-between items-center py-2 text-xs">
            <nav className="flex space-x-4">
              <Link href="/about" className="text-gray-600 hover:text-blue-600">
                About Us
              </Link>
              <Link href="/blogs" className="text-gray-600 hover:text-blue-600">
                Blogs
              </Link>
              <Link
                href="/contact"
                className="text-gray-600 hover:text-blue-600"
              >
                Contact
              </Link>
              <Link href="/faqs" className="text-gray-600 hover:text-blue-600">
                FAQs
              </Link>
            </nav>
            <div className="text-gray-600 flex-grow text-center">
              Save up to 20% on all Laptops & Accessories with "ALRAYAAN" code
            </div>
            <div className="flex items-center space-x-2">
              <select className="bg-transparent text-gray-600 text-xs pr-4">
                <option>United States (USD $)</option>
              </select>
              <select className="bg-transparent text-gray-600 text-xs">
                <option>English</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main header */}
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <Link
              href="/"
              className="text-2xl font-bold text-blue-600 flex items-center"
            >
              <ShoppingCart size={24} className="mr-1" />
              Al-Rayaan.
            </Link>

            {/* Search bar */}
            <div className="flex items-center flex-grow mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-gray-100"
                />
                <button className="absolute right-0 top-0 mt-2 mr-2 text-gray-600 hover:text-blue-600">
                  <Search size={20} />
                </button>
              </div>
            </div>

            {/* Right side icons */}
            <div className="flex items-center justify-end space-x-6">
              <div className="flex items-center text-gray-600 border-r pr-6">
                <Phone size={20} className="mr-2" />
                <div>
                  <div className="text-xs">Need Help?</div>
                  <div className="text-sm font-semibold">+01 123 456 7890</div>
                </div>
              </div>
              <div className="flex items-center border-r pr-6">
                <User size={20} className="mr-2 text-gray-600" />
                <div>
                  <div className="text-xs">My Account</div>
                  <Link
                    href="/account"
                    className="text-sm font-semibold hover:text-blue-600"
                  >
                    Log in
                  </Link>
                </div>
              </div>
              <Link
                href="/cart"
                className="flex items-center text-gray-600 hover:text-blue-600"
              >
                <div className="relative mr-2">
                  <ShoppingCart size={24} />
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                </div>
                <div className="ml-2">
                  <div className="text-xs">My Cart</div>
                  <div className="text-sm font-semibold">
                    ${cartTotal.toFixed(2)}
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="w-full bg-blue-600">
          <nav className="container mx-auto px-4 flex justify-between items-center py-3 text-white">
            <button className="bg-blue-700 px-4 py-2 rounded-md hover:bg-blue-800 flex items-center">
              <Menu size={20} className="mr-2" />
              Browse Categories
            </button>
            <div className="flex items-center space-x-6">
              <Link href="/" className="hover:text-gray-200">
                Home
              </Link>
              <Link href="/shop" className="hover:text-gray-200">
                Our Store
              </Link>
              <Link
                href="/special"
                className="hover:text-gray-200 flex items-center"
              >
                Special{" "}
                <span className="ml-1 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded">
                  SALE
                </span>
              </Link>
              <Link
                href="/categories"
                className="hover:text-gray-200 flex items-center"
              >
                Categories{" "}
                <span className="ml-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded">
                  HOT
                </span>
              </Link>
              <Link href="/top-deals" className="hover:text-gray-200">
                Top Deals
              </Link>
              <Link href="/elements" className="hover:text-gray-200">
                Elements
              </Link>
            </div>
            <Link
              href="/top-offers"
              className="hover:text-gray-200 flex items-center"
            >
              <span className="mr-1">⚙️</span> Top Offers
            </Link>
          </nav>
        </div>
      </div>

      {/* Enhanced Mobile menu (slide in from left) */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`fixed inset-y-0 left-0 w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center p-4 bg-blue-600 text-white">
            <Link
              href="/"
              className="text-xl font-bold text-white flex items-center"
            >
              <ShoppingCart size={24} className="mr-2" />
              Al-Rayaan
            </Link>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-white hover:text-blue-200"
            >
              <X size={24} />
            </button>
          </div>
          <div className="p-4 bg-blue-50 border-b border-blue-100">
            <p className="text-sm text-blue-800">Welcome to Al-Rayaan</p>
            <p className="text-xs text-blue-600 mt-1">
              Discover amazing deals and offers!
            </p>
          </div>
          <nav className="flex flex-col p-2">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between py-3 px-4 rounded-lg transition-colors duration-150 ${
                  pathname === item.href
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center">
                  <item.icon size={20} className="mr-3" />
                  <span className="font-medium">{item.label}</span>
                  {item.badge && (
                    <span
                      className={`ml-2 px-1.5 py-0.5 text-xs font-semibold text-white rounded ${item.badge.color}`}
                    >
                      {item.badge.text}
                    </span>
                  )}
                </div>
                <ChevronRight size={16} className="text-gray-400" />
              </Link>
            ))}
          </nav>
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-50 border-t border-gray-200">
            <Link
              href="/account"
              className="flex items-center text-gray-700 hover:text-blue-600"
            >
              <User size={20} className="mr-2" />
              <span>My Account</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
