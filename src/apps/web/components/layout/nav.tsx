"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
//import Announcement from "../announcement";

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/browse-jobs", label: "Browse Jobs" },
    { href: "/support", label: "Support" },
    { href: "/about-us", label: "About Us" },
    // { href: "/saved", label: "Saved" },
    // { href: "/applications", label: "Applications" },
    // { href: "/recommended", label: "Recommended" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md shadow-lg`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-12 h-12  flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <Image
                src="/logo.png"
                alt="JOBIFY"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              JOBIFY
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 text-lg font-medium rounded-lg transition-all duration-300 group hover:bg-primary ${
                  pathname === item.href
                    ? "text-white bg-primary"
                    : "text-gray-600 hover:text-white"
                }`}
              >
                <span className="relative z-10">{item.label}</span>
                <span className="absolute inset-0 rounded-lg transition-all duration-300 "></span>
              </Link>
            ))}
          </nav>

          {/* TEST PHẦN THÔNG BÁO */}
          {/* {isSignedIn ? (
            <>
              <Announcement />
            </>
          ) : (
            <>
              <div className="hidden md:flex items-center space-x-6">
                <div className="flex items-center space-x-4">
                  <Link
                    href="/sign-up-with-role"
                    className="px-6 py-2 text-primary border-2 border-primary rounded-lg font-medium transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/30 transform hover:-translate-y-0.5"
                  >
                    Sign up
                  </Link>
                  <Link
                    href="/sign-in"
                    onClick={() => setIsSignedIn}
                    className="px-6 py-2 bg-primary border-2 border-primary text-white rounded-lg font-medium transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 transform hover:-translate-y-0.5"
                  >
                    Sign in
                  </Link>
                </div>
              </div>
            </>
          )} */}

          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <Link
                href="/sign-up-with-role"
                className="px-6 py-2 text-primary border-2 border-primary rounded-lg font-medium transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/30 transform hover:-translate-y-0.5"
              >
                Sign up
              </Link>
              <Link
                href="/sign-in"
                className="px-6 py-2 bg-primary border-2 border-primary text-white rounded-lg font-medium transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 transform hover:-translate-y-0.5"
              >
                Sign in
              </Link>
            </div>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-white hover:bg-primary rounded-lg transition-all duration-300"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-3 text-lg font-medium rounded-lg transition-all duration-300 ${
                    pathname === item.href
                      ? "text-white bg-primary"
                      : "text-gray-600 hover:text-white"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              {/* TEST PHẦN THÔNG BÁO */}
              {/* {isSignedIn ? (
                <>
                  <Announcement />
                </>
              ) : (
                <>
                  <div className="pt-4 space-y-2">
                    <Link
                      href="/sign-up-with-role"
                      className="block w-full px-4 py-3 text-center text-primary border-2 border-primary rounded-lg font-medium transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/30"
                    >
                      Sign up
                    </Link>
                    <Link
                      href="/sign-in"
                      className="block w-full px-4 py-3 text-center bg-primary border-2 border-primary text-white rounded-lg font-medium transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30"
                    >
                      Sign in
                    </Link>
                  </div>
                </>
              )} */}

              <div className="pt-4 space-y-2">
                <Link
                  href="/sign-up-with-role"
                  className="block w-full px-4 py-3 text-center text-primary border-2 border-primary rounded-lg font-medium transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/30"
                >
                  Sign up
                </Link>
                <Link
                  href="/sign-in"
                  className="block w-full px-4 py-3 text-center bg-primary border-2 border-primary text-white rounded-lg font-medium transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30"
                >
                  Sign in
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
