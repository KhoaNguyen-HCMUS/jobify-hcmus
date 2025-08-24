"use client";
import { useJobsPagination } from "../../hooks/useJobsPagination";
import PaginationComponent from "../../components/PaginationComponent";
import { DEFAULT_LOGO_IMAGE } from "../../constants/imgConstants";
import { Job } from "../../services/jobs";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getAllIndustries } from "../../services/industries";
import { getIndustriesByCategory } from "../../services/industries";
import { IndustryCategory } from "../../services/industries";
import {
  EXPERIENCE_LEVELS,
  EDUCATION_LEVELS,
} from "../../constants/jobConstants";
import { JOB_TYPES } from "../../constants/jobConstants";
import CategoryGrid from "../../components/categoryGrid";
import MainCategoryItem from "../../components/mainCategoryItem";
import KeywordSearch from "../../components/keywordSearch";
import JobItem from "../../components/job/jobItem";
import { Suspense } from "react";

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

function JobsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Local state only for industries sidebar
  const [industries, setIndustries] = useState<IndustryCategory[]>([]);
  const [industriesLoading, setIndustriesLoading] = useState(true);

  // Get URL params
  const industryId = searchParams.get("industry");
  const keyword = searchParams.get("keyword");
  const location = searchParams.get("location");
  const experience = searchParams.get("experience") || "allExperience";
  const salary = searchParams.get("salary") || "allSalary";
  const typeOfWork = searchParams.get("typeOfWork") || "allTypeOfWork";
  const education = searchParams.get("education") || "allEducation";
  // Build filters for API
  const mapSalaryFilter = (value: string | null) => {
    if (!value || value === "allSalary") return undefined;
    if (value === "lessThan10") return "0-10";
    if (value === "over50") return "50+";
    return value; // e.g. "10-15", "15-20", etc.
  };

  // Transform Job data to match JobCard interface
  const transformJobForCard = (job: Job) => ({
    id: job.id,
    title: job.title,
    company_name: job.company_name || "Unknown Company",
    salary_min: job.salary_min,
    salary_max: job.salary_max,
    currency: job.currency,
    province: job.province,
    logo: DEFAULT_LOGO_IMAGE,
    name: job.company_name || "Unknown Company",
    status: job.status,
    created_at: new Date(job.created_at),
    is_saved: false,
    is_applied: false,
    fromApplied: false,
  });

  // Use the new pagination hook
  const {
    jobs: paginatedJobs,
    loading: paginationLoading,
    error: paginationError,
    hasNextPage,
    currentPage,
    totalPages,
    loadNextPage,
    loadPage,
    refresh,
    reset,
  } = useJobsPagination({
    limit: 15,
    autoLoad: true,
    filters: {
      salary: mapSalaryFilter(salary),
      exp: experience !== "allExperience" ? experience : undefined,
      edu: education !== "allEducation" ? education : undefined,
      type: typeOfWork !== "allTypeOfWork" ? typeOfWork : undefined,
      location: location && location !== "All locations" ? location : undefined,
      keyword: keyword || undefined,
      industry: industryId && industryId !== "all" ? industryId : undefined,
    },
  });

  // Update URL params function
  const updateURLParams = (params: Record<string, string>) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (
        value === "all" ||
        value === "allExperience" ||
        value === "allSalary" ||
        value === "allTypeOfWork" ||
        value === "allEducation"
      ) {
        newSearchParams.delete(key);
      } else {
        newSearchParams.set(key, value);
      }
    });

    const newURL = `${window.location.pathname}?${newSearchParams.toString()}`;
    router.push(newURL);
  };

  // Remove old client-side jobs fetch; pagination hook manages data

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
        console.error("Failed to fetch industries:", error);
      } finally {
        setIndustriesLoading(false);
      }
    };

    fetchIndustries();
  }, []);

  if (paginationLoading && paginatedJobs.length === 0) {
    return (
      <div className="bg-neutral-light-40 min-h-screen flex items-center justify-center">
        <div className="text-primary text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-light-40">
      <div className="flex flex-col justify-center items-center">
        <div className="text-center space-y-4">
          <h1 className="font-bold text-4xl text-primary mt-6">
            The right job - the right person
          </h1>
          <p className="font-semibold text-xl text-primary-80">
            Approach 60,000+ job recruitment news every day from thousands of
            reputable businesses in Vietnam
          </p>
        </div>
      </div>
      <div className="ml-40 py-4">
        <KeywordSearch />
      </div>
      <div className="bg-neutral-light-60">
        <div className="flex gap-2 py-4">
          <div className="flex-1 hidden md:block bg-neutral-light-20 shadow-2xs">
            <div>
              <div className="bg-primary text-highlight-20 px-4 py-2 font-semibold rounded-tr-md">
                Industry
              </div>
              {industriesLoading ? (
                <div className="p-4 text-primary">Loading industries...</div>
              ) : (
                <>
                  <div className="flex flex-col justify-between hover:bg-neutral-light-80">
                    <button
                      onClick={() => updateURLParams({ industry: "all" })}
                      className={`flex justify-between items-center cursor-pointer w-full text-left ${
                        !industryId || industryId === "all"
                          ? "bg-accent text-neutral-light-20"
                          : ""
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
                        onSelect: (id: string) =>
                          updateURLParams({ industry: id }),
                        onSubSelect: (subId: string) =>
                          updateURLParams({ industry: subId }),
                        selectedSubId: industryId || undefined,
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
                    onChange={(e) =>
                      updateURLParams({ experience: e.target.value })
                    }
                    className="mr-2 bg-accent accent-accent"
                  />
                  All
                </label>
                {EXPERIENCE_LEVELS.map((level) => (
                  <label
                    key={level}
                    className="px-4 py-2 text-primary hover:bg-neutral-light-80 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="experience"
                      value={level}
                      checked={experience === level}
                      onChange={(e) =>
                        updateURLParams({ experience: e.target.value })
                      }
                      className="mr-2 bg-accent accent-accent"
                    />
                    {level}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <div className="bg-primary text-highlight-20 px-4 py-2 font-semibold">
                Education
              </div>
              <div className="flex flex-col">
                <label className="px-4 py-2 text-primary hover:bg-neutral-light-80 cursor-pointer">
                  <input
                    type="radio"
                    name="education"
                    value="allEducation"
                    checked={education === "allEducation"}
                    onChange={(e) =>
                      updateURLParams({ education: e.target.value })
                    }
                    className="mr-2 bg-accent accent-accent"
                  />
                  All
                </label>
                {EDUCATION_LEVELS.map((level) => (
                  <label
                    key={level}
                    className="px-4 py-2 text-primary hover:bg-neutral-light-80 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="education"
                      value={level}
                      checked={education === level}
                      onChange={(e) =>
                        updateURLParams({ education: e.target.value })
                      }
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
                    onChange={(e) =>
                      updateURLParams({ salary: e.target.value })
                    }
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
                    onChange={(e) =>
                      updateURLParams({ salary: e.target.value })
                    }
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
                    onChange={(e) =>
                      updateURLParams({ salary: e.target.value })
                    }
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
                    onChange={(e) =>
                      updateURLParams({ salary: e.target.value })
                    }
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
                    onChange={(e) =>
                      updateURLParams({ salary: e.target.value })
                    }
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
                    onChange={(e) =>
                      updateURLParams({ salary: e.target.value })
                    }
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
                    onChange={(e) =>
                      updateURLParams({ salary: e.target.value })
                    }
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
                    onChange={(e) =>
                      updateURLParams({ salary: e.target.value })
                    }
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
                    onChange={(e) =>
                      updateURLParams({ typeOfWork: e.target.value })
                    }
                    className="mr-2 bg-accent accent-accent"
                  />
                  All
                </label>
                {JOB_TYPES.map((type) => (
                  <label
                    key={type}
                    className="px-4 py-2 text-primary hover:bg-neutral-light-80 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="typeOfWork"
                      value={type}
                      checked={typeOfWork === type}
                      onChange={(e) =>
                        updateURLParams({ typeOfWork: e.target.value })
                      }
                      className="mr-2 bg-accent accent-accent"
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="flex-3">
            {paginationLoading && paginatedJobs.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-primary text-lg">Loading...</p>
              </div>
            ) : paginationError ? (
              <div className="text-center py-8">
                <p className="text-red-500 text-lg">Error: {paginationError}</p>
                <button
                  onClick={refresh}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 mt-4"
                >
                  Try Again
                </button>
              </div>
            ) : paginatedJobs.length > 0 ? (
              <>
                {paginatedJobs.map((job: Job) => (
                  <JobItem key={job.id} job={adaptJobForComponent(job)} />
                ))}
                <div className="py-4">
                  <PaginationComponent
                    currentPage={currentPage}
                    totalPages={totalPages}
                    hasNextPage={hasNextPage}
                    onPageChange={loadPage}
                    loading={paginationLoading}
                    className="mt-8"
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
        <h2 className="font-bold text-3xl text-center text-neutral-light-20 pl-10 py-2 w-full bg-primary">
          <i>Top Outstanding Industries</i>
        </h2>
        <CategoryGrid />
      </div>
    </div>
  );
}

export default function JobsPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-neutral-light-40 min-h-screen flex items-center justify-center">
          <div className="text-primary text-xl">Loading...</div>
        </div>
      }
    >
      <JobsPageContent />
    </Suspense>
  );
}
