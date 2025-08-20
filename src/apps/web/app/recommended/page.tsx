"use client";
import KeywordSearch from "../../components/keywordSearch";
import { Suspense } from "react";
import { ChevronDown } from "lucide-react";
import { Job } from "../../services/jobs";
import { useJobsPagination } from "../../hooks/useJobsPagination";
import PaginationComponent from "../../components/PaginationComponent";
import JobItem from "../../components/job/jobItem";

const adaptJobForComponent = (job: Job) => {
  const salaryText = `${parseInt(job.salary_min).toLocaleString()} - ${parseInt(
    job.salary_max
  ).toLocaleString()} ${job.currency || "VNĐ"}`;

  const postedDate = new Date(job.created_at);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - postedDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const postedAtText = diffDays === 1 ? "1 day ago" : `${diffDays} days ago`;

  return {
    id: job.id,
    logo: "/logo.png",
    name: job.title,
    title: job.title,
    company_name: job.company_name || "Unknown Company",
    province: job.province,
    experience: job.experience_level,
    salary: salaryText,
    postedAt: postedAtText,
    is_salary_negotiable: job.is_salary_negotiable,
    status: job.approved_by ? "approved" : "pending",
  };
};

function RecommendedPageContent() {
  const {
    jobs,
    loading,
    error,
    hasNextPage,
    currentPage,
    totalPages,
    loadPage,
  } = useJobsPagination({ limit: 10, autoLoad: true });

  if (loading && jobs.length === 0) {
    return (
      <div className="bg-neutral-light-40 min-h-screen flex items-center justify-center">
        <div className="text-primary text-xl">Loading...</div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-neutral-light-40 min-h-screen flex items-center justify-center">
        <div className="text-primary text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-light-40 min-h-screen">
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
        <KeywordSearch targetUrl="/recommended" />  
      </div>
      <div className="pt-4">
        <h2 className="font-bold text-3xl text-neutral-light-20 pl-10 py-2 w-full bg-primary">
          <i>Recommended Jobs</i>
        </h2>
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
              <button className="cursor-pointer bg-accent-80 hover:bg-accent text-background font-semibold rounded-full p-4">
                Apply priority
              </button>
            </div>
            <div className="px-6 pb-4">
              {jobs.length > 0 ? (
                <>
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-10 p-4">
                    {jobs.map((job: Job) => (
                      <JobItem key={job.id} job={adaptJobForComponent(job)} />
                    ))}
                  </div>
                  <PaginationComponent
                    currentPage={currentPage}
                    totalPages={totalPages}
                    hasNextPage={hasNextPage}
                    onPageChange={loadPage}
                    loading={loading}
                  />
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-primary text-lg">No recommended jobs available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RecommendedPage() {
  return (
    <Suspense fallback={
      <div className="bg-neutral-light-40 min-h-screen flex items-center justify-center">
        <div className="text-primary text-xl">Loading...</div>
      </div>
    }>
      <RecommendedPageContent />
    </Suspense>
  );
}
