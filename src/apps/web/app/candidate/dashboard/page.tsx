"use client";
import { FilePenLine, Mail, Phone, MapPin } from "lucide-react";
import Notification from "../../../components/notification";
import JobCard from "../../../components/job/jobCard";
import usePagination from "../../../hooks/usePagination";
import Pagination from "../../../components/pagination";
import { jobs } from "../../../components/fakeJob";

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

export default function CandidateDashboardPage({ dashboard }: DashboardProps) {
  const { page, maxPage, current, next, prev } = usePagination(jobs, 2);

  return (
    <div className="w-full h-full bg-neutral-light-60">
      <div className="flex flex-col px-20 py-10 gap-10">
        <div className="flex flex-wrap gap-15">
          <div className="flex-1 flex flex-wrap justify-between bg-highlight-20 rounded-2xl">
            <div className="flex flex-wrap">
              <div className="p-4">
                <img
                  src={dashboard?.avt}
                  alt={dashboard?.name}
                  className="w-40 h-44 object-contain rounded-2xl"
                />
              </div>
              <div className="flex flex-col justify-center gap-4 p-4">
                <span className="text-primary text-xl font-semibold">
                  {dashboard?.fullName}
                </span>
                <div className="flex flex-col gap-2">
                  <span className="flex gap-2 text-primary">
                    <Mail size={24} />
                    <span>{dashboard?.email}</span>
                  </span>
                  <span className="flex gap-2 text-primary">
                    <Phone size={24} />
                    <span>{dashboard?.email}</span>
                  </span>
                  <span className="flex gap-2 text-primary">
                    <MapPin size={24} />
                    <span>{dashboard?.email}</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="p-4">
              <FilePenLine size={24} className="text-primary cursor-pointer" />
            </div>
          </div>
          <div className="flex-1 bg-highlight-40 rounded-2xl shadow-lg">
            <div className="flex flex-col">
              <div className="flex justify-between px-4 py-2">
                <div className="text-xl text-primary font-semibold">
                  Notification
                </div>
                <a href="/candidate/notifications">
                  <span className="text-accent font-semibold cursor-pointer">
                    See All
                  </span>
                </a>
              </div>
              <Notification />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-15">
          <div className="flex-1 flex flex-col bg-highlight-20 rounded-2xl p-4 shadow-lg">
            <div className="flex justify-between">
              <span className="text-primary font-semibold text-xl">
                Jobs Applied
              </span>
              <a href="/candidate/jobs-applied">
                <span className="text-accent font-semibold cursor-pointer">
                  See All
                </span>
              </a>
            </div>
            <div className="flex flex-col gap-y-6 px-4 py-4">
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
          <div className="flex-1 flex flex-col bg-highlight-20 rounded-2xl p-4 shadow-lg">
            <div className="flex justify-between">
              <span className="text-primary font-semibold text-xl">
                Jobs Saved
              </span>
              <a href="/candidate/saved-jobs">
                <span className="text-accent font-semibold cursor-pointer">
                  See All
                </span>
              </a>
            </div>
            <div className="flex flex-col gap-y-6 px-4 py-4">
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
