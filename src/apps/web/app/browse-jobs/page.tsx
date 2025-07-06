"use client";
import JobItem from "../../components/job/jobItem";
import KeywordSearch from "../../components/keywordSearch";
import LeftArrow from "../../components//arrowLeft";
import RightArrow from "../../components/arrowRight";
import { useState } from "react";
import CategoryGrid from "../../components/categoryGrid";
import MainCategoryItem from "../../components/mainCategoryItem";

const jobs = [
  {
    id: 1,
    logo: "/cover.jpg",
    name: "logo",
    title:
      "Sales staff - Enrollment consultant - Telesales (income from 20-50 million/month) - Stellar Garden - Thanh Xuan Hanoi",
    company: "PALFISH INTERNATIONAL SCHOOL SINGAPORE - VIETNAM",
    province: "Ho Chi Minh",
    experience: "1 year",
    salary: "10.000.000",
    postedAt: "1 day ago",
  },
  {
    id: 2,
    logo: "/cover.jpg",
    name: "logo",
    title:
      "Sales staff - Enrollment consultant - Telesales (income from 20-50 million/month) - Stellar Garden - Thanh Xuan Hanoi",
    company: "PALFISH INTERNATIONAL SCHOOL SINGAPORE - VIETNAM",
    province: "Ho Chi Minh",
    experience: "1 year",
    salary: "10.000.000",
    postedAt: "1 day ago",
  },
  {
    id: 3,
    logo: "/cover.jpg",
    name: "logo",
    title:
      "Sales staff - Enrollment consultant - Telesales (income from 20-50 million/month) - Stellar Garden - Thanh Xuan Hanoi",
    company: "PALFISH INTERNATIONAL SCHOOL SINGAPORE - VIETNAM",
    province: "Ho Chi Minh",
    experience: "1 year",
    salary: "10.000.000",
    postedAt: "1 day ago",
  },
  {
    id: 4,
    logo: "/cover.jpg",
    name: "logo",
    title:
      "Sales staff - Enrollment consultant - Telesales (income from 20-50 million/month) - Stellar Garden - Thanh Xuan Hanoi",
    company: "PALFISH INTERNATIONAL SCHOOL SINGAPORE - VIETNAM",
    province: "Ho Chi Minh",
    experience: "1 year",
    salary: "10.000.000",
    postedAt: "1 day ago",
  },
  {
    id: 5,
    logo: "/cover.jpg",
    name: "logo",
    title:
      "Sales staff - Enrollment consultant - Telesales (income from 20-50 million/month) - Stellar Garden - Thanh Xuan Hanoi",
    company: "PALFISH INTERNATIONAL SCHOOL SINGAPORE - VIETNAM",
    province: "Ho Chi Minh",
    experience: "1 year",
    salary: "10.000.000",
    postedAt: "1 day ago",
  },
  {
    id: 6,
    logo: "/cover.jpg",
    name: "logo",
    title:
      "Sales staff - Enrollment consultant - Telesales (income from 20-50 million/month) - Stellar Garden - Thanh Xuan Hanoi",
    company: "PALFISH INTERNATIONAL SCHOOL SINGAPORE - VIETNAM",
    province: "Ho Chi Minh",
    experience: "1 year",
    salary: "10.000.000",
    postedAt: "1 day ago",
  },
  {
    id: 7,
    logo: "/cover.jpg",
    name: "logo",
    title:
      "Sales staff - Enrollment consultant - Telesales (income from 20-50 million/month) - Stellar Garden - Thanh Xuan Hanoi",
    company: "PALFISH INTERNATIONAL SCHOOL SINGAPORE - VIETNAM",
    province: "Ho Chi Minh",
    experience: "1 year",
    salary: "10.000.000",
    postedAt: "1 day ago",
  },
  {
    id: 8,
    logo: "/cover.jpg",
    name: "logo",
    title:
      "Sales staff - Enrollment consultant - Telesales (income from 20-50 million/month) - Stellar Garden - Thanh Xuan Hanoi",
    company: "PALFISH INTERNATIONAL SCHOOL SINGAPORE - VIETNAM",
    province: "Ho Chi Minh",
    experience: "1 year",
    salary: "10.000.000",
    postedAt: "1 day ago",
  },
  {
    id: 9,
    logo: "/cover.jpg",
    name: "logo",
    title:
      "Sales staff - Enrollment consultant - Telesales (income from 20-50 million/month) - Stellar Garden - Thanh Xuan Hanoi",
    company: "PALFISH INTERNATIONAL SCHOOL SINGAPORE - VIETNAM",
    province: "Ho Chi Minh",
    experience: "1 year",
    salary: "10.000.000",
    postedAt: "1 day ago",
  },
  {
    id: 10,
    logo: "/cover.jpg",
    name: "logo",
    title:
      "Sales staff - Enrollment consultant - Telesales (income from 20-50 million/month) - Stellar Garden - Thanh Xuan Hanoi",
    company: "PALFISH INTERNATIONAL SCHOOL SINGAPORE - VIETNAM",
    province: "Ho Chi Minh",
    experience: "1 year",
    salary: "10.000.000",
    postedAt: "1 day ago",
  },
];

