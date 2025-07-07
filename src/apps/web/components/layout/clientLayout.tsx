"use client";

import { usePathname } from "next/navigation";
import Nav from "./nav";
import SideBar from "./sideBar";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const hideNav = [
    "/sign-in",
    "/sign-up-with-role",
    "/forgot-password-first",
    "/forgot-password-second",
    "/forgot-password-third",
    "/candidate-registration",
    "/company-registration",
    "/error-403",
    "/pending-approval",
  ].includes(pathname);

  const hideSideBar = [
    "/sign-in",
    "/",
    "/sign-up-with-role",
    "/forgot-password-first",
    "/forgot-password-second",
    "/forgot-password-third",
    "/candidate-registration",
    "/company-registration",
    "/pending-approval",
    "/about-us",
    "/browse-jobs",
    "/company-detail",
    "/job-detail",
    "/recommended",
    "/support",
  ].includes(pathname);

  return (
    <>
      {!hideNav && <Nav />}
      {!hideSideBar && <SideBar />}
      <main
        className={`${!hideNav ? "pt-20" : ""} ${
          !hideSideBar ? "pl-96" : ""
        }`.trim()}
      >
        {children}
      </main>
    </>
  );
}
