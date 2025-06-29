"use client";

import { usePathname } from "next/navigation";
import Nav from "./nav";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const hideNav = ["/sign-in", "/sign-up-with-role"].includes(pathname);

  return (
    <>
      {!hideNav && <Nav />}
      <main className={!hideNav ? "pt-20" : ""}>{children}</main>
    </>
  );
}
