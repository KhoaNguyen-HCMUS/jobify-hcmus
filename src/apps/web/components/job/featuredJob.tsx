"use client";
import { useState } from "react";
import JobCard from "./jobCard";
import LeftArrow from "../arrowLeft";
import RightArrow from "../arrowRight";
import LocationFilter from "../locationFilter";
import usePagination from "../../hooks/usePagination";
import Pagination from "../../components/pagination";

const jobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "Google",
    salary: "2000 - 3000$",
    province: "Ho Chi Minh",
    image: "/google-logo.png",
    name: "Google Logo",
  },
  {
    id: 2,
    title: "Backend Developer",
    company: "Microsoft",
    salary: "1800 - 2800$",
    province: "Ha Noi",
    image: "/microsoft-logo.png",
    name: "Microsoft Logo",
  },
  {
    id: 3,
    title: "Senior Frontend Developer",
    company: "Google",
    salary: "2000 - 3000$",
    province: "Ho Chi Minh",
    image: "/google-logo.png",
    name: "Google Logo",
  },
  {
    id: 4,
    title: "Senior Frontend Developer",
    company: "Google",
    salary: "2000 - 3000$",
    province: "Ho Chi Minh",
    image: "/google-logo.png",
    name: "Google Logo",
  },
  {
    id: 5,
    title: "Senior Frontend Developer",
    company: "Google",
    salary: "2000 - 3000$",
    province: "Ho Chi Minh",
    image: "/google-logo.png",
    name: "Google Logo",
  },
  {
    id: 6,
    title: "Senior Frontend Developer",
    company: "Google",
    salary: "2000 - 3000$",
    province: "Ho Chi Minh",
    image: "/google-logo.png",
    name: "Google Logo",
  },
  {
    id: 7,
    title: "Senior Frontend Developer",
    company: "Google",
    salary: "2000 - 3000$",
    province: "Ho Chi Minh",
    image: "/google-logo.png",
    name: "Google Logo",
  },
  {
    id: 8,
    title: "Senior Frontend Developer",
    company: "Google",
    salary: "2000 - 3000$",
    province: "Ho Chi Minh",
    image: "/google-logo.png",
    name: "Google Logo",
  },
  {
    id: 9,
    title: "Senior Frontend Developer",
    company: "Google",
    salary: "2000 - 3000$",
    province: "Ho Chi Minh",
    image: "/google-logo.png",
    name: "Google Logo",
  },
  {
    id: 10,
    title: "Senior Frontend Developer",
    company: "Google",
    salary: "2000 - 3000$",
    province: "Ho Chi Minh",
    image: "/google-logo.png",
    name: "Google Logo",
  },
  {
    id: 11,
    title: "Senior Frontend Developer",
    company: "Google",
    salary: "2000 - 3000$",
    province: "Ho Chi Minh",
    image: "/google-logo.png",
    name: "Google Logo",
  },
  {
    id: 12,
    title: "Full Stack Developer",
    company: "Apple",
    salary: "2500 - 3500$",
    province: "Da Nang",
    image: "/apple-logo.png",
    name: "Apple Logo",
  },
  {
    id: 13,
    title: "DevOps Engineer",
    company: "Amazon",
    salary: "2200 - 3200$",
    province: "Ho Chi Minh",
    image: "/amazon-logo.png",
    name: "Amazon Logo",
  },
  {
    id: 14,
    title: "UI/UX Designer",
    company: "Meta",
    salary: "1900 - 2900$",
    province: "Ha Noi",
    image: "/meta-logo.png",
    name: "Meta Logo",
  },
  {
    id: 15,
    title: "Mobile Developer",
    company: "Netflix",
    salary: "2100 - 3100$",
    province: "Ho Chi Minh",
    image: "/netflix-logo.png",
    name: "Netflix Logo",
  },
];

export default function FeaturedJob() {
  const { page, maxPage, current, next, prev } = usePagination(jobs, 12);

  return (
    <div>
      <LocationFilter />
      <div className="mx-7">
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
          {current.map((job) => (
            <JobCard key={job.id} job={job} />
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
