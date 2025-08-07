"use client";
import { useState, useEffect } from "react";
import JobCard from "../../../components/job/jobCard";
import usePagination from "../../../hooks/usePagination";
import Pagination from "../../../components/pagination";
import { getSavedJobs, Job } from "../../../services/jobs";
import ProtectedRoute from "../../../components/ProtectedRoute";
import { Bookmark } from "lucide-react";

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
  is_saved: true, 
});

function SavedJobsContent() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        setIsLoading(true);
        const response = await getSavedJobs();
        
        if (response.success && response.data) {
          const sortedJobs = response.data.sort((a, b) => 
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
          setJobs(sortedJobs);
        } else {
          if (response.message === 'Authentication required') {
            setError('Please login to view saved jobs');
          } else {
            setError(response.message || 'Failed to fetch saved jobs');
          }
        }
      } catch (error) {
        setError('Network error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSavedJobs();
  }, []);

  const { page, maxPage, current, next, prev } = usePagination(jobs, 12);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-neutral-light-60">
        <div className="flex flex-col px-6 lg:px-20 py-10 gap-6">
          <div className="flex justify-center items-center h-64">
            <div className="text-primary text-lg">Loading saved jobs...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen bg-neutral-light-60">
        <div className="flex flex-col px-6 lg:px-20 py-10 gap-6">
          <div className="flex justify-center items-center h-64">
            <div className="text-red-500 text-lg">Error: {error}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-neutral-light-60">
      <div className="flex flex-col px-6 lg:px-20 py-10 gap-6">
        <div className="flex items-center gap-3 mb-6">
          <Bookmark className="text-primary" size={32} />
          <h1 className="text-3xl font-bold text-primary">Saved Jobs</h1>
        </div>

        <div className="text-gray-600">
          You have {jobs.length} saved job{jobs.length !== 1 ? 's' : ''}
        </div>

        {jobs.length > 0 ? (
          <>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {current.map((job) => (
                <JobCard key={job.id} job={transformJobForCard(job)} />
              ))}
            </div>
            
            <div className="py-8">
              <Pagination
                page={page}
                maxPage={maxPage}
                onNext={next}
                onPrev={prev}
              />
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No saved jobs yet
            </h3>
            <p className="text-gray-500 mb-6">
              Start saving jobs you're interested in by clicking the heart icon
            </p>
            <a
              href="/jobs"
              className="bg-accent text-white px-6 py-3 rounded-lg hover:bg-accent/90 transition-colors inline-block"
            >
              Browse Jobs
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SavedJobsPage() {
  return (
    <ProtectedRoute allowedRoles={['candidate']}>
      <SavedJobsContent />
    </ProtectedRoute>
  );
}
