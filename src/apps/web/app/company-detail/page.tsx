"use client";
import { MapPin, Search, Unlink2, Users } from "lucide-react";
import GoBack from "../../components/goBack";
import { useState } from "react";
import JobCard from "../../components/job/jobCard";
import LeftArrow from "../../components/arrowLeft";
import RightArrow from "../../components/arrowRight";

// interface CompanyProps {
//   company: {
//     coverImage: string;
//     logoImage: string;
//     name: string;
//     website: string;
//     employees: string;
//     introduction: string;
//     contact: string;
//   };
// }

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
  },
];

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

export default function CompanyDetailPage() {
  const [keyword, setKeyword] = useState("");
  const [address, setAddress] = useState("");

  const handleFind = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Key word: ", keyword);
    console.log("Address: ", address);
  };

  const [currentPage, setCurrentPage] = useState(1);

  const JOBS_PER_PAGE = 6; // 3x2
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
    <div className="mx-10">
      <GoBack />
      <div className="rounded-3xl shadow-md mx-10 mt-6">
        <div className="flex flex-col">
          <div className="relative w-full h-72">
            <img
              src={companies[0].coverImage}
              alt="coverImage"
              className="w-full h-full object-cover rounded-t-3xl"
            />
            <img
              src={companies[0].logoImage}
              alt="logo"
              className="absolute object-contain top-60 left-20 w-30 rounded-3xl"
            />
          </div>
          <div className="bg-highlight-40 rounded-b-3xl">
            <div className="flex flex-col ml-60 mt-6 mb-10 space-y-6">
              <span className="text-primary text-2xl font-semibold">
                {companies[0].name}
              </span>
              <div className="flex flex-wrap gap-10">
                <div className="flex gap-2">
                  <Unlink2 className="text-primary" />
                  <a href={companies[0].website} className="text-primary">
                    {companies[0].website}
                  </a>
                </div>
                <div className="flex gap-2">
                  <Users className="text-primary" />
                  <span className="text-primary">{companies[0].employees}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap m-10 gap-20">
        <div className="flex-2 shadow-md rounded-3xl bg-neutral-light-20 space-y-4">
          <div className="flex flex-col space-y-4">
            <span className="w-full rounded-t-3xl text-background font-semibold text-2xl px-6 py-4 bg-secondary">
              Company Introduction
            </span>
            <p className="text-primary px-6 mb-4">
              {companies[0].introduction}
            </p>
          </div>
        </div>
        <div className="flex-1 shadow-md rounded-3xl bg-neutral-light-20 space-y-4">
          <div className="flex flex-col space-y-4">
            <span className="w-full rounded-t-3xl text-background font-semibold text-2xl px-6 py-4 bg-secondary">
              Contact Information
            </span>
            <span className="flex px-6">
              <MapPin className="text-primary font-semibold" />
              <p className="text-primary font-semibold">Địa chỉ công ty</p>
            </span>
            <p className="text-primary px-6 mb-4">{companies[0].contact}</p>
          </div>
        </div>
      </div>
      <div className="mx-10 mb-20">
        <div className="shadow-md rounded-3xl bg-neutral-light-20 space-y-4">
          <div className="flex flex-col items-center space-y-4">
            <span className="w-full rounded-t-3xl text-background font-semibold text-2xl px-6 py-4 bg-secondary">
              Job News
            </span>
            <div className="flex flex-col mt-6">
              <div className="flex items-center">
                <form onSubmit={handleFind}>
                  <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-10 mb-16 ml-14">
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
                    <div className="relative mr-10">
                      <button
                        type="submit"
                        className="cursor-pointer absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-20 font-semibold text-2xl bg-secondary px-6 py-3.5 rounded-md"
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div>
                <div className="mx-7">
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-10">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
