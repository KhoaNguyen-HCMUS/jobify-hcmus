"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { Bell } from "lucide-react";
import SystemAnnouncement from "../systemAnnouncement";
import { useAuth } from "../../hooks/useAuth";
import { logout } from "../../services/auth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function NavBar() {
  const [visible, setVisible] = useState(false);
  const popupRef = useRef(null);
  const buttonRef = useRef(null);
  const { user, isAuthenticated, updateUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // if (
      //   popupRef.current &&
      //   // !popupRef.current.contains(event.target as Node) &&
      //   buttonRef.current &&
      //   // !buttonRef.current.contains(event.target as Node)
      // ) {
      //   setVisible(false);
      // }
    }

    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      updateUser();
      toast.success("Logout successfully!");
      router.push("/auth/sign-in");
    } catch (error) {
      toast.error("Error when logout!");
    }
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const guestItems = [
    { href: "/", label: "Home" },
    { href: "/jobs", label: "Browse Jobs" },
    { href: "/support", label: "Support" },
    { href: "/about", label: "About Us" },
  ];

  const candidateItems = [
    { href: "/candidate/dashboard", label: "Dashboard" },
    { href: "/jobs", label: "Browse Jobs" },
    { href: "/recommended", label: "Recommended" },
    { href: "/support", label: "Support" },
    { href: "/about", label: "About Us" },
  ];

  const companyItems = [
    { href: "/company/dashboard", label: "Dashboard" },
    { href: "/company/jobs", label: "My Jobs" },
    { href: "/support", label: "Support" },
    { href: "/about", label: "About Us" },
  ];

  const adminItems = [
    { href: "/operator/company-pending", label: "Dashboard" },
    { href: "/support", label: "Support" },
    { href: "/about", label: "About Us" },
    { href: "/operator/system-settings", label: "Settings" },
    { href: "/operator/logs", label: "Logs" },
  ];

  let navItems = guestItems;

  if (isAuthenticated && user?.role === "candidate") {
    navItems = candidateItems;
  } else if (isAuthenticated && user?.role === "company") {
    navItems = companyItems;
  } else if (
    isAuthenticated &&
    (user?.role === "admin" || user?.role === "moderator")
  ) {
    navItems = adminItems;
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
            {isAuthenticated && user ? (
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
                  <div className="flex items-center space-x-2">
                    <Link
                      href={
                        user.role === "candidate"
                          ? "/candidate/profile"
                          : user.role === "company"
                          ? "/company/profile"
                          : "/profile"
                      }
                      className="px-4 py-2 bg-primary text-background rounded-lg font-medium hover:bg-primary/90 transition-colors"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="cursor-pointer px-4 py-2 text-primary border-2 border-primary rounded-lg font-medium hover:bg-primary hover:text-background transition-colors"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/auth/register"
                  className="px-6 py-2 text-primary border-2 border-primary rounded-lg font-medium transition-all duration-300 hover:bg-primary hover:text-background hover:shadow-lg hover:shadow-primary/30 transform hover:-translate-y-0.5"
                >
                  Sign up
                </Link>
                <Link
                  href="/auth/sign-in"
                  className="px-6 py-2 text-primary border-2 border-primary rounded-lg font-medium transition-all duration-300 hover:bg-primary hover:text-background hover:shadow-lg hover:shadow-primary/30 transform hover:-translate-y-0.5"
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

              {isAuthenticated && user ? (
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
                  <div className="flex flex-col gap-2">
                    <Link
                      href="/profile"
                      className="block w-full px-4 py-3 text-center bg-primary text-background rounded-lg font-medium hover:bg-primary/90"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-3 text-center text-primary border-2 border-primary rounded-lg font-medium hover:bg-primary hover:text-background"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              ) : (
                <div className="pt-4 space-y-2">
                  <Link
                    href="/auth/register"
                    className="block w-full px-4 py-3 text-center text-primary border-2 border-primary rounded-lg font-medium transition-all duration-300 hover:bg-primary hover:text-background"
                  >
                    Sign up
                  </Link>
                  <Link
                    href="/auth/sign-in"
                    className="block w-full px-4 py-3 text-center text-primary border-2 border-primary rounded-lg font-medium transition-all duration-300 hover:bg-primary hover:text-background"
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
