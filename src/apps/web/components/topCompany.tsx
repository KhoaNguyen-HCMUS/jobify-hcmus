"use client";
import { useState } from "react";
import LeftArrow from "./arrowLeft";
import RightArrow from "./arrowRight";
import LocationFilter from "./locationFilter";
import CompanyCard from "./companyCard";

const companies = [
  {
    id: 1,
    major: "Senior Frontend Developer",
    companyName: "Google",
    province: "HCM",
    totalJob: "12 jobs",
    image: "/google-logo.png",
    name: "Google Logo",
  },
  {
    id: 2,
    major: "Senior Frontend Developer",
    companyName: "Google",
    province: "HCM",
    totalJob: "12 jobs",
    image: "/google-logo.png",
    name: "Google Logo",
  },
  {
    id: 3,
    major: "Senior Frontend Developer",
    companyName: "Google",
    province: "HCM",
    totalJob: "12 jobs",
    image: "/google-logo.png",
    name: "Google Logo",
  },
  {
    id: 4,
    major: "Senior Frontend Developer",
    companyName: "Google",
    province: "HCM",
    totalJob: "12 jobs",
    image: "/google-logo.png",
    name: "Google Logo",
  },
  {
    id: 5,
    major: "Senior Frontend Developer",
    companyName: "Google",
    province: "HCM",
    totalJob: "12 jobs",
    image: "/google-logo.png",
    name: "Google Logo",
  },
  {
    id: 6,
    major: "Senior Frontend Developer",
    companyName: "Google",
    province: "HCM",
    totalJob: "12 jobs",
    image: "/google-logo.png",
    name: "Google Logo",
  },
  {
    id: 7,
    major: "Senior Frontend Developer",
    companyName: "Google",
    province: "HCM",
    totalJob: "12 jobs",
    image: "/google-logo.png",
    name: "Google Logo",
  },
  {
    id: 8,
    major: "Senior Frontend Developer",
    companyName: "Google",
    province: "HCM",
    totalJob: "12 jobs",
    image: "/google-logo.png",
    name: "Google Logo",
  },
  {
    id: 9,
    major: "Senior Frontend Developer",
    companyName: "Google",
    province: "HCM",
    totalJob: "12 jobs",
    image: "/google-logo.png",
    name: "Google Logo",
  },
  {
    id: 10,
    major: "Senior Frontend Developer",
    companyName: "Google",
    province: "HCM",
    totalJob: "12 jobs",
    image: "/google-logo.png",
    name: "Google Logo",
  },
  {
    id: 11,
    major: "Senior Frontend Developer",
    companyName: "Google",
    province: "HCM",
    totalJob: "12 jobs",
    image: "/google-logo.png",
    name: "Google Logo",
  },
  {
    id: 12,
    major: "Senior Frontend Developer",
    companyName: "Google",
    province: "HCM",
    totalJob: "12 jobs",
    image: "/google-logo.png",
    name: "Google Logo",
  },
  {
    id: 13,
    major: "Senior Frontend Developer",
    companyName: "Google",
    province: "HCM",
    totalJob: "12 jobs",
    image: "/google-logo.png",
    name: "Google Logo",
  },
  {
    id: 14,
    major: "Senior Frontend Developer",
    companyName: "Google",
    province: "HCM",
    totalJob: "12 jobs",
    image: "/google-logo.png",
    name: "Google Logo",
  },
  {
    id: 15,
    major: "Senior Frontend Developer",
    companyName: "Google",
    province: "HCM",
    totalJob: "12 jobs",
    image: "/google-logo.png",
    name: "Google Logo",
  },
];

export default function TopCompany() {
  const [currentPage, setCurrentPage] = useState(1);

  const COMPANY_PER_PAGE = 12; // 4x3
  const totalPages = Math.ceil(companies.length / COMPANY_PER_PAGE);

  // Tính toán companies hiển thị trên trang hiện tại
  const startIndex = (currentPage - 1) * COMPANY_PER_PAGE;
  const endIndex = startIndex + COMPANY_PER_PAGE;
  const currentCompanies = companies.slice(startIndex, endIndex);

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
      <LocationFilter />
      <div className="mx-7">
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
          {currentCompanies.map((company) => (
            <CompanyCard key={company.id} company={company} />
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
