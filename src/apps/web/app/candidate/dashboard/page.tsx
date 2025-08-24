"use client";
import {
  FilePenLine,
  Mail,
  Phone,
  MapPin,
  Bookmark,
  Briefcase,
} from "lucide-react";
import Notification from "../../../components/notification";
import JobCard from "../../../components/job/jobCard";
import usePagination from "../../../hooks/usePagination";
import Pagination from "../../../components/pagination";
import { jobs } from "../../../components/fakeJob";
import ProtectedRoute from "../../../components/ProtectedRoute";
import { getProfile, Profile } from "../../../services/candidateProfile";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getSavedJobs,
  getAppliedJobs,
  Job,
  AppliedJob,
} from "../../../services/jobs";

const transformJobForCard = (
  job: Job,
  isSaved: boolean = false,
  isApplied: boolean = false
) => ({
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
  is_saved: isSaved,
  is_applied: isApplied,
});

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
  application_id: appliedJob.application_id, // Add application_id
});

function CandidateDashboardContent() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);
  const [savedJobsLoading, setSavedJobsLoading] = useState(true);
  const [savedJobsError, setSavedJobsError] = useState<string | null>(null);
  const [appliedJobs, setAppliedJobs] = useState<AppliedJob[]>([]);
  const [appliedJobsLoading, setAppliedJobsLoading] = useState(true);
  const [appliedJobsError, setAppliedJobsError] = useState<string | null>(null);

  // Pagination hooks
  const {
    page: savedJobsPage,
    maxPage: savedJobsMaxPage,
    current: savedJobsCurrent,
    next: savedJobsNext,
    prev: savedJobsPrev,
  } = usePagination(savedJobs, 3);

  const {
    page: appliedJobsPage,
    maxPage: appliedJobsMaxPage,
    current: appliedJobsCurrent,
    next: appliedJobsNext,
    prev: appliedJobsPrev,
  } = usePagination(appliedJobs, 3);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await getProfile();
      if (response.success && response.data?.profile) {
        setProfile(response.data.profile);
      } else {
        toast.error(response.message || "Failed to load profile");
      }
    } catch (error) {
      toast.error("Error loading profile data");
    } finally {
      setLoading(false);
    }
  };

  const fetchSavedJobs = async () => {
    try {
      setSavedJobsLoading(true);
      const response = await getSavedJobs();

      if (response.success && response.data) {
        const sortedJobs = response.data.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        setSavedJobs(sortedJobs);
      } else {
        if (response.message === "Authentication required") {
          setSavedJobsError("Please login to view saved jobs");
        } else {
          setSavedJobsError(response.message || "Failed to fetch saved jobs");
        }
      }
    } catch (error) {
      setSavedJobsError("Network error occurred");
    } finally {
      setSavedJobsLoading(false);
    }
  };

  const fetchAppliedJobs = async () => {
    try {
      setAppliedJobsLoading(true);
      const response = await getAppliedJobs();

      if (response.success && response.data) {
        // Sort by application_id (newest first) since we don't have created_at
        const sortedJobs = response.data.sort((a, b) =>
          b.application_id.localeCompare(a.application_id)
        );
        setAppliedJobs(sortedJobs);
      } else {
        if (response.message === "Authentication required") {
          setAppliedJobsError("Please login to view applied jobs");
        } else {
          setAppliedJobsError(
            response.message || "Failed to fetch applied jobs"
          );
        }
      }
    } catch (error) {
      setAppliedJobsError("Network error occurred");
    } finally {
      setAppliedJobsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchSavedJobs();
    fetchAppliedJobs();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-primary text-xl">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-screen bg-neutral-light-60">
      <div className="flex flex-col px-20 py-10 gap-10">
        <div className="flex flex-wrap gap-15">
          <div className="flex-1 flex flex-wrap justify-between bg-highlight-20 rounded-2xl border border-primary-20">
            <div className="flex flex-wrap">
              <div className="p-4">
                <img
                  src={profile?.profile_photo_url || "/avt_new.jpg"}
                  alt={profile?.full_name || "Profile"}
                  className="w-40 h-44 object-contain rounded-2xl"
                />
              </div>
              <div className="flex flex-col justify-center gap-4 p-4">
                <span className="text-primary text-xl font-semibold">
                  {profile?.full_name || "Not updated"}
                </span>
                <div className="flex flex-col gap-2">
                  <span className="flex gap-2 text-primary">
                    <Mail size={24} />
                    <span>{profile?.email || "Not updated"}</span>
                  </span>
                  <span className="flex gap-2 text-primary">
                    <Phone size={24} />
                    <span>{profile?.phone || "Not updated"}</span>
                  </span>
                  <span className="flex gap-2 text-primary">
                    <MapPin size={24} />
                    <span>
                      {profile?.province && profile?.ward
                        ? `${profile.province}, ${profile.ward}`
                        : "Not updated"}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-highlight-40 rounded-2xl">
            <div className="flex flex-col">
              <div className="flex justify-between px-4 py-2">
                <div className="text-xl text-primary font-semibold">
                  Notification
                </div>
                <a href="/candidate/notifications">
                  <span className="text-accent font-semibold cursor-pointer">
                    See All
                  </span>
                </a>
              </div>
              <Notification />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-15">
          <div className="flex-1 flex flex-col bg-highlight-20 rounded-2xl p-4 border border-primary-20">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Briefcase className="text-primary" size={24} />
                <span className="text-primary font-semibold text-xl">
                  Jobs Applied
                </span>
              </div>
              <a href="/candidate/jobs-applied">
                <span className="text-accent font-semibold cursor-pointer">
                  See All
                </span>
              </a>
            </div>

            {appliedJobsLoading ? (
              <div className="flex justify-center items-center h-32">
                <div className="text-primary text-lg">
                  Loading applied jobs...
                </div>
              </div>
            ) : appliedJobsError ? (
              <div className="flex justify-center items-center h-32">
                <div className="text-red-500 text-lg">
                  Error: {appliedJobsError}
                </div>
              </div>
            ) : appliedJobs.length > 0 ? (
              <>
                <div className="flex flex-col gap-y-6 px-4 py-4">
                  {appliedJobsCurrent.map((appliedJob) => (
                    <JobCard
                      key={appliedJob.application_id}
                      job={transformAppliedJobForCard(appliedJob)}
                    />
                  ))}
                </div>
                {appliedJobsMaxPage > 1 && (
                  <div className="py-4">
                    <Pagination
                      page={appliedJobsPage}
                      maxPage={appliedJobsMaxPage}
                      onNext={appliedJobsNext}
                      onPrev={appliedJobsPrev}
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  No applied jobs yet
                </h3>
                <p className="text-gray-500 text-sm mb-4">
                  Start applying to jobs you're interested in
                </p>
                <a
                  href="/jobs"
                  className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors inline-block text-sm"
                >
                  Browse Jobs
                </a>
              </div>
            )}
          </div>
          <div className="flex-1 flex flex-col bg-highlight-20 rounded-2xl p-4 border border-primary-20">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Bookmark className="text-primary" size={24} />
                <span className="text-primary font-semibold text-xl">
                  Jobs Saved
                </span>
              </div>
              <a href="/candidate/saved-jobs">
                <span className="text-accent font-semibold cursor-pointer">
                  See All
                </span>
              </a>
            </div>

            {savedJobsLoading ? (
              <div className="flex justify-center items-center h-32">
                <div className="text-primary text-lg">
                  Loading saved jobs...
                </div>
              </div>
            ) : savedJobsError ? (
              <div className="flex justify-center items-center h-32">
                <div className="text-red-500 text-lg">
                  Error: {savedJobsError}
                </div>
              </div>
            ) : savedJobs.length > 0 ? (
              <>
                <div className="flex flex-col gap-y-6 px-4 py-4">
                  {savedJobsCurrent.map((job) => (
                    <JobCard
                      key={job.id}
                      job={transformJobForCard(job, true, false)}
                    />
                  ))}
                </div>
                {savedJobsMaxPage > 1 && (
                  <div className="py-4">
                    <Pagination
                      page={savedJobsPage}
                      maxPage={savedJobsMaxPage}
                      onNext={savedJobsNext}
                      onPrev={savedJobsPrev}
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  No saved jobs yet
                </h3>
                <p className="text-gray-500 text-sm mb-4">
                  Start saving jobs you're interested in by clicking the heart
                  icon
                </p>
                <a
                  href="/jobs"
                  className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors inline-block text-sm"
                >
                  Browse Jobs
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CandidateDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={["candidate"]}>
      <CandidateDashboardContent />
    </ProtectedRoute>
  );
}
