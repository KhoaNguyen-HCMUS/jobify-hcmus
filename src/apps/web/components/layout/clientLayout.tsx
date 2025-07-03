"use client";

import { usePathname } from "next/navigation";
import Nav from "./nav";

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
    "/pending-approval",
  ].includes(pathname);

  return (
    <>
      {!hideNav && <Nav />}
      <main className={!hideNav ? "pt-20" : ""}>{children}</main>
    </>
  );
}
