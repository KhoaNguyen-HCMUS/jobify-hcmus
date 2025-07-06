"use client";
import { useState } from "react";
import CategoryCard from "./categoryCard";
import LeftArrow from "./arrowLeft";
import RightArrow from "./arrowRight";
import {
  Bandage,
  Bolt,
  BookCheck,
  CardSim,
  Coins,
  Factory,
  Forklift,
  GraduationCap,
  Megaphone,
  MonitorCog,
  Palette,
  Speech,
  TagIcon,
  WheatOff,
  Scale,
} from "lucide-react";

const categories = [
  {
    id: 1,
    icon: <MonitorCog size={70} />,
    name: "Software & IT",
  },
  {
    id: 2,
    icon: <Megaphone size={70} />,
    name: "Marketing & Advertising",
  },
  {
    id: 3,
    icon: <TagIcon size={70} />,
    name: "Sales & Business Development",
  },
  {
    id: 4,
    icon: <Coins size={70} />,
    name: "Accounting & Finance",
  },
  {
    id: 5,
    icon: <Speech size={70} />,
    name: "Human Resources",
  },
  {
    id: 6,
    icon: <CardSim size={70} />,
    name: "Customer Support & Service",
  },
  {
    id: 7,
    icon: <GraduationCap size={70} />,
    name: "Education & Training",
  },
  {
    id: 8,
    icon: <Bandage size={70} />,
    name: "Healthcare & Medical",
  },
  {
    id: 9,
    icon: <Bolt size={70} />,
    name: "Engineering & Construction",
  },
  {
    id: 10,
    icon: <Palette size={70} />,
    name: "Design & Creative Arts",
  },
  {
    id: 11,
    icon: <Forklift size={70} />,
    name: "Operations & Logistics",
  },
  {
    id: 12,
    icon: <WheatOff size={70} />,
    name: "Real Estate",
  },
  {
    id: 13,
    icon: <Factory size={70} />,
    name: "Manufacturing & Labor",
  },
  {
    id: 14,
    icon: <Scale size={70} />,
    name: "Legal & Compliance",
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
