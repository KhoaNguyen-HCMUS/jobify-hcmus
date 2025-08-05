"use client";
import JobItem from "../../components/job/jobItem";
import KeywordSearch from "../../components/keywordSearch";
import { useState, useEffect, Suspense } from "react";
import CategoryGrid from "../../components/categoryGrid";
import MainCategoryItem from "../../components/mainCategoryItem";
import usePagination from "../../hooks/usePagination";
import Pagination from "../../components/pagination";
import { getAllJobs, Job } from "../../services/jobs";
import { getAllIndustries, Industry, getIndustriesByCategory, IndustryCategory } from "../../services/industries";
import { toast } from 'react-toastify';
import { useRouter, useSearchParams } from 'next/navigation';
import { EXPERIENCE_LEVELS, JOB_TYPES } from "../../constants/jobConstants";

const adaptJobForComponent = (job: Job) => {
  const salaryText =`${parseInt(job.salary_min).toLocaleString()} - ${parseInt(job.salary_max).toLocaleString()} ${job.currency || 'VNĐ'}`;
  
  const postedDate = new Date(job.created_at);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - postedDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  const postedAtText = diffDays === 1 ? '1 day ago' : `${diffDays} days ago`;

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
    status: job.approved_by ? "approved" : "pending"
  };
};

function JobsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [industries, setIndustries] = useState<IndustryCategory[]>([]);
  const [industriesLoading, setIndustriesLoading] = useState(true);
  
  // Get URL params
  const industryId = searchParams.get('industry');
  const keyword = searchParams.get('keyword');
  const location = searchParams.get('location');
  const experience = searchParams.get('experience') || "allExperience";
  const salary = searchParams.get('salary') || "allSalary";
  const typeOfWork = searchParams.get('typeOfWork') || "allTypeOfWork";
  
  // Filter jobs based on URL params
  const filteredJobs = jobs.filter(job => {
    // Filter by keyword
    if (keyword && keyword.trim()) {
      const searchTerm = keyword.toLowerCase();
      const jobTitle = job.title.toLowerCase();
      const jobDescription = job.description?.toLowerCase() || '';
      if (!jobTitle.includes(searchTerm) && !jobDescription.includes(searchTerm)) {
        return false;
      }
    }
    
    // Filter by location
    if (location && location !== 'All locations') {
      if (job.province !== location) {
        return false;
      }
    }
    
    // Filter by industry
    if (industryId && industryId !== 'all') {
      if (job.industry_id !== industryId) {
        return false;
      }
    }
    
    if (experience !== "allExperience") {
      if (job.experience_level !== experience) {
        return false;
      }
    }
    
    // Filter by salary
    if (salary !== "allSalary") {
      const minSalary = parseInt(job.salary_min);
      const maxSalary = parseInt(job.salary_max);
      
      // Convert to millions for easier comparison
      const minSalaryM = minSalary / 1000000;
      const maxSalaryM = maxSalary / 1000000;

       if (salary === "lessThan10" && minSalaryM >= 10) {
         return false;
       }
      if (salary === "10-15" && (minSalaryM > 15 || maxSalaryM < 10)) {
        return false;
      }
      if (salary === "15-20" && (minSalaryM > 20 || maxSalaryM < 15)) {
        return false;
      }
      if (salary === "20-25" && (minSalaryM > 25 || maxSalaryM < 20)) {
        return false;
      }
      if (salary === "25-30" && (minSalaryM > 30 || maxSalaryM < 25)) {
        return false;
      }
      if (salary === "30-50" && (minSalaryM > 50 || maxSalaryM < 30)) {
        return false;
      }
      if (salary === "over50" && maxSalaryM < 50) {
        return false;
      }
    }
    
    // Filter by type of work
    if (typeOfWork !== "allTypeOfWork") {
      if (job.job_type !== typeOfWork) {
        return false;
      }
    }
    
    return true;
  });
  
  const adaptedJobs = filteredJobs.map(adaptJobForComponent);
  const { page, maxPage, current, next, prev } = usePagination(adaptedJobs, 9);

  // Update URL params function
  const updateURLParams = (params: Record<string, string>) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    
    Object.entries(params).forEach(([key, value]) => {
      if (value === 'all' || value === 'allExperience' || value === 'allSalary' || value === 'allTypeOfWork') {
        newSearchParams.delete(key);
      } else {
        newSearchParams.set(key, value);
      }
    });
    
    const newURL = `${window.location.pathname}?${newSearchParams.toString()}`;
    router.push(newURL);
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await getAllJobs();
        if (response.success && response.data) {
          setJobs(response.data);
          console.log(response.data);
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
  }, []);

  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        setIndustriesLoading(true);
        const response = await getAllIndustries();
        if (response.success && response.data) {
          const categories = getIndustriesByCategory(response.data);
          setIndustries(categories);
        }
      } catch (error) {
        console.error('Failed to fetch industries:', error);
      } finally {
        setIndustriesLoading(false);
      }
    };

    fetchIndustries();
  }, []);

  if (loading) {
    return (
      <div className="bg-neutral-light-40 min-h-screen flex items-center justify-center">
        <div className="text-primary text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-light-40">
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
        <KeywordSearch />
      </div>
      <div className="pt-4">
        <h2 className="font-bold text-3xl text-neutral-light-20 pl-10 py-2 w-full bg-primary">
          <i>Jobs</i>
        </h2>
        <div className="flex gap-2">
          <div className="flex-1 hidden md:block bg-neutral-light-20 shadow-2xs">
            <div>
                             {industriesLoading ? (
                 <div className="p-4 text-primary">Loading industries...</div>
               ) : (
                <>
                                     <div className="bg-primary text-highlight-20 px-4 py-2 font-semibold">
                     Industries
                   </div>
                   <div className="flex flex-col justify-between hover:bg-neutral-light-80">
                     <button
                       onClick={() => updateURLParams({ industry: 'all' })}
                       className={`flex justify-between items-center cursor-pointer w-full text-left ${
                         !industryId || industryId === 'all' ? 'bg-accent text-white' : ''
                       }`}
                     >
                       <span className="px-4 py-2">All Industries</span>
                     </button>
                   </div>
                                     {industries.map((main) => (
                     <MainCategoryItem 
                       key={main.id} 
                       main={{ 
                         category: main.name,
                         id: main.id,
                         isSelected: industryId === main.id,
                         onSelect: (id: string) => updateURLParams({ industry: id })
                       }} 
                     />
                   ))}
                </>
              )}
            </div>
            <div>
              <div className="bg-primary text-highlight-20 px-4 py-2 font-semibold">
                Experience
              </div>
                             <div className="flex flex-col">
                 <label className="px-4 py-2 text-primary hover:bg-neutral-light-80 cursor-pointer">
                   <input
                     type="radio"
                     name="experience"
                     value="allExperience"
                     checked={experience === "allExperience"}
                     onChange={(e) => updateURLParams({ experience: e.target.value })}
                     className="mr-2 bg-accent accent-accent"
                   />
                   All
                 </label>
                 {EXPERIENCE_LEVELS.map((level) => (
                   <label key={level} className="px-4 py-2 text-primary hover:bg-neutral-light-80 cursor-pointer">
                     <input
                       type="radio"
                       name="experience"
                       value={level}
                       checked={experience === level}
                       onChange={(e) => updateURLParams({ experience: e.target.value })}
                       className="mr-2 bg-accent accent-accent"
                     />
                     {level}
                   </label>
                 ))}
               </div>
            </div>
            <div>
              <div className="bg-primary text-highlight-20 px-4 py-2 font-semibold">
                Salary
              </div>
              <div className="flex flex-col">
                <label className="px-4 py-2 text-primary hover:bg-neutral-light-80 cursor-pointer">
                  <input
                    type="radio"
                    name="salary"
                    value="allSalary"
                    checked={salary === "allSalary"}
                    onChange={(e) => updateURLParams({ salary: e.target.value })}
                    className="mr-2 bg-accent accent-accent"
                  />
                  All
                </label>
                <label className="px-4 py-2 text-primary hover:bg-neutral-light-80 cursor-pointer">
                  <input
                    type="radio"
                    name="salary"
                    value="lessThan10"
                    checked={salary === "lessThan10"}
                    onChange={(e) => updateURLParams({ salary: e.target.value })}
                    className="mr-2 bg-accent accent-accent"
                  />
                  Less than 10 million
                </label>
                <label className="px-4 py-2 text-primary hover:bg-neutral-light-80 cursor-pointer">
                  <input
                    type="radio"
                    name="salary"
                    value="10-15"
                    checked={salary === "10-15"}
                    onChange={(e) => updateURLParams({ salary: e.target.value })}
                    className="mr-2 bg-accent accent-accent"
                  />
                  10-15 million
                </label>
                <label className="px-4 py-2 text-primary hover:bg-neutral-light-80 cursor-pointer">
                  <input
                    type="radio"
                    name="salary"
                    value="15-20"
                    checked={salary === "15-20"}
                    onChange={(e) => updateURLParams({ salary: e.target.value })}
                    className="mr-2 bg-accent accent-accent"
                  />
                  15-20 million
                </label>
                <label className="px-4 py-2 text-primary hover:bg-neutral-light-80 cursor-pointer">
                  <input
                    type="radio"
                    name="salary"
                    value="20-25"
                    checked={salary === "20-25"}
                    onChange={(e) => updateURLParams({ salary: e.target.value })}
                    className="mr-2 bg-accent accent-accent"
                  />
                  20-25 million
                </label>
                <label className="px-4 py-2 text-primary hover:bg-neutral-light-80 cursor-pointer">
                  <input
                    type="radio"
                    name="salary"
                    value="25-30"
                    checked={salary === "25-30"}
                    onChange={(e) => updateURLParams({ salary: e.target.value })}
                    className="mr-2 bg-accent accent-accent"
                  />
                  25-30 million
                </label>
                <label className="px-4 py-2 text-primary hover:bg-neutral-light-80 cursor-pointer">
                  <input
                    type="radio"
                    name="salary"
                    value="30-50"
                    checked={salary === "30-50"}
                    onChange={(e) => updateURLParams({ salary: e.target.value })}
                    className="mr-2 bg-accent accent-accent"
                  />
                  30-50 million
                </label>
                <label className="px-4 py-2 text-primary hover:bg-neutral-light-80 cursor-pointer">
                  <input
                    type="radio"
                    name="salary"
                    value="over50"
                    checked={salary === "over50"}
                    onChange={(e) => updateURLParams({ salary: e.target.value })}
                    className="mr-2 bg-accent accent-accent"
                  />
                  Over 50 million
                </label>
              </div>
            </div>
            <div>
              <div className="bg-primary text-highlight-20 px-4 py-2 font-semibold">
                Type of work
              </div>
                             <div className="flex flex-col">
                 <label className="px-4 py-2 text-primary hover:bg-neutral-light-80 cursor-pointer">
                   <input
                     type="radio"
                     name="typeOfWork"
                     value="allTypeOfWork"
                     checked={typeOfWork === "allTypeOfWork"}
                     onChange={(e) => updateURLParams({ typeOfWork: e.target.value })}
                     className="mr-2 bg-accent accent-accent"
                   />
                   All
                 </label>
                 {JOB_TYPES.map((type) => (
                   <label key={type} className="px-4 py-2 text-primary hover:bg-neutral-light-80 cursor-pointer">
                     <input
                       type="radio"
                       name="typeOfWork"
                       value={type}
                       checked={typeOfWork === type}
                       onChange={(e) => updateURLParams({ typeOfWork: e.target.value })}
                       className="mr-2 bg-accent accent-accent"
                     />
                     {type}
                   </label>
                 ))}
               </div>
            </div>
          </div>
          <div className="flex-3">
            {current.length > 0 ? (
              <>
                {current.map((job) => (
                  <JobItem key={job.id} job={job} />
                ))}
                <div className="py-4">
                  <Pagination
                    page={page}
                    maxPage={maxPage}
                    onNext={next}
                    onPrev={prev}
                  />
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-primary text-lg">No jobs available</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        <h2 className="font-bold text-3xl text-neutral-light-20 pl-10 py-2 w-full bg-primary">
          <i>Top Outstanding Industries</i>
        </h2>
        <CategoryGrid />
      </div>
    </div>
  );
}

export default function JobsPage() {
  return (
    <Suspense fallback={
      <div className="bg-neutral-light-40 min-h-screen flex items-center justify-center">
        <div className="text-primary text-xl">Loading...</div>
      </div>
    }>
      <JobsPageContent />
    </Suspense>
  );
}
