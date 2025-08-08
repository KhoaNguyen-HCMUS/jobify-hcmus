"use client";
import { MapPin, Search, Unlink2, Users } from "lucide-react";
import { useState, useEffect } from "react";
import JobCard from "../../components/job/jobCard";
import usePagination from "../../hooks/usePagination";
import Pagination from "../../components/pagination";
import { useParams } from "next/navigation";
import { jobs } from "../../components/fakeJob";
import { companies } from "../../components/fakeCompany";

interface CompanyProps {
  company: {
    coverImage: string;
    logoImage: string;
    title: string;
    website: string;
    employees: string;
    introduction: string;
    contact: string;
  };
}

export default function CompanyDetail() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [company, setCompany] = useState<any>(null);

  useEffect(() => {
    const companyFound = companies.find((j) => j.id === Number(id));
    setCompany(companyFound ?? null);
  }, [id]);

  const { page, maxPage, current, next, prev } = usePagination(jobs, 6);

  const [keyword, setKeyword] = useState("");
  const [address, setAddress] = useState("");

  const handleFind = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Key word: ", keyword);
    console.log("Address: ", address);
  };

  return (
    <div>
      <div className="rounded-3xl shadow-md mx-10 mt-6">
        <div className="flex flex-col">
          <div className="relative w-full h-72">
            <img
              src={company?.coverImage}
              alt="coverImage"
              className="w-full h-full object-cover rounded-t-3xl"
            />
            <img
              src={company?.logoImage}
              alt="logo"
              className="absolute object-contain top-60 left-20 w-30 rounded-3xl"
            />
          </div>
          <div className="bg-highlight-40 rounded-b-3xl">
            <div className="flex flex-col ml-60 mt-6 mb-10 space-y-6">
              <span className="text-primary text-2xl font-semibold">
                {company?.title}
              </span>
              <div className="flex flex-wrap gap-10">
                <div className="flex gap-2">
                  <Unlink2 className="text-primary" />
                  <a href={company?.website} className="text-primary">
                    {company?.website}
                  </a>
                </div>
                <div className="flex gap-2">
                  <Users className="text-primary" />
                  <span className="text-primary">{company?.employees}</span>
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
            <p className="text-primary px-6 mb-4">{company?.introduction}</p>
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
            <p className="text-primary px-6 mb-4">{company?.contact}</p>
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
                    {/* {current.map((job) => (
                      <JobCard key={job.id} job={job} />
                    ))} */}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
