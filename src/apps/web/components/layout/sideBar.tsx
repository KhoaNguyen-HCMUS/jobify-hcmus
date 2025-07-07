"use client";
import { useState } from "react";
import {
  Lock,
  BellIcon,
  Briefcase,
  ShoppingBag,
  TextSelect,
  User,
  TriangleAlert,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
//import Announcement from "../announcement";

export default function SideBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const sideBarItems = [
    {
      href: "/candidate/dashboard",
      label: "Dashboard",
      icon: <TextSelect size={34} />,
    },
    {
      href: "/candidate/profile",
      label: "Profile",
      icon: <User size={34} />,
    },
    {
      href: "/candidate/jobs-applied",
      label: "Jobs Applied",
      icon: <ShoppingBag size={34} />,
    },
    {
      href: "/candidate/saved-jobs",
      label: "Jobs Saved",
      icon: <Briefcase size={34} />,
    },
    {
      href: "/candidate/change-password",
      label: "Change Password",
      icon: <Lock size={34} />,
    },
    {
      href: "/candidate/notifications",
      label: "Notifications",
      icon: <BellIcon size={34} />,
    },
    {
      href: "/candidate/reports",
      label: "Report History",
      icon: <TriangleAlert size={34} />,
    },
  ];

  return (
    <header
      className={`fixed md:flex top-20 left-0 bottom-0 z-50 w-96 transition-all duration-300 bg-neutral-light-40 backdrop-blur-md shadow-lg`}
    >
      <div className="container">
        <div className="flex flex-col">
          {sideBarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative px-4 py-2 text-2xl font-medium transition-all duration-300 group hover:bg-neutral-light ${
                pathname === item.href
                  ? "text-primary bg-accent-20"
                  : "text-primary"
              }`}
            >
              <div className="relative flex gap-2 text-primary font-semibold px-4 py-2">
                {item.icon}
                <span>{item.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
