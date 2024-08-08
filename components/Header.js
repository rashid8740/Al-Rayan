"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import {
  ShoppingCart,
  User,
  ChevronDown,
  Settings,
  LogOut,
  Menu,
  Search,
  Phone,
  X,
  Home,
  ShoppingBag,
  Tag,
  Flame,
  Zap,
  Gift,
  AwardIcon,
} from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { usePathname } from "next/navigation";

const Header = () => {
  const { data: session } = useSession();
  const { cart } = useCart();
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const menuItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/shop", label: "Our Store", icon: ShoppingBag },
    {
      href: "#special-sale",
      label: "Special Sale",
      icon: Tag,
      badge: { text: "SALE", color: "bg-red-500 text-white" },
    },
    {
      href: "#hot-categories",
      label: "Hot Categories",
      icon: Flame,
      badge: { text: "HOT", color: "bg-orange-500 text-white" },
    },
    { href: "#top-deals", label: "Top Deals", icon: Zap },
    { href: "#top-offers", label: "Top Offers", icon: Gift },
  ];

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const AccountMenu = () => (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10">
      <Link
        href="/profile"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50"
      >
        <User size={16} className="inline mr-2" />
        Profile
      </Link>
      <Link
        href="/account/settings"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50"
      >
        <Settings size={16} className="inline mr-2" />
        Settings
      </Link>
      <button
        onClick={() => signOut()}
        className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50"
      >
        <LogOut size={16} className="inline mr-2" />
        Sign out
      </button>
    </div>
  );

  return (
    <header className="w-full sticky top-0 z-50">
      {/* Mobile header */}
      <div className="lg:hidden">
        <div className="flex justify-between items-center px-4 py-2 bg-white shadow-md">
          <Link
            href="/"
            className="text-xl font-bold text-orange-400 flex items-center"
          >
            <ShoppingCart size={24} className="mr-2" />
            Al-Rayaan
          </Link>
          <div className="flex items-center space-x-4">
            {session ? (
              <div className="relative">
                <button
                  onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                  className="text-gray-600"
                >
                  <User size={24} />
                </button>
                {isAccountMenuOpen && <AccountMenu />}
              </div>
            ) : (
              <Link href="/auth/signin">
                <User size={24} className="text-gray-600" />
              </Link>
            )}
            <Link href="/cart" className="relative">
              <ShoppingCart size={24} className="text-gray-600" />
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemsCount}
              </span>
            </Link>
          </div>
        </div>
        <div className="flex items-center px-4 py-2 bg-orange-500">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 rounded-full border-none focus:outline-none focus:ring-0 text-sm"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-500">
              <Search size={20} />
            </button>
          </div>
          <button
            onClick={() => setIsMenuOpen(true)}
            className="ml-4 text-white hover:text-orange-100"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Desktop header */}
      <div className="hidden lg:block bg-white">
        {/* Top bar */}
        <div className="w-full border-b border-gray-200">
          <div className="container mx-auto px-4 flex justify-between items-center py-2 text-xs">
            <nav className="flex space-x-4">
              <Link
                href="/about"
                className="text-gray-600 hover:text-orange-500"
              >
                About Us
              </Link>
              <Link
                href="/blogs"
                className="text-gray-600 hover:text-orange-500"
              >
                Blogs
              </Link>
              <Link
                href="/contact"
                className="text-gray-600 hover:text-orange-500"
              >
                Contact
              </Link>
              <Link
                href="/faqs"
                className="text-gray-600 hover:text-orange-500"
              >
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
              className="text-2xl font-bold text-orange-500 flex items-center"
            >
              <ShoppingCart size={24} className="mr-1" />
              Al-Rayaan
            </Link>

            {/* Search bar */}
            <div className="flex items-center flex-grow mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-0 bg-gray-50"
                />
                <button className="absolute right-0 top-0 mt-3 mr-5 text-gray-400 hover:text-orange-500">
                  <Search size={20} />
                </button>
              </div>
            </div>

            {/* Right side icons */}
            <div className="flex items-center justify-end space-x-6">
              <div className="flex items-center text-gray-600 border-r pr-6">
                <Phone size={20} className="mr-2 text-orange-500" />
                <div>
                  <div className="text-xs">Need Help?</div>
                  <div className="text-sm font-semibold">0790 577 973</div>
                </div>
              </div>
              <div className="flex items-center border-r pr-6">
                {session ? (
                  <div className="relative">
                    <button
                      onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                      className="flex items-center text-gray-600 hover:text-orange-500"
                    >
                      <User size={20} className="mr-2 text-orange-500" />
                      <div>
                        <div className="text-xs">Welcome</div>
                        <span className="text-sm font-semibold">
                          {session.user.name}
                        </span>
                      </div>
                      <ChevronDown size={16} className="ml-1" />
                    </button>
                    {isAccountMenuOpen && <AccountMenu />}
                  </div>
                ) : (
                  <Link
                    href="/auth/signin"
                    className="flex items-center text-gray-600 hover:text-orange-500"
                  >
                    <User size={20} className="mr-2 text-orange-500" />
                    <div>
                      <div className="text-xs">My Account</div>
                      <span className="text-sm font-semibold">Log in</span>
                    </div>
                  </Link>
                )}
              </div>
              <Link
                href="/cart"
                className="flex items-center text-gray-600 hover:text-orange-500"
              >
                <div className="relative mr-2">
                  <ShoppingCart size={24} className="text-orange-400" />
                  <span className="absolute -top-2 -right-2 bg-orange-400 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                </div>
                <div className="ml-2">
                  <div className="text-xs">My Cart</div>
                  <div className="text-sm font-bold ">
                    {cartTotal.toFixed(2)}
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="w-full border-t shadow-sm border-gray-200">
          <nav className="container mx-auto px-4 flex justify-between items-center py-3 text-gray-700">
            <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 flex items-center transition duration-300">
              <Menu size={20} className="mr-2" />
              Browse Categories
            </button>
            <div className="flex items-center space-x-6">
              {menuItems.slice(0, -1).map((item) =>
                item.href.startsWith("#") ? (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href)}
                    className="hover:text-orange-500 transition duration-300 flex items-center"
                  >
                    {item.label}
                    {item.badge && (
                      <span
                        className={`ml-2 ${item.badge.color} text-xs font-bold px-2 py-1 rounded-full shadow-md transform hover:scale-110 transition-transform duration-300 uppercase`}
                      >
                        {item.badge.text}
                      </span>
                    )}
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="hover:text-orange-500 transition duration-300 flex items-center"
                  >
                    {item.label}
                    {item.badge && (
                      <span
                        className={`ml-2 ${item.badge.color} text-xs font-bold px-2 py-1 rounded-full shadow-md transform hover:scale-110 transition-transform duration-300 uppercase`}
                      >
                        {item.badge.text}
                      </span>
                    )}
                  </Link>
                )
              )}
            </div>
            <Link
              href="#top-offers"
              onClick={(e) => scrollToSection(e, "#top-offers")}
              className="hover:text-orange-500 transition duration-300 flex items-center"
            >
              <span className="mr-1">
                <AwardIcon />
              </span>
              Top Offers
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
          <div className="flex justify-between items-center p-4 bg-orange-500 text-white">
            <Link
              href="/"
              className="text-xl font-bold text-white flex items-center"
            >
              <ShoppingCart size={24} className="mr-2" />
              Al-Rayaan
            </Link>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-white hover:text-orange-100"
            >
              <X size={24} />
            </button>
          </div>
          <div className="p-4 bg-orange-50 border-b border-orange-100">
            <p className="text-sm text-orange-800">Welcome to Al-Rayaan</p>
            <p className="text-xs text-orange-600 mt-1">
              Discover amazing deals and offers!
            </p>
          </div>
          <nav className="flex flex-col p-2">
            {menuItems.map((item) =>
              item.href.startsWith("#") ? (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={`flex items-center justify-between py-3 px-4 rounded-lg transition-colors duration-150 ${
                    pathname === item.href
                      ? "bg-orange-100 text-orange-600"
                      : "text-gray-700 hover:bg-orange-50"
                  }`}
                >
                  <div className="flex items-center">
                    <item.icon size={20} className="mr-3 text-orange-500" />
                    <span className="font-medium">{item.label}</span>
                    {item.badge && (
                      <span
                        className={`ml-2 ${item.badge.color} text-xs font-bold px-2 py-1 rounded-full uppercase`}
                      >
                        {item.badge.text}
                      </span>
                    )}
                  </div>
                  <ChevronDown size={16} className="text-gray-400" />
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between py-3 px-4 rounded-lg transition-colors duration-150 ${
                    pathname === item.href
                      ? "bg-orange-100 text-orange-600"
                      : "text-gray-700 hover:bg-orange-50"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <item.icon size={20} className="mr-3 text-orange-500" />
                    <span className="font-medium">{item.label}</span>
                    {item.badge && (
                      <span
                        className={`ml-2 ${item.badge.color} text-xs font-bold px-2 py-1 rounded-full uppercase`}
                      >
                        {item.badge.text}
                      </span>
                    )}
                  </div>
                  <ChevronDown size={16} className="text-gray-400" />
                </Link>
              )
            )}
          </nav>
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-50 border-t border-gray-200">
            {session ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-700">
                  <User size={20} className="mr-2 text-orange-500" />
                  <span>{session.user.name}</span>
                </div>
                <button
                  onClick={() => signOut()}
                  className="text-orange-600 hover:text-orange-700"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link
                href="/auth/signin"
                className="flex items-center text-gray-700 hover:text-orange-500"
                onClick={() => setIsMenuOpen(false)}
              >
                <User size={20} className="mr-2 text-orange-500" />
                <span>Sign In</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
