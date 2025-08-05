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
    "/auth/sign-in",
    "/auth/register",
    "/auth/register/candidate",
    "/auth/register/company",
    "/auth/register/company/pending",
    "/forgot-password",
    "/forgot-password-second",
    "/forgot-password-third",
    "/register/candidate",
    "/register/company",
    "/error-403",
    "/pending-approval",
  ].includes(pathname);

  const hideSideBar =
    [
      "/auth/sign-in",
      "/",
      "/auth/register",
      "/auth/register/candidate",
      "/auth/register/company",
      "/auth/register/company/pending",
      "/forgot-password",
      "/forgot-password-second",
      "/forgot-password-third",
      "/register/candidate",
      "/register/company",
      "/pending-approval",
      "/about-us",
      "/jobs",
      "/company-detail",
      "/job-detail",
      "/recommended",
      "/support",
      "/recruiter/applications",
      "/operator/report-detail",
    ].includes(pathname) ||
    pathname.startsWith("/jobs/") ||
    pathname.startsWith("/reports/") ||
    pathname.startsWith("/company-detail/");

  return (
    <>
      {!hideNav && <Nav />}
      {!hideSideBar && <SideBar />}
      <main
        className={`${!hideNav ? "pt-20" : ""} ${
          !hideSideBar ? "pl-72" : ""
        }`.trim()}
      >
        {children}
      </main>
    </>
  );
}
