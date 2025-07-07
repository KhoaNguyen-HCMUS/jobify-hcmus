"use client";
import { useState } from "react";
import { FilePenLine, Mail, Phone, MapPin } from "lucide-react";
import Notification from "../../../components/notification";
import JobCard from "../../../components/job/jobCard";

const dashboard = [
  {
    avt: "/avt.jpg",
    name: "avt",
    fullName: "Hinh Diem Xuan",
    email: "Not update",
    phone: "Not update",
    location: "Not update",
  },
];

interface DashboardProps {
  dashboard: {
    avt: string;
    name: string;
    fullName: string;
    email: string;
    phone: string;
    location: string;
  };
}

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
];

export default function CandidateDashboardPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const JOBS_PER_PAGE = 2;
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
  return (
    <div className="w-full h-full bg-neutral-light-60">
      <div className="flex flex-col">
        <div className="flex flex-wrap gap-15 p-6">
          <div className="flex-1 flex flex-wrap justify-between bg-highlight-20 rounded-2xl">
            <div className="flex flex-wrap">
              <div className="p-4">
                <img
                  src={dashboard[0].avt}
                  alt={dashboard[0].name}
                  className="w-48 h-48 object-contain rounded-2xl"
                />
              </div>
              <div className="flex flex-col justify-center gap-4 p-4">
                <span className="text-primary text-2xl font-semibold">
                  {dashboard[0].fullName}
                </span>
                <div className="flex flex-col gap-2">
                  <span className="flex gap-2 text-primary">
                    <Mail size={24} />
                    <span>{dashboard[0].email}</span>
                  </span>
                  <span className="flex gap-2 text-primary">
                    <Phone size={24} />
                    <span>{dashboard[0].email}</span>
                  </span>
                  <span className="flex gap-2 text-primary">
                    <MapPin size={24} />
                    <span>{dashboard[0].email}</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="p-4">
              <FilePenLine size={24} className="text-primary cursor-pointer" />
            </div>
          </div>
          <div className="flex-1 bg-highlight-40 rounded-2xl shadow-lg">
            <Notification />
          </div>
        </div>
        <div className="flex flex-wrap gap-15 p-6">
          <div className="flex-1 flex flex-col bg-highlight-20 rounded-2xl p-4 shadow-lg">
            <div className="flex justify-between">
              <span className="text-primary font-semibold text-2xl">
                Jobs Applied
              </span>
              <a href="/candidate/jobs-applied">
                <span className="text-accent font-semibold cursor-pointer">
                  See All
                </span>
              </a>
            </div>
            <div className="flex flex-col gap-y-4 p-4">
              {currentJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </div>
          <div className="flex-1 flex flex-col bg-highlight-20 rounded-2xl p-4 shadow-lg">
            <div className="flex justify-between">
              <span className="text-primary font-semibold text-2xl">
                Jobs Saved
              </span>
              <a href="/candidate/saved-jobs">
                <span className="text-accent font-semibold cursor-pointer">
                  See All
                </span>
              </a>
            </div>
            <div className="flex flex-col gap-y-4 p-4">
              {currentJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
