"use client";
import React from "react";
import { useState, useEffect } from "react";
import {
  Lock,
  BellIcon,
  Briefcase,
  ShoppingBag,
  TextSelect,
  User,
  TriangleAlert,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideBar() {
  const pathname = usePathname();

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

  const candidateItems = [
    {
      href: "/candidate/dashboard",
      label: "Dashboard",
      icon: <TextSelect size={24} />,
    },
    {
      href: "/candidate/profile",
      label: "Profile",
      icon: <User size={24} />,
    },
    {
      href: "/candidate/jobs-applied",
      label: "Jobs Applied",
      icon: <ShoppingBag size={24} />,
    },
    {
      href: "/candidate/saved-jobs",
      label: "Jobs Saved",
      icon: <Briefcase size={24} />,
    },
    {
      href: "/candidate/change-password",
      label: "Change Password",
      icon: <Lock size={24} />,
    },
    {
      href: "/candidate/notifications",
      label: "Notifications",
      icon: <BellIcon size={24} />,
    },
    {
      href: "/candidate/reports",
      label: "Report History",
      icon: <TriangleAlert size={24} />,
    },
  ];

  const recruiterItems = [
    {
      href: "/recruiter/dashboard",
      label: "Dashboard",
      icon: <TextSelect size={24} />,
    },
    {
      href: "/recruiter/profile",
      label: "Profile",
      icon: <User size={24} />,
    },
    {
      href: "/recruiter/jobs",
      label: "My Jobs",
      icon: <ShoppingBag size={24} />,
    },
    {
      href: "/recruiter/wallet",
      label: "Wallet",
      icon: <Wallet size={24} />,
    },
    {
      href: "/recruiter/change-password",
      label: "Change Password",
      icon: <Lock size={24} />,
    },
    {
      href: "/recruiter/notifications",
      label: "Notifications",
      icon: <BellIcon size={24} />,
    },
    {
      href: "/recruiter/reports",
      label: "Report History",
      icon: <TriangleAlert size={24} />,
    },
  ];

  const moderatorItems = [
    {
      href: "/operator/company-pending",
      label: "Company Pending",
    },
    {
      href: "/operator/job-pending",
      label: "Job Pending",
    },
    {
      href: "/operator/reports",
      label: "Report",
    },
    {
      href: "/operator/announcements",
      label: "Announcements",
    },
    {
      href: "/operator/notifications",
      label: "Notifications",
    },
    {
      href: "/operator/change-password",
      label: "Change Password",
    },
    {
      href: "/operator/users",
      label: "User Management",
    },
    {
      href: "/operator/logs",
      label: "Logs",
    },
    {
      href: "/operator/system-settings",
      label: "System Management",
    },
  ];

  let sideBarItems: {
    href: string;
    label: string;
    icon?: React.ReactElement;
  }[] = candidateItems;

  if (user?.role === "candidate") {
    sideBarItems = candidateItems;
  } else if (user?.role === "hr") {
    sideBarItems = recruiterItems;
  } else if (user?.role === "moderator") {
    sideBarItems = moderatorItems;
  }

  if (!user) return null;
  return (
    <aside
      className={`fixed md:flex  top-20 left-0 bottom-0 z-50 w-72 transition-all duration-300 bg-neutral-light-40 backdrop-blur-md shadow-lg`}
    >
      <div className="container">
        <div className="flex flex-col">
          {sideBarItems.map((item) => (
            <Link
              key={`${item.href}-${item.label}`}
              href={item.href}
              className={`relative px-4 font-medium transition-all duration-300 group hover:bg-neutral-light ${
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
    </aside>
  );
}
