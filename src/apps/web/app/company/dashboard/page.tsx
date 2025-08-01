"use client";
import { FilePenLine, Unlink2, Users } from "lucide-react";
import Notification from "../../../components/notification";
import JobCard from "../../../components/job/jobCard";
import usePagination from "../../../hooks/usePagination";
import Pagination from "../../../components/pagination";
import { jobs } from "../../../components/fakeJob";

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

const Stat = ({
  value,
  label,
  color,
}: {
  value: string;
  label: string;
  color: string;
}) => (
  <div className={`flex flex-col items-center font-bold text-[${color}]`}>
    <span
      className="w-16 h-16 flex items-center justify-center text-2xl rounded-full border-2 bg-neutral-light-20"
      style={{ borderColor: color }}
    >
      {value}
    </span>
    <span className="mt-1">{label}</span>
  </div>
);

export default function RecruiterDashboardPage({ company }: CompanyProps) {
  const { page, maxPage, current, next, prev } = usePagination(jobs, 4);

  return (
    <div className="w-full h-full bg-neutral-light-60">
      <div className="flex flex-col px-6 lg:px-20 py-10 gap-10">
        {/* Company Header */}
        <div className="rounded-3xl shadow-md">
          <div className="flex flex-col">
            <div className="relative w-full h-56">
              <img
                src={company?.coverImage}
                alt="coverImage"
                className="w-full h-full object-cover rounded-t-3xl"
              />
              <img
                src={company?.logoImage}
                alt="logo"
                className="absolute object-contain top-28 left-10 w-20 sm:w-24 md:w-28 lg:w-32 aspect-square rounded-xl mx-auto"
              />
            </div>
            <div className="flex bg-accent-20 rounded-b-3xl">
              <div className="flex-2"></div>
              <div className="flex-5">
                <div className="flex flex-col mb-4 space-y-2 font-semibold text-primary">
                  <div className="text-lg">{company?.name}</div>
                  <div className="flex flex-wrap justify-between gap-10">
                    <div className="flex items-center gap-2">
                      <Users />
                      <span>{company?.employees}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Unlink2 />
                      <a href={company?.website}>{company?.website}</a>
                    </div>
                    <a href="/company/profile/edit" className="px-4">
                      <FilePenLine size={24} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1 flex flex-col justify-center items-center gap-6">
            <div className="flex justify-center gap-12 flex-wrap">
              <Stat value="10" label="Job Posts" color="#1C1C50" />
              <Stat value="5" label="Active Jobs" color="#26B709" />
              <Stat value="5" label="Expired Jobs" color="#F52121" />
            </div>
            <div className="flex justify-center gap-12 flex-wrap">
              <Stat value="95" label="Applications" color="#0C53DE" />
              <Stat value="250" label="Coins" color="#DD8D0E" />
            </div>
          </div>
          {/* Notification */}
          <div className="flex-1 bg-neutral-light-60 rounded-2xl overflow-hidden">
            <div className="flex flex-wrap justify-between px-4 py-2 bg-primary text-white">
              <div className="text-xl font-semibold">Notification</div>
              <a href="/company/notifications" className="font-semibold">
                See All
              </a>
            </div>
            <Notification />
          </div>
        </div>
        {/* Job List */}
        <div>
          <div className="flex flex-wrap justify-between bg-primary rounded-t-3xl px-6 py-2">
            <div className=" text-accent-20 font-semibold text-xl">My Jobs</div>
            <a href="/company/jobs">
              <span className="text-highlight-40 font-semibold">See All</span>
            </a>
          </div>
          <div className="bg-highlight-20 pb-6 rounded-b-3xl">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 lg:px-20 py-6">
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
  );
}
