"use client";
import { useState, useEffect } from "react";
import JobCard from "../../../components/job/jobCard";
import { Plus } from "lucide-react";
import usePagination from "../../../hooks/usePagination";
import Pagination from "../../../components/pagination";
import KeyWord from "../../../components/keyWord";
import ProtectedRoute from "../../../components/ProtectedRoute";
import { getJobsByCompany, Job } from "../../../services/jobs";

const transformJobForCard = (job: Job) => ({
  id: job.id,
  title: job.title,
  company_name: job.company_name || null,
  salary_min: job.salary_min,
  salary_max: job.salary_max,
  currency: job.currency,
  province: job.province,
  logo: "/logo.png",
  name: job.title,
  status: job.status,
  created_at: new Date(job.created_at),
});

function RecruiterJobsContent() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchCompanyJobs = async () => {
      try {
        setIsLoading(true);

        const response = await getJobsByCompany();
        if (response.success && response.data) {
          const sortedJobs = response.data.sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          );
          setJobs(sortedJobs);
        } else {
          setError(response.message || "Failed to fetch jobs");
        }
      } catch (error) {
        setError("Network error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanyJobs();
  }, []);

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

  const { page, maxPage, current, next, prev } = usePagination(jobs, 8);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen h-full bg-neutral-light-60">
        <div className="flex flex-col px-20 py-10 gap-6">
          <div className="flex justify-center items-center h-64">
            <div className="text-primary text-lg">Loading your jobs...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen h-full bg-neutral-light-60">
        <div className="flex flex-col px-20 py-10 gap-6">
          <div className="flex justify-center items-center h-64">
            <div className="text-red-500 text-lg">Error: {error}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen h-full bg-neutral-light-60">
      <div className="flex flex-col px-20 py-10 gap-6">
        <div className="flex justify-between">
          <a
            href="/company/post"
            className="border-2 border-secondary text-secondary font-semibold rounded-full flex items-center px-4 hover:bg-secondary hover:text-accent-20 transition cursor-pointer"
          >
            <Plus size={24} />
            <span>Post New Job</span>
          </a>
          <KeyWord />
        </div>

        {/* Jobs Count */}
        <div className="text-gray-600">
          You have {jobs.length} job posting{jobs.length !== 1 ? "s" : ""}
        </div>

        {/* Jobs Grid */}
        {jobs.length > 0 ? (
          <>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-4">
              {current.map((job) => (
                <JobCard key={job.id} job={transformJobForCard(job)} />
              ))}
            </div>
            <Pagination
              page={page}
              maxPage={maxPage}
              onNext={next}
              onPrev={prev}
            />
          </>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No jobs posted yet
            </h3>
            <p className="text-gray-500 mb-6">
              Start by posting your first job to attract candidates
            </p>
            <button
              onClick={() => setIsOpen(true)}
              className="bg-accent text-white px-6 py-3 rounded-lg hover:bg-accent/90 transition-colors"
            >
              Post Your First Job
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function RecruiterJobsSavedPage() {
  return (
    <ProtectedRoute allowedRoles={["company"]}>
      <RecruiterJobsContent />
    </ProtectedRoute>
  );
}
