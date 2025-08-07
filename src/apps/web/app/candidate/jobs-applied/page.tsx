"use client";
import { useState, useEffect } from "react";
import JobCard from "../../../components/job/jobCard";
import RejectPendingSearch from "../../../components/rejectPendingSearch";
import usePagination from "../../../hooks/usePagination";
import Pagination from "../../../components/pagination";
import { getAppliedJobs, AppliedJob } from "../../../services/jobs";
import ProtectedRoute from "../../../components/ProtectedRoute";
import { Briefcase } from "lucide-react";

const transformAppliedJobForCard = (appliedJob: AppliedJob) => ({
  id: appliedJob.id,
  title: appliedJob.title,
  company_name: appliedJob.company_name || null,
  salary_min: appliedJob.salary_min,
  salary_max: appliedJob.salary_max,
  currency: appliedJob.currency,
  province: appliedJob.province,
  logo: "/logo.png", 
  name: appliedJob.title, 
  status: appliedJob.status,
  created_at: new Date(),
  is_saved: false,
  is_applied: true,
  fromApplied: true,
  application_id: appliedJob.application_id, 
});

function JobsAppliedContent() {
  const [appliedJobs, setAppliedJobs] = useState<AppliedJob[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        setIsLoading(true);
        const response = await getAppliedJobs();
        
        if (response.success && response.data) {
          const sortedJobs = response.data.sort((a, b) => 
            b.application_id.localeCompare(a.application_id)
          );
          setAppliedJobs(sortedJobs);
        } else {
          if (response.message === 'Authentication required') {
            setError('Please login to view applied jobs');
          } else {
            setError(response.message || 'Failed to fetch applied jobs');
          }
        }
      } catch (error) {
        setError('Network error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppliedJobs();
  }, []);

  const { page, maxPage, current, next, prev } = usePagination(appliedJobs, 12);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-neutral-light-60">
        <div className="flex flex-col px-6 lg:px-20 py-10 gap-6">
          <div className="flex justify-center items-center h-64">
            <div className="text-primary text-lg">Loading applied jobs...</div>
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
          <Briefcase className="text-primary" size={32} />
          <h1 className="text-3xl font-bold text-primary">Applied Jobs</h1>
        </div>

        <RejectPendingSearch />

        <div className="text-gray-600">
          You have {appliedJobs.length} applied job{appliedJobs.length !== 1 ? 's' : ''}
        </div>

        {appliedJobs.length > 0 ? (
          <>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
              {current.map((appliedJob) => (
                <JobCard key={appliedJob.application_id} job={transformAppliedJobForCard(appliedJob)} />
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
              No applied jobs yet
            </h3>
            <p className="text-gray-500 mb-6">
              Start applying to jobs you're interested in
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

export default function CandidateJobsAppliedPage() {
  return (
    <ProtectedRoute allowedRoles={['candidate']}>
      <JobsAppliedContent />
    </ProtectedRoute>
  );
}
