"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { Bell } from "lucide-react";
import SystemAnnouncement from "../systemAnnouncement";
//import Announcement from "../announcement";

export default function NavBar() {
  const [visible, setVisible] = useState(false);
  const popupRef = useRef(null);
  const buttonRef = useRef(null);

  // Tắt popup khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setVisible(false);
      }
    }

    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const [user, setUser] = useState<{
    role: "candidate" | "hr" | "moderator";
  } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Invalid user date in localStorage");
      }
    }
  }, []);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const guestItems = [
    { href: "/", label: "Home" },
    { href: "/browse-jobs", label: "Browse Jobs" },
    { href: "/support", label: "Support" },
    { href: "/about-us", label: "About Us" },
  ];

  const candidateItems = [
    { href: "/browse-jobs", label: "Browse Jobs" },
    { href: "/saved-jobs", label: "Saved" },
    { href: "/applications", label: "Applications" },
    { href: "/recommended", label: "Recommended" },
    { href: "/support", label: "Support" },
    { href: "/about-us", label: "About Us" },
  ];

  const hrItems = [
    { href: "/recruiter/dashboard", label: "Dashboard" },
    { href: "/support", label: "Support" },
    { href: "/about-us", label: "About Us" },
  ];

  const moderatorItems = [
    { href: "/operator/jobs-pending", label: "Approvals" },
    { href: "/operator/reports", label: "Reports" },
    { href: "/operator/system-settings", label: "Settings" },
    { href: "/operator/logs", label: "Logs" },
  ];

  let navItems = guestItems;

  if (user?.role === "candidate") {
    navItems = candidateItems;
  } else if (user?.role === "hr") {
    navItems = hrItems;
  } else if (user?.role === "moderator") {
    navItems = moderatorItems;
  }

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
                    ? "text-neutral-light bg-primary"
                    : "text-primary hover:text-neutral-light"
                }`}
              >
                <span className="relative z-10">{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-6 relative">
            {user ? (
              <>
                <div className="hidden md:flex items-center space-x-6">
                  <button
                    ref={buttonRef}
                    onClick={() => setVisible(!visible)}
                    className="relative cursor-pointer px-4 py-2 text-primary border-2 border-primary rounded-3xl font-medium transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/30 transform hover:-translate-y-0.5"
                  >
                    <Bell size={35} />
                  </button>
                  <div>
                    <div
                      ref={popupRef}
                      className={`absolute right-0 mt-10 w-150 h-screen rounded-3xl shadow-xl bg-neutral-light-40 transition-all duration-300  ${
                        visible ? "opacity-100 visible" : "opacity-0 invisible"
                      }`}
                    >
                      <SystemAnnouncement />
                    </div>
                  </div>
                  <div className="flex items-center py-2 px-4 bg-primary rounded-full">
                    <Link
                      href="/profile"
                      className="block w-full px-4 py-1 text-center text-2xl bg-primary text-background rounded-lg font-medium"
                    >
                      Profile
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/sign-up-with-role"
                  className="px-6 py-2 text-primary border-2 border-primary rounded-lg font-medium transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/30 transform hover:-translate-y-0.5"
                >
                  Sign up
                </Link>
                <Link
                  href="/sign-in"
                  className="px-6 py-2 bg-primary border-2 border-primary text-background rounded-lg font-medium transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 transform hover:-translate-y-0.5"
                >
                  Sign in
                </Link>
              </>
            )}
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
                      ? "text-neutral-light bg-primary"
                      : "text-primary hover:text-neutral-light hover:bg-primary"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              {user ? (
                <div className="flex flex-col gap-4 space-x-6">
                  <button
                    ref={buttonRef}
                    onClick={() => setVisible(!visible)}
                    className="relative cursor-pointer px-4 py-2 text-primary rounded-3xl font-medium transition-all duration-300 hover:bg-primary hover:text-background hover:shadow-lg hover:shadow-primary/30 transform hover:-translate-y-0.5"
                  >
                    <Bell size={35} />
                  </button>
                  <div>
                    <div
                      ref={popupRef}
                      className={`absolute right-0 mt-10 w-1/2 rounded-3xl shadow-xl bg-neutral-light-40 transition-all duration-300  ${
                        visible ? "opacity-100 visible" : "opacity-0 invisible"
                      }`}
                    >
                      <SystemAnnouncement />
                    </div>
                  </div>
                  <div className="flex items-center py-2 px-4 bg-primary rounded-full">
                    <Link
                      href="/profile"
                      className="block w-full px-4 py-1 text-center text-2xl bg-primary text-background rounded-lg font-medium"
                    >
                      Profile
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="pt-4 space-y-2">
                  <Link
                    href="/sign-up-with-role"
                    className="block w-full px-4 py-3 text-center text-primary border-2 border-primary rounded-lg font-medium transition-all duration-300 hover:bg-primary hover:text-white"
                  >
                    Sign up
                  </Link>
                  <Link
                    href="/sign-in"
                    className="block w-full px-4 py-3 text-center bg-primary text-background rounded-lg font-medium"
                  >
                    Sign in
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
