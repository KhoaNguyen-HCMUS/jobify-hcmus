"use client";
import { useState } from "react";
import CategoryCard from "./categoryCard";
import LeftArrow from "./arrowLeft";
import RightArrow from "./arrowRight";

const categories = [
  {
    id: 1,
    icon: "/google-logo.png",
    name: "Software & IT",
    jobCount: "1290 jobs",
  },
  {
    id: 2,
    icon: "/google-logo.png",
    name: "Marketing & Advertising",
    jobCount: "1290 jobs",
  },
  {
    id: 3,
    icon: "/google-logo.png",
    name: "Sales & Business",
    jobCount: "1290 jobs",
  },
  {
    id: 4,
    icon: "/google-logo.png",
    name: "Developmento",
    jobCount: "1290 jobs",
  },
  {
    id: 5,
    icon: "/google-logo.png",
    name: "Accounting & Finance",
    jobCount: "1290 jobs",
  },
  {
    id: 6,
    icon: "/google-logo.png",
    name: "Human Resources",
    jobCount: "1290 jobs",
  },
  {
    id: 7,
    icon: "/google-logo.png",
    name: "Customer Support & Service",
    jobCount: "1290 jobs",
  },
  {
    id: 8,
    icon: "/google-logo.png",
    name: "Education & Training",
    jobCount: "1290 jobs",
  },
  {
    id: 9,
    icon: "/google-logo.png",
    name: "Healthcare & Medical",
    jobCount: "1290 jobs",
  },
  {
    id: 10,
    icon: "/google-logo.png",
    name: "Engineering & Construction",
    jobCount: "1290 jobs",
  },
  {
    id: 11,
    icon: "/google-logo.png",
    name: "Design & Creative Arts",
    jobCount: "1290 jobs",
  },
  {
    id: 12,
    icon: "/google-logo.png",
    name: "Operations & Logistics",
    jobCount: "1290 jobs",
  },
  {
    id: 13,
    icon: "/google-logo.png",
    name: "Real Estate",
    jobCount: "1290 jobs",
  },
  {
    id: 14,
    icon: "/google-logo.png",
    name: "Manufacturing & Labor",
    jobCount: "1290 jobs",
  },
  {
    id: 15,
    icon: "/google-logo.png",
    name: "Legal & Compliance",
    jobCount: "1290 jobs",
  },
];
export default function CategoryGrid() {
  const [currentPage, setCurrentPage] = useState(1);

  const CATEGORIES_PER_PAGE = 8; // 4x3
  const totalPages = Math.ceil(categories.length / CATEGORIES_PER_PAGE);

  // Tính toán CATEGORYS hiển thị trên trang hiện tại
  const startIndex = (currentPage - 1) * CATEGORIES_PER_PAGE;
  const endIndex = startIndex + CATEGORIES_PER_PAGE;
  const currentCategories = categories.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <div>
      <div className="mx-7">
        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          {currentCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
        <div className="w-full mt-4 mb-2 pb-6 flex justify-center items-center space-x-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            }`}
          >
            <LeftArrow />
          </button>
          <span className="font-semibold text-lg">
            {currentPage}/{totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`${
              currentPage === totalPages
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            }`}
          >
            <RightArrow />
          </button>
        </div>
      </div>
    </div>
  );
}
