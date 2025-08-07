"use client";
import LocationFilter from "./locationFilter";
import CompanyCard from "./companyCard";
import usePagination from "../hooks/usePagination";
import Pagination from "./pagination";

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
  const { page, maxPage, current, next, prev } = usePagination(companies, 12);

  return (
    <div>
      <LocationFilter />
      <div className="mx-7">
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
          {current.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
        <div className="py-4">
          <Pagination
            page={page}
            maxPage={maxPage}
            onNext={next}
            onPrev={prev}
          />
        </div>
      </div>
    </div>
  );
}
