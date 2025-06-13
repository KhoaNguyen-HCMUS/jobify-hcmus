"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import HomePage from "./home/page";
import LoginPage from "./login/page";


export default function App() {
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState("/");

  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);

  const renderPage = () => {
    switch (currentPath) {
      case "/":
        return <HomePage />;
      
      case "/login":
        return <LoginPage />;
      
      default:
        return <HomePage />; 
    }
  };

  return (
    <div className="w-full min-h-screen">
      {renderPage()}
    </div>
  );
}