import React, { useState } from 'react';
import { useJobsPagination } from '../hooks/useJobsPagination';
import PaginationComponent from './PaginationComponent';
import LoadMoreButton from './LoadMoreButton';
import JobCard from './job/jobCard';
import { Job } from '../services/jobs';
import { DEFAULT_LOGO_IMAGE } from '../constants/imgConstants';

interface JobsListWithPaginationProps {
  paginationType?: 'pagination' | 'infinite-scroll';
  limit?: number;
  className?: string;
}

// Transform Job data to match JobCard interface
const transformJobForCard = (job: Job) => ({
  id: job.id,
  title: job.title,
  company_name: job.company_name || 'Unknown Company',
  salary_min: job.salary_min,
  salary_max: job.salary_max,
  currency: job.currency,
  province: job.province,
  logo: DEFAULT_LOGO_IMAGE,
  name: job.company_name || 'Unknown Company',
  status: job.status,
  created_at: new Date(job.created_at),
  is_saved: false,
  is_applied: false,
  fromApplied: false
});

export const JobsListWithPagination: React.FC<JobsListWithPaginationProps> = ({
  paginationType = 'pagination',
  limit = 10,
  className = ''
}) => {
  const {
    jobs,
    loading,
    error,
    hasNextPage,
    currentPage,
    totalPages,
    loadNextPage,
    loadPage,
    refresh,
    reset
  } = useJobsPagination({
    limit,
    autoLoad: true
  });

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={refresh}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
             {/* Jobs List */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {jobs.map((job: Job) => (
           <JobCard key={job.id} job={transformJobForCard(job)} />
         ))}
       </div>

      {/* Loading State */}
      {loading && jobs.length === 0 && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}

      {/* No Jobs */}
      {!loading && jobs.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No jobs found</p>
        </div>
      )}

               {paginationType === 'pagination' && (
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            hasNextPage={hasNextPage}
            onPageChange={loadPage}
            loading={loading}
            className="mt-8"
          />
        )}

      {/* Infinite Scroll Load More */}
      {paginationType === 'infinite-scroll' && (
        <LoadMoreButton
          onClick={loadNextPage}
          loading={loading}
          hasNextPage={hasNextPage}
          className="mt-8"
        />
      )}

      {/* Debug Info (remove in production) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-8 p-4 bg-gray-100 rounded-lg text-sm">
          <p>Current Page: {currentPage}</p>
          <p>Total Pages: {totalPages}</p>
          <p>Has Next Page: {hasNextPage ? 'Yes' : 'No'}</p>
          <p>Jobs Count: {jobs.length}</p>
          <p>Loading: {loading ? 'Yes' : 'No'}</p>
        </div>
      )}
    </div>
  );
};

export default JobsListWithPagination;
