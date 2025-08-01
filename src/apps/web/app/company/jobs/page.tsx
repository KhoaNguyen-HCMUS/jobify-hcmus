"use client";
import { useState, useEffect } from "react";
import JobCard from "../../../components/job/jobCard";
import { Plus } from "lucide-react";
import usePagination from "../../../hooks/usePagination";
import Pagination from "../../../components/pagination";
import KeyWord from "../../../components/keyWord";
import { jobs } from "../../../components/fakeJob";
import JobPostModal from "../../../components/job/jobPostModal";

export default function RecruiterJobsSavedPage() {
  const { page, maxPage, current, next, prev } = usePagination(jobs, 8);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div className="w-full h-full bg-neutral-light-60">
      <div className="flex flex-col px-20 py-10 gap-6">
        <div className="flex justify-between">
          <button
            onClick={() => setIsOpen(true)}
            className="border-2 border-secondary text-secondary font-semibold rounded-full flex items-center px-4 hover:bg-secondary hover:text-accent-20 transition cursor-pointer"
          >
            <Plus size={24} />
            <span>Post new job</span>
          </button>
          <KeyWord />
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-4">
          {current.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
        <Pagination page={page} maxPage={maxPage} onNext={next} onPrev={prev} />
      </div>
      
      <JobPostModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
