"use client";
import { useState } from "react";
import { FilePenLine, Unlink2, Users } from "lucide-react";
import Notification from "../../../components/notification";
import JobCard from "../../../components/job/jobCard";
import CoinBalance from "@web/components/coinBalance";

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
];

interface CompanyProps {
  company: {
    coverImage: string;
    logoImage: string;
    name: string;
    website: string;
    employees: string;
    introduction: string;
    contact: string;
    coin: string;
  };
}

const companies = [
  {
    coverImage: "/cover.jpg",
    logoImage: "/avt.jpg",
    name: "CÔNG TY CỔ PHẦN GIAO HÀNG TIẾT KIỆM",
    website: "https://giaohangtietkiem.vn/",
    employees: "10000+ employees",
    introduction:
      "Công ty CP Giao Hàng Tiết Kiệm (GHTK) là công ty công nghệ hoạt động trong lĩnh vực Logistics, chuyên cung cấp các giải pháp giao hàng thông minh, tốc độ cao và linh hoạt – phục vụ cho hơn 1 triệu nhà bán online, khách hàng doanh nghiệp. Thành lập từ 2013, GHTK đã và đang phát triển lớn mạnh, trở thành một trong những đơn vị đầu ngành Logistics tại Việt Nam, phủ sóng rộng khắp 63 tỉnh thành, hơn 11.000 huyện xã, với trên 1500 chi nhánh, bưu cục trên toàn quốc, và quy mô nhân sự trên 30.000 người.",
    contact: "Tòa nhà GHTK Building - Số 8 Phạm Hùng, Mễ Trì, Từ Liêm, Hà Nội",
    coin: "1,490",
  },
];

export default function RecruiterDashboardPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const JOBS_PER_PAGE = 4;
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
      <div className="flex flex-col px-20 py-10 gap-10">
        <div className="rounded-3xl shadow-md">
          <div className="flex flex-col">
            <div className="relative w-full h-56">
              <img
                src={companies[0].coverImage}
                alt="coverImage"
                className="w-full h-full object-cover rounded-t-3xl"
              />
              <img
                src={companies[0].logoImage}
                alt="logo"
                className="absolute object-contain top-30 left-10 w-40 rounded-xl"
              />
            </div>
            <div className="bg-highlight-40 rounded-b-3xl">
              <div className="flex flex-col ml-60 mt-6 mb-4 space-y-2">
                <div className="flex flex-wrap gap-10">
                  <div className="flex gap-2">
                    <Users className="text-primary" />
                    <span className="text-primary">
                      {companies[0].employees}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Unlink2 className="text-primary" />
                    <a href={companies[0].website} className="text-primary">
                      {companies[0].website}
                    </a>
                  </div>
                </div>
                <div className="right-3">
                  <FilePenLine size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-10">
          <CoinBalance />
          <div className="flex-1 bg-highlight-40 rounded-2xl shadow-lg">
            <div className="flex flex-col">
              <div className="flex justify-between px-4 py-2">
                <div className="text-xl text-primary font-semibold">
                  Notification
                </div>
                <a href="/recruiter/notifications">
                  <span className="text-accent font-semibold cursor-pointer">
                    See All
                  </span>
                </a>
              </div>
              <Notification />
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-wrap justify-between bg-highlight-40 rounded-t-3xl px-6 py-2">
            <div className=" text-primary font-semibold text-xl">My Jobs</div>
            <a href="/recruiter/jobs">
              <span className="text-accent font-semibold cursor-pointer">
                See All
              </span>
            </a>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 bg-highlight-20 gap-x-10 gap-y-6 px-20 py-6">
            {currentJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
