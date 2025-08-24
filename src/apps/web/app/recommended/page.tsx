"use client";
import KeywordSearch from "../../components/keywordSearch";
import { Suspense, useState, useEffect } from "react";
import { JobRecommendation, getRecommendedJobs, generateRecommendations } from "../../services/recommend";
import JobItem from "../../components/job/jobItem";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import PaginationComponent from "../../components/PaginationComponent";
import { getDaysAgo } from "../../utils/dateUtils";

const adaptJobForComponent = (job: JobRecommendation) => {
  const salaryText = `${parseInt(job.salary_min).toLocaleString()} - ${parseInt(
    job.salary_max
  ).toLocaleString()} ${job.currency || "VND"}`;

  return {
    id: job.id,
    logo: "/logo.png",
    name: job.title,
    title: job.title,
    company_name: job.company_name || "Unknown Company",
    province: job.province,
    experience: job.experience_level,
    salary: salaryText,
    postedAt: getDaysAgo(job.created_at),
    is_salary_negotiable: job.is_salary_negotiable,
    status: job.approved_by ? "approved" : "pending",
    match_score: job.match_score,
  };
};

function RecommendedPageContent() {
  const [jobs, setJobs] = useState<JobRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 0,
    hasNextPage: false,
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const filters = {
    page: parseInt(searchParams.get("page") || "1"),
    limit: 10,
    location: searchParams.get("location") || undefined,
    keyword: searchParams.get("keyword") || undefined,
  };

  const loadRecommendedJobs = async (params?: any) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await getRecommendedJobs(params || filters);
      
      if (response.success && response.data) {
        setJobs(response.data);
        if (response.pagination) {
          setPagination({
            currentPage: response.pagination.page,
            totalPages: response.pagination.totalPages,
            hasNextPage: response.pagination.hasNextPage,
          });
        }
      } else {
        setError(response.message || 'Could not load recommended job list');
      }
    } catch (err) {
      setError('Network connection error');
      console.error('Error loading recommended jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateRecommendations = async () => {
    try {
      setGenerating(true);
      const response = await generateRecommendations();
      
      if (response.success) {
        await loadRecommendedJobs();
      } else {
        setError(response.message || 'Could not generate job recommendations');
      }
    } catch (err) {
      setError('Could not generate job recommendations');
      console.error('Error generating recommendations:', err);
    } finally {
      setGenerating(false);
    }
  };

  const handlePageChange = async (page: number) => {
    const newParams = { ...filters, page };
    await loadRecommendedJobs(newParams);
  };

  const initializeRecommendations = async () => {
    try {
      setLoading(true);
      setError(null);
      
      generateRecommendations().catch(err => {
        console.error('Background generate failed:', err);
      });
      const jobsResponse = await getRecommendedJobs(filters);
      
      if (jobsResponse.success && jobsResponse.data && jobsResponse.data.length > 0) {
        setJobs(jobsResponse.data);
        if (jobsResponse.pagination) {
          setPagination({
            currentPage: jobsResponse.pagination.page,
            totalPages: jobsResponse.pagination.totalPages,
            hasNextPage: jobsResponse.pagination.hasNextPage,
          });
        }
      } else {
        setJobs([]);
      }
    } catch (err) {
      setError('Network connection error');
      console.error('Error initializing recommendations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initializeRecommendations();
  }, [searchParams]);

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
            Access 60,000+ job postings daily from thousands of reputable businesses in Vietnam
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
            {/* <div className="flex flex-wrap justify-between gap-4 p-4">
              <div className="flex flex-wrap justify-between items-center bg-highlight-40 rounded-2xl gap-x-60 p-4 flex-1">
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
            </div> */}
            <div className="px-6 pb-4">
              {jobs.length > 0 ? (
                <>
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-10 p-4">
                    {jobs.map((job: JobRecommendation) => (
                      <div key={job.id} className="relative">
                        <JobItem job={adaptJobForComponent(job)} />
                        <div className="absolute top-2 right-2 bg-accent-80 text-white px-2 py-1 rounded-full text-sm font-semibold">
                          Match Score: {job.match_score}
                        </div>
                      </div>
                    ))}
                  </div>
                  {pagination.totalPages > 1 && (
                    <PaginationComponent
                      currentPage={pagination.currentPage}
                      totalPages={pagination.totalPages}
                      hasNextPage={pagination.hasNextPage}
                      onPageChange={handlePageChange}
                      loading={loading}
                    />
                  )}
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-primary text-lg mb-2">
                    No matching jobs found
                  </p>
                  <p className="text-primary-80 text-sm mb-4">
                    You may need to complete your profile or there are no jobs matching your skills
                  </p>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => router.push('/candidate/profile')}
                      className="bg-accent-80 hover:bg-accent text-background font-semibold rounded-full px-6 py-2 transition-colors cursor-pointer"
                    >
                      Update Profile
                    </button>
                    <button
                      onClick={handleGenerateRecommendations}
                      disabled={generating}
                      className="bg-highlight-60 hover:bg-highlight text-primary font-semibold rounded-full px-6 py-2 transition-colors disabled:opacity-50 cursor-pointer"
                    >
                      {generating ? 'Generating...' : 'Generate Again'}
                    </button>
                  </div>
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
