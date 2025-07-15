"use client";
import JobCard from "../../components/job/jobCard";
import KeywordSearch from "../../components/keywordSearch";
import { useState } from "react";
import MainCategoryItem from "../../components/mainCategoryItem";
import { ChevronDown } from "lucide-react";
import usePagination from "../../hooks/usePagination";
import Pagination from "../../components/pagination";

const jobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "Google",
    salary: "2000 - 3000",
    province: "Ho Chi Minh",
    image: "/google-logo.png",
    name: "Google Logo",
  },
  {
    id: 2,
    title: "Backend Developer",
    company: "Microsoft",
    salary: "1800 - 2800",
    province: "Ha Noi",
    image: "/microsoft-logo.png",
    name: "Microsoft Logo",
  },
  {
    id: 3,
    title: "Senior Frontend Developer",
    company: "Google",
    salary: "2000 - 3000",
    province: "Ho Chi Minh",
    image: "/google-logo.png",
    name: "Google Logo",
  },
  {
    id: 4,
    title: "Senior Frontend Developer",
    company: "Google",
    salary: "2000 - 3000",
    province: "Ho Chi Minh",
    image: "/google-logo.png",
    name: "Google Logo",
  },
  {
    id: 5,
    title: "Senior Frontend Developer",
    company: "Google",
    salary: "2000 - 3000",
    province: "Ho Chi Minh",
    image: "/google-logo.png",
    name: "Google Logo",
  },
  {
    id: 6,
    title: "Senior Frontend Developer",
    company: "Google",
    salary: "2000 - 3000",
    province: "Ho Chi Minh",
    image: "/google-logo.png",
    name: "Google Logo",
  },
  {
    id: 7,
    title: "Senior Frontend Developer",
    company: "Google",
    salary: "2000 - 3000",
    province: "Ho Chi Minh",
    image: "/google-logo.png",
    name: "Google Logo",
  },
  {
    id: 8,
    title: "Senior Frontend Developer",
    company: "Google",
    salary: "2000 - 3000",
    province: "Ho Chi Minh",
    image: "/google-logo.png",
    name: "Google Logo",
  },
  {
    id: 9,
    title: "Senior Frontend Developer",
    company: "Google",
    salary: "2000 - 3000",
    province: "Ho Chi Minh",
    image: "/google-logo.png",
    name: "Google Logo",
  },
  {
    id: 10,
    title: "Senior Frontend Developer",
    company: "Google",
    salary: "2000 - 3000",
    province: "Ho Chi Minh",
    image: "/google-logo.png",
    name: "Google Logo",
  },
  {
    id: 11,
    title: "Senior Frontend Developer",
    company: "Google",
    salary: "2000 - 3000",
    province: "Ho Chi Minh",
    image: "/google-logo.png",
    name: "Google Logo",
  },
  {
    id: 12,
    title: "Full Stack Developer",
    company: "Apple",
    salary: "2500 - 3500",
    province: "Da Nang",
    image: "/apple-logo.png",
    name: "Apple Logo",
  },
  {
    id: 13,
    title: "DevOps Engineer",
    company: "Amazon",
    salary: "2200 - 3200",
    province: "Ho Chi Minh",
    image: "/amazon-logo.png",
    name: "Amazon Logo",
  },
  {
    id: 14,
    title: "UI/UX Designer",
    company: "Meta",
    salary: "1900 - 2900",
    province: "Ha Noi",
    image: "/meta-logo.png",
    name: "Meta Logo",
  },
  {
    id: 15,
    title: "Mobile Developer",
    company: "Netflix",
    salary: "2100 - 3100",
    province: "Ho Chi Minh",
    image: "/netflix-logo.png",
    name: "Netflix Logo",
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
export default function RecommendedPage() {
  const { page, maxPage, current, next, prev } = usePagination(jobs, 18);
  const [experience, setExperience] = useState("allExperience");
  const [salary, setSalary] = useState("allSalary");
  const [typeOfWork, setTypeOfWork] = useState("allTypeOfWork");

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
          <i>Recommended Jobs</i>
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
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap justify-between gap-4 p-4">
                <div className="flex justify-between items-center bg-highlight-40 rounded-2xl gap-x-60 p-4">
                  <div className="flex flex-wrap gap-4">
                    <div className="text-primary bg-highlight-60 hover:bg-highlight cursor-pointer shadow-md rounded-full px-6 py-1">
                      Skills
                    </div>
                    <div className="text-primary bg-highlight-60 hover:bg-highlight cursor-pointer shadow-md rounded-full px-6 py-1">
                      Industries
                    </div>
                    <div className="text-primary bg-highlight-60 hover:bg-highlight cursor-pointer shadow-md rounded-full px-6 py-1">
                      Experience
                    </div>
                    <div className="text-primary bg-highlight-60 hover:bg-highlight cursor-pointer shadow-md rounded-full px-6 py-1">
                      Type of Work
                    </div>
                    <div className="text-primary bg-highlight-60 hover:bg-highlight cursor-pointer shadow-md rounded-full px-6 py-1">
                      Location
                    </div>
                  </div>
                  <div>
                    <ChevronDown size={24} className="cursor-pointer" />
                  </div>
                </div>
                <button className="cursor-pointer bg-accent-80 hover:bg-accent  text-background font-semibold rounded-full p-4">
                  Apply priority
                </button>
              </div>
              <div className="px-6 pb-4">
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-10 p-4">
                  {current.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
                <Pagination
                  page={page}
                  maxPage={maxPage}
                  onNext={next}
                  onPrev={prev}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