const mains = [
  {
    id: 1,
    category: "Software Engineer",
  },
  {
    id: 2,
    category: "Marketing & Advertising",
  },
  {
    id: 3,
    category: "Sales & Business Development",
  },
  {
    id: 4,
    category: "Accounting & Finance",
  },
  {
    id: 5,
    category: "Human Resources",
  },
  {
    id: 6,
    category: "Customer Support & Service",
  },
  {
    id: 7,
    category: "Education & Training",
  },
  {
    id: 8,
    category: "Healthcare & Medical",
  },
  {
    id: 9,
    category: "Engineering & Construction",
  },
  {
    id: 10,
    category: "Design & Creative Arts",
  },
  {
    id: 11,
    category: "Operations & Logistics",
  },
  {
    id: 12,
    category: "Real Estate",
  },
  {
    id: 13,
    category: "Manufacturing & Labor",
  },
  {
    id: 14,
    category: "Legal & Compliance",
  },
];
export default function BrowseJobsPage() {
  const [experience, setExperience] = useState("allExperience");
  const [salary, setSalary] = useState("allSalary");
  const [typeOfWork, setTypeOfWork] = useState("allTypeOfWork");

  const [currentPage, setCurrentPage] = useState(1);

  const JOBS_PER_PAGE = 9;
  const totalPages = Math.ceil(jobs.length / JOBS_PER_PAGE);

  // Tính toán jobs hiển thị trên trang hiện tại
  const startIndex = (currentPage - 1) * JOBS_PER_PAGE;
  const endIndex = startIndex + JOBS_PER_PAGE;
  const currentJobs = jobs.slice(startIndex, endIndex);

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

  const [open, setOpen] = useState(false);

  return (
    <div className="bg-neutral-light-40">
      <div className="flex flex-col justify-center items-center space-y-6">
        <div className="text-center">
          <h1 className="font-bold text-3xl text-primary p-2 mt-6">
            The right job - the right person
          </h1>
          <p className="font-semibold text-primary-80">
            Approach 60,000+ job recruitment news every day from thousands of
            reputable businesses in Vietnam
          </p>
        </div>
        <KeywordSearch />
      </div>
      <div className="pt-4">
        <h2 className="font-bold text-3xl text-neutral-light-20 pl-10 py-2 w-full bg-primary">
          <i>Jobs</i>
        </h2>
        <div className="flex gap-2">
          <div className="flex-1 hidden md:block bg-neutral-light-20 shadow-2xs">
            <div>
              {mains.map((main) => (
                <MainCategoryItem key={main.id} main={main} />
              ))}
            </div>
            <div>
              <div className="bg-primary text-highlight-20 px-4 py-2 font-semibold">
                Experience
              </div>
              <div className="flex flex-col">
                <label className="px-4 py-2 text-primary hover:bg-neutral-light-80 cursor-pointer">
                  <input
                    type="radio"
                    name="experience"
                    value="allExperience"
                    checked={experience === "allExperience"}
                    onChange={(e) => setExperience(e.target.value)}
                    className="mr-2 bg-accent accent-accent"
                  />
                  All
                </label>
                <label className="px-4 py-2 text-primary hover:bg-neutral-light-80 cursor-pointer">
                  <input
                    type="radio"
                    name="experience"
                    value="noRequired"
                    checked={experience === "noRequired"}
                    onChange={(e) => setExperience(e.target.value)}
                    className="mr-2 bg-accent accent-accent"
                  />
                  No required
                </label>
                <label className="px-4 py-2 text-primary hover:bg-neutral-light-80 cursor-pointer">
                  <input
                    type="radio"
                    name="experience"
                    value="lessThan1"
                    checked={experience === "lessThan1"}
                    onChange={(e) => setExperience(e.target.value)}
                    className="mr-2 bg-accent accent-accent"
                  />
                  Less than 1 year
                </label>
                <label className="px-4 py-2 text-primary hover:bg-neutral-light-80 cursor-pointer">
                  <input
                    type="radio"
                    name="experience"
                    value="1"
                    checked={experience === "1"}
                    onChange={(e) => setExperience(e.target.value)}
                    className="mr-2 bg-accent accent-accent"
                  />
                  1 year
                </label>
                <label className="px-4 py-2 text-primary hover:bg-neutral-light-80 cursor-pointer">
                  <input
                    type="radio"
                    name="experience"
                    value="2"
                    checked={experience === "2"}
                    onChange={(e) => setExperience(e.target.value)}
                    className="mr-2 bg-accent accent-accent"
                  />
                  2 years
                </label>
                <label className="px-4 py-2 text-primary hover:bg-neutral-light-80 cursor-pointer">
                  <input
                    type="radio"
                    name="experience"
                    value="3"
                    checked={experience === "3"}
                    onChange={(e) => setExperience(e.target.value)}
                    className="mr-2 bg-accent accent-accent"
                  />
                  3 years
                </label>
                <label className="px-4 py-2 text-primary hover:bg-neutral-light-80 cursor-pointer">
                  <input
                    type="radio"
                    name="experience"
                    value="4"
                    checked={experience === "4"}
                    onChange={(e) => setExperience(e.target.value)}
                    className="mr-2 bg-accent accent-accent"
                  />
                  4 years
                </label>
                <label className="px-4 py-2 text-primary hover:bg-neutral-light-80 cursor-pointer">
                  <input
                    type="radio"
                    name="experience"
                    value="5"
                    checked={experience === "5"}
                    onChange={(e) => setExperience(e.target.value)}
                    className="mr-2 bg-accent accent-accent"
                  />
                  5 years
                </label>
                <label className="px-4 py-2 text-primary hover:bg-neutral-light-80 cursor-pointer">
                  <input
                    type="radio"
                    name="experience"
                    value="over5"
                    checked={experience === "over5"}
                    onChange={(e) => setExperience(e.target.value)}
                    className="mr-2 bg-accent accent-accent"
                  />
                  Over 5 years
                </label>
              </div>
            </div>
            <div>
              <div className="bg-primary text-highlight-20 px-4 py-2 font-semibold">
                Salary
              </div>
              <div className="flex flex-col">
                <label className="px-4 py-2 text-primary hover:bg-neutral-light-80 cursor-pointer">
                  <input
                    type="radio"
                    name="salary"
                    value="allSalary"
                    checked={salary === "allSalary"}
                    onChange={(e) => setSalary(e.target.value)}
                    className="mr-2 bg-accent accent-accent"
                  />
                  All
                </label>
                <label className="px-4 py-2 text-primary hover:bg-neutral-light-80 cursor-pointer">
                  <input
                    type="radio"
                    name="salary"
                    value="lessThan10"
                    checked={salary === "lessThan10"}
                    onChange={(e) => setSalary(e.target.value)}
                    className="mr-2 bg-accent accent-accent"
                  />
                  Less than 10 million
                </label>
                <label className="px-4 py-2 text-primary hover:bg-neutral-light-80 cursor-pointer">
                  <input
                    type="radio"
                    name="salary"
                    value="10-15"
                    checked={salary === "10-15"}
                    onChange={(e) => setSalary(e.target.value)}
                    className="mr-2 bg-accent accent-accent"
                  />
                  10-15 million
                </label>
                <label className="px-4 py-2 text-primary hover:bg-neutral-light-80 cursor-pointer">
                  <input
                    type="radio"
                    name="salary"
                    value="15-20"
                    checked={salary === "15-20"}
                    onChange={(e) => setSalary(e.target.value)}
                    className="mr-2 bg-accent accent-accent"
                  />
                  15-20 million
                </label>
                <label className="px-4 py-2 text-primary hover:bg-neutral-light-80 cursor-pointer">
                  <input
                    type="radio"
                    name="salary"
                    value="20-25"
                    checked={salary === "20-25"}
                    onChange={(e) => setSalary(e.target.value)}
                    className="mr-2 bg-accent accent-accent"
                  />
                  20-25 million
                </label>
                <label className="px-4 py-2 text-primary hover:bg-neutral-light-80 cursor-pointer">
                  <input
                    type="radio"
                    name="salary"
                    value="25-30"
                    checked={salary === "25-30"}
                    onChange={(e) => setSalary(e.target.value)}
                    className="mr-2 bg-accent accent-accent"
                  />
                  25-30 million
                </label>
                <label className="px-4 py-2 text-primary hover:bg-neutral-light-80 cursor-pointer">
                  <input
                    type="radio"
                    name="salary"
                    value="30-50"
                    checked={salary === "30-50"}
                    onChange={(e) => setSalary(e.target.value)}
                    className="mr-2 bg-accent accent-accent"
                  />
                  30-50 million
                </label>
                <label className="px-4 py-2 text-primary hover:bg-neutral-light-80 cursor-pointer">
                  <input
                    type="radio"
                    name="salary"
                    value="over50"
                    checked={salary === "over50"}
                    onChange={(e) => setSalary(e.target.value)}
                    className="mr-2 bg-accent accent-accent"
                  />
                  Over 50 million
                </label>
              </div>
            </div>
            <div>
              <div className="bg-primary text-highlight-20 px-4 py-2 font-semibold">
                Type of work
              </div>
              <div className="flex flex-col">
                <label className="px-4 py-2 text-primary hover:bg-neutral-light-80 cursor-pointer">
                  <input
                    type="radio"
                    name="typeOfWork"
                    value="allTypeOfWork"
                    checked={typeOfWork === "allTypeOfWork"}
                    onChange={(e) => setTypeOfWork(e.target.value)}
                    className="mr-2 bg-accent accent-accent"
                  />
                  All
                </label>
                <label className="px-4 py-2 text-primary hover:bg-neutral-light-80 cursor-pointer">
                  <input
                    type="radio"
                    name="typeOfWork"
                    value="part-time"
                    checked={typeOfWork === "part-time"}
                    onChange={(e) => setTypeOfWork(e.target.value)}
                    className="mr-2 bg-accent accent-accent"
                  />
                  Part-time
                </label>
                <label className="px-4 py-2 text-primary hover:bg-neutral-light-80 cursor-pointer">
                  <input
                    type="radio"
                    name="typeOfWork"
                    value="full-time"
                    checked={typeOfWork === "full-time"}
                    onChange={(e) => setTypeOfWork(e.target.value)}
                    className="mr-2 bg-accent accent-accent"
                  />
                  Full-time
                </label>
                <label className="px-4 py-2 text-primary hover:bg-neutral-light-80 cursor-pointer">
                  <input
                    type="radio"
                    name="typeOfWork"
                    value="internship"
                    checked={typeOfWork === "internship"}
                    onChange={(e) => setTypeOfWork(e.target.value)}
                    className="mr-2 bg-accent accent-accent"
                  />
                  Internship
                </label>
              </div>
            </div>
          </div>
          <div className="flex-3">
            {currentJobs.map((job) => (
              <JobItem key={job.id} job={job} />
            ))}
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
      </div>
      <div>
        <h2 className="font-bold text-3xl text-neutral-light-20 pl-10 py-2 w-full bg-primary">
          <i>Top Outstanding Industries</i>
        </h2>
        <CategoryGrid />
      </div>
    </div>
  );
}
