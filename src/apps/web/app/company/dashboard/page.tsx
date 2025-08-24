"use client";
import { useState, useEffect } from "react";
import { FilePenLine, Unlink2, Users } from "lucide-react";
import Notification from "../../../components/notification";
import JobCard from "../../../components/job/jobCard";
import usePagination from "../../../hooks/usePagination";
import Pagination from "../../../components/pagination";
import { DEFAULT_COVER_IMAGE } from "../../../constants/imgConstants";
import { DEFAULT_AVATAR_IMAGE } from "../../../constants/imgConstants";
import {
  getCompanyProfile,
  CompanyProfile,
} from "../../../services/companyProfile";
import { getJobsByCompany, Job } from "../../../services/jobs";
import ProtectedRoute from "../../../components/ProtectedRoute";

interface CompanyProps {
  company: {
    coverImage: string;
    logoImage: string;
    name: string;
    website: string;
    employees: string;
    introduction: string;
    contact: string;
    coin: string;
  };
}

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

const Stat = ({
  value,
  label,
  color,
}: {
  value: string;
  label: string;
  color: string;
}) => (
  <div className="flex flex-col items-center font-bold" style={{ color }}>
    <span
      className="w-16 h-16 flex items-center justify-center text-2xl rounded-full border-2 bg-neutral-light-20"
      style={{ borderColor: color }}
    >
      {value}
    </span>
    <span className="mt-1">{label}</span>
  </div>
);

function RecruiterDashboardContent() {
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile | null>(
    null
  );
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [jobStats, setJobStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    expiredJobs: 0,
    applications: 0,
    coins: 250,
  });

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setIsLoading(true);

        const profileResponse = await getCompanyProfile();
        if (profileResponse.success && profileResponse.data) {
          setCompanyProfile(profileResponse.data.companyProfiles);
        }

        const jobsResponse = await getJobsByCompany();
        if (jobsResponse.success && jobsResponse.data) {
          const sortedJobs = jobsResponse.data.sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          );
          setJobs(sortedJobs);

          const totalJobs = sortedJobs.length;
          const activeJobs = sortedJobs.filter(
            (job) => job.status === "active"
          ).length;
          const expiredJobs = sortedJobs.filter(
            (job) => job.status === "expired"
          ).length;
          const totalApplications = sortedJobs.reduce(
            (sum, job) => sum + (job.applications_count || 0),
            0
          );

          setJobStats({
            totalJobs,
            activeJobs,
            expiredJobs,
            applications: totalApplications,
            coins: 250,
          });
        }
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const transformedJobs = jobs.map(transformJobForCard);
  const { page, maxPage, current, next, prev } = usePagination(
    transformedJobs,
    4
  );

  return (
    <div className="w-full h-full bg-neutral-light-60">
      <div className="flex flex-col px-6 lg:px-20 py-10 gap-10">
        {isLoading ? (
          <div className="flex min-h-screen justify-center items-center h-64">
            <div className="text-primary text-lg">
              Loading company profile...
            </div>
          </div>
        ) : (
          <>
            <div className="rounded-3xl">
              <div className="flex flex-col">
                <div className="relative w-full h-56">
                  <img
                    src={companyProfile?.logo_url || DEFAULT_COVER_IMAGE}
                    alt="coverImage"
                    className="w-full h-full object-cover rounded-t-3xl"
                  />
                  <img
                    src={companyProfile?.logo_url || DEFAULT_AVATAR_IMAGE}
                    alt="logo"
                    className="absolute object-contain top-28 left-10 w-20 sm:w-24 md:w-28 lg:w-32 aspect-square rounded-xl mx-auto"
                  />
                </div>
                <div className="flex bg-accent-20 rounded-b-3xl">
                  <div className="flex-2"></div>
                  <div className="flex-5">
                    <div className="flex flex-col mb-4 space-y-2 pt-4 font-semibold text-primary">
                      <div className="text-lg">
                        {companyProfile?.company_name ||
                          "Company Name Not Available"}
                      </div>
                      <div className="flex flex-wrap justify-between gap-10">
                        <div className="flex items-center gap-2">
                          <Users />
                          <span>{companyProfile?.size || "N/A"} employees</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Unlink2 />
                          <a
                            href={companyProfile?.website || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {companyProfile?.website || "N/A"}
                          </a>
                        </div>
                        <a
                          href="/company/profile"
                          className="px-4"
                          aria-label="Edit company profile"
                          title="Edit company profile"
                        >
                          <FilePenLine size={24} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-10">
              <div className="flex-1 flex flex-col justify-center items-center gap-6">
                <div className="flex justify-center gap-12 flex-wrap">
                  <Stat
                    value={jobStats.totalJobs.toString()}
                    label="Job Posts"
                    color="#1C1C50"
                  />
                  <Stat
                    value={jobStats.activeJobs.toString()}
                    label="Active Jobs"
                    color="#26B709"
                  />
                  <Stat
                    value={jobStats.expiredJobs.toString()}
                    label="Expired Jobs"
                    color="#F52121"
                  />
                </div>
                <div className="flex justify-center gap-12 flex-wrap">
                  <Stat
                    value={jobStats.applications.toString()}
                    label="Applications"
                    color="#0C53DE"
                  />
                  <Stat
                    value={jobStats.coins.toString()}
                    label="Coins"
                    color="#DD8D0E"
                  />
                </div>
              </div>

              {/* Notification */}
              <div className="flex-1 bg-neutral-light-60 rounded-2xl overflow-hidden">
                <div className="flex flex-wrap justify-between px-4 py-2 bg-primary text-white">
                  <div className="text-xl font-semibold">Notification</div>
                  <a href="/company/notifications" className="font-semibold">
                    See All
                  </a>
                </div>
                <Notification />
              </div>
            </div>
            <div>
              <div className="flex flex-wrap justify-between bg-primary rounded-t-3xl px-6 py-2">
                <div className=" text-accent-20 font-semibold text-xl">
                  My Jobs
                </div>
                <a href="/company/jobs">
                  <span className="text-highlight-40 font-semibold">
                    See All
                  </span>
                </a>
              </div>
              <div className="bg-highlight-20 pb-6 rounded-b-3xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 lg:px-20 py-6">
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
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function RecruiterDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={["company"]}>
      <RecruiterDashboardContent />
    </ProtectedRoute>
  );
}
