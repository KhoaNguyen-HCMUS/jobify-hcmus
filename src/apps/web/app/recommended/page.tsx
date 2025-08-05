"use client";
import JobCard from "../../components/job/jobCard";
import KeywordSearch from "../../components/keywordSearch";
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import usePagination from "../../hooks/usePagination";
import Pagination from "../../components/pagination";
import { getAllJobs, Job } from "../../services/jobs";
import { toast } from 'react-toastify';
import { useSearchParams } from 'next/navigation';

const adaptJobForComponent = (job: Job) => {
  return {
    id: job.id,
    logo: "/logo.png",
    name: job.title,
    title: job.title,
    company_name: job.company_name,
    salary_min: job.salary_min,
    salary_max: job.salary_max,
    currency: job.currency || 'VNĐ',
    province: job.province,
    status: job.status,
    created_at: new Date(job.created_at),
    is_saved: false
  };
};

export default function RecommendedPage() {
  const searchParams = useSearchParams();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);

  // Get URL params
  const keyword = searchParams.get('keyword');
  const location = searchParams.get('location');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await getAllJobs();
        if (response.success && response.data) {
          const sortedJobs = response.data.sort((a, b) => 
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
          setJobs(sortedJobs);
          
          // Apply filters based on URL params
          let filtered = sortedJobs;
          
          if (keyword && keyword.trim()) {
            const searchTerm = keyword.toLowerCase();
            filtered = filtered.filter(job => {
              const jobTitle = job.title.toLowerCase();
              const jobDescription = job.description?.toLowerCase() || '';
              return jobTitle.includes(searchTerm) || jobDescription.includes(searchTerm);
            });
          }
          
          if (location && location !== 'All locations') {
            filtered = filtered.filter(job => job.province === location);
          }
          
          setFilteredJobs(filtered);
        } else {
          toast.error(response.message || 'Unable to load job list');
        }
      } catch (error) {
        toast.error('Error loading data');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [keyword, location]);



  const adaptedJobs = filteredJobs.map(adaptJobForComponent);
  const { page, maxPage, current, next, prev } = usePagination(adaptedJobs, 10);

  if (loading) {
    return (
      <div className="bg-neutral-light-40 min-h-screen flex items-center justify-center">
        <div className="text-primary text-xl">Loading...</div>
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
              {current.length > 0 ? (
                <>
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-10 p-4">
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
