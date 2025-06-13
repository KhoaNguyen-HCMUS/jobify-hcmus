"use client";
import { useState } from "react";
import { Search, MapPin, Funnel } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import JobCard from "../components/jobCard";
import LeftArrow from "../components/arrowLeft";
import RightArrow from "../components/arrowRight";

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

export default function HomePage() {
  const [keyword, setKeyword] = useState("");
  const [address, setAddress] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const JOBS_PER_PAGE = 12; // 4x3
  const totalPages = Math.ceil(jobs.length / JOBS_PER_PAGE);

  // Tính toán jobs hiển thị trên trang hiện tại
  const startIndex = (currentPage - 1) * JOBS_PER_PAGE;
  const endIndex = startIndex + JOBS_PER_PAGE;
  const currentJobs = jobs.slice(startIndex, endIndex);

  const handleFind = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Key word: ", keyword);
    console.log("Address: ", address);
  };

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
    <div className="w-full min-h-screen">
      <div className="flex w-full">
        <div className="flex w-full p-px py-4 bg-accent-20 justify-between items-center mb-10">
          <div className="flex items-center">
            <Image
              src="/logo.png"
              alt="JOBIFY Logo"
              width={50}
              height={50}
            ></Image>
            <span className="text-4xl font-bold text-primary ml-4">JOBIFY</span>
          </div>
          <nav className="flex items-center justify-center space-x-10">
            <Link href="/">
              <span className="text-2xl font-semibold text-primary cursor-pointer">
                Home
              </span>
            </Link>
            <Link href="/aboutus">
              <span className="text-2xl font-semibold text-primary-60 cursor-pointer no-underline hover:no-underline decoration-transparent !important">
                About us
              </span>
            </Link>
            <Link href="/contact">
              <span className="text-2xl font-semibold text-secondary-60 cursor-pointer">
                Contact
              </span>
            </Link>
            <Link href="/notification">
              <span className="text-2xl font-semibold text-secondary-60 cursor-pointer">
                Notification
              </span>
            </Link>
          </nav>
          <div className="flex space-x-4">
            <button className="cursor-pointer text-primary text-2xl font-semibold px-8 pb-2 border-4 border-primary rounded-full">
              Sign up
            </button>
            <button className="cursor-pointer text-background text-2xl font-semibold px-8  border-4 bg-primary border-primary rounded-full">
              Sign in
            </button>
          </div>
        </div>
      </div>
      <div className="mb-10">
        <h1 className="font-bold text-7xl ml-16 text-primary mb-10">
          Find Opportunities <br /> That Fit You Best!
        </h1>
        <p className="text-2xl text-secondary ml-16">
          From Startup Roles to Global Careers - Lat's Build Your Future
          Together.
        </p>
      </div>
      <form onSubmit={handleFind}>
        <div className="flex ml-16 mb-16">
          <div className="relative mr-10">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary">
              <Search size={24} />
            </div>
            <input
              type="keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Enter key word..."
              className="w-full pl-12 pr-4 py-4 bg-accent-20 rounded-md text-primary-80 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all duration-300"
            />
          </div>
          <div className="relative mr-10">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary">
              <MapPin size={24} />
            </div>
            <input
              id="address"
              type="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter address..."
              className="w-full pl-12 pr-4 py-4 bg-accent-20 rounded-md text-primary-80 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all duration-300"
            />
          </div>
          <div className="relative">
            <button
              type="submit"
              className="cursor-pointer absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-20 font-semibold text-2xl bg-secondary px-6 py-3.5 rounded-md"
            >
              Search
            </button>
          </div>
        </div>
        <div className="bg-accent-20">
          <h2 className="font-bold text-4xl text-neutral-light-20 pl-16 bg-primary w-full mb-6">
            <i>NEW JOBS</i>
          </h2>
          <div className="flex justify-between mb-5">
            <div className="relative ml-12">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary">
                <Funnel size={24} />
              </div>
              <input
                type="keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Enter key word..."
                className="pl-12 pr-4 py-4 bg-highlight-20 rounded-md text-primary-80 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all duration-300"
              />
            </div>
            <div className="flex mr-12 space-x-10 items-center">
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
              <button className="font-semibold text-lg"></button>
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
          <div className="mx-7">
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentJobs.map((job) => (
                <JobCard key={job.id} job={job} />
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
      </form>
    </div>
  );
}
