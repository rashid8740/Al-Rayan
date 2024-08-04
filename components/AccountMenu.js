"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { User, Settings, LogOut } from "lucide-react";

const AccountMenu = () => {
  return (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10">
      <Link
        href="/profile"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        <User size={16} className="inline mr-2" />
        Profile
      </Link>
      <Link
        href="/account/settings"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        <Settings size={16} className="inline mr-2" />
        Settings
      </Link>
      <button
        onClick={() => signOut()}
        className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        <LogOut size={16} className="inline mr-2" />
        Sign out
      </button>
    </div>
  );
};

export default AccountMenu;
