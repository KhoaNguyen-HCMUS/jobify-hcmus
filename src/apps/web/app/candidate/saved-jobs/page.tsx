"use client";
import JobCard from "../../../components/job/jobCard";
import RejectPendingSearch from "../../../components/rejectPendingSearch";
import usePagination from "../../../hooks/usePagination";
import Pagination from "../../../components/pagination";
import { jobs } from "../../../components/fakeJob";

export default function CandidateJobsSavedPage() {
  const { page, maxPage, current, next, prev } = usePagination(jobs, 8);

  return (
    <div className="w-full h-full bg-neutral-light-60">
      <div className="flex flex-col px-20 py-10 gap-6">
        <RejectPendingSearch />
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-4">
          {current.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
        <Pagination page={page} maxPage={maxPage} onNext={next} onPrev={prev} />
      </div>
    </div>
  );
}
