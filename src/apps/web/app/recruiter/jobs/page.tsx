"use client";
import { useState } from "react";
import JobCard from "../../../components/job/jobCard";
import { Search } from "lucide-react";
import usePagination from "../../../hooks/usePagination";
import Pagination from "../../../components/pagination";

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

export default function RecruiterJobsSavedPage() {
  const { page, maxPage, current, next, prev } = usePagination(jobs, 8);
  const [keyword, setKeyword] = useState("");

  return (
    <div className="w-full h-full bg-neutral-light-60">
      <div className="flex flex-col px-20 py-10 gap-6">
        <div className="w-full flex justify-end">
          <div className="relative w-full sm:w-96">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Enter keyword..."
              className="pl-4 pr-10 py-2 w-full bg-neutral-light-20 rounded-full shadow-lg text-primary-80 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all duration-300"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-primary cursor-pointer">
              <Search size={24} />
            </div>
          </div>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-4">
          {current.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
        <Pagination page={page} maxPage={maxPage} onNext={next} onPrev={prev} />
      </div>
    </div>
  );
}
