"use client";
import { useState, useEffect } from "react";
import {
  BriefcaseBusiness,
  Clock,
  DollarSign,
  FileStack,
  GraduationCap,
  Hourglass,
  MapPin,
  ShieldHalf,
  Users,
  ArrowLeft,
  Heart,
  Edit,
  Phone,
  X,
} from "lucide-react";
import ApplyJobModal from "./applyJobModal";
import JobEditModal from "./JobEditModal";
import CandidateApplication from "./candidateApplication";
import ScheduleModal from "../ScheduleModal";
import { useRouter, useSearchParams } from "next/navigation";
import { Job, updateJob, closeJob } from "../../services/jobs";
import { useSaveJob } from "../../hooks/useSaveJob";
import { useCancelApplication } from "../../hooks/useCancelApplication";
import { getUserRole } from "../../utils/auth";
import { CompanyProfile } from "../../services/companyProfile";
import GoBack from "../goBack";
import { toast } from "react-toastify";
import { getToken } from "../../utils/auth";
import JobStatusBadge from "./jobStatusBadge";
import { approveJob, rejectJob } from "../../services/admin";
import { formatDateForDisplay, formatDateForDisplayWithTime } from "../../utils/dateUtils";
import { localToUTC } from "../../utils/timezoneUtils";
import { renderTextWithLineBreaks } from "../../utils/textUtils";

interface JobDetailData {
  company: CompanyProfile;
  job: Job;
}

interface JobDetailProps {
  job?: Job;
  jobDetailData?: JobDetailData;
  isHR?: boolean;
  isSaved?: boolean;
  isModerator?: boolean;
}

export default function JobDetail({
  job: propJob,
  jobDetailData,
  isHR,
  isModerator,
  isSaved = false,
}: JobDetailProps) {
  const [job, setJob] = useState<Job | null>(
    propJob || jobDetailData?.job || null
  );
  const [company, setCompany] = useState<CompanyProfile | null>(
    jobDetailData?.company || null
  );
  const [isSavedState, setIsSavedState] = useState<boolean>(isSaved);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [scheduledAt, setScheduledAt] = useState("");
  const [hasApplied, setHasApplied] = useState<boolean>(false);
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const { handleSaveJob, handleUnsaveJob, isSaving } = useSaveJob();
  const { handleCancelApplication, isLoading: isCancelling } =
    useCancelApplication();
  const userRole = getUserRole();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isFull = jobDetailData?.job?.applications_count === jobDetailData?.job?.number_of_openings;
  const [showRejectNote, setShowRejectNote] = useState(false);
  const [rejectNote, setRejectNote] = useState("");

  const handleSaveClick = async () => {
    if (!job) return;

    let newSavedState: boolean;

    if (isSavedState) {
      newSavedState = await handleUnsaveJob(job.id);
    } else {
      newSavedState = await handleSaveJob(job.id);
    }

    if (newSavedState !== isSavedState) {
      setIsSavedState(newSavedState);

      const newUrl = new URL(window.location.href);
      if (newSavedState) {
        newUrl.searchParams.set("saved", "true");
      } else {
        newUrl.searchParams.delete("saved");
      }
      window.history.replaceState({}, "", newUrl.toString());

      if (!newSavedState && isSaved) {
        const referrer = document.referrer;
      }
    }
  };

  const handleEditClick = () => {
    if (job) {
      router.push(
        `/company/post/edit?jobId=${job.id}&jobTitle=${encodeURIComponent(
          job.title
        )}`
      );
    }
  };

  const handleJobUpdated = () => {
    window.location.reload();
  };

  const handleCloseClick = async () => {
    if (!job) return;

    if (window.confirm("Are you sure you want to close this job?")) {
      try {
        const token = getToken();
        if (!token) {
          toast.error("Please login again!");
          return;
        }

        const response = await closeJob(job.id, token);
        if (response.success) {
          toast.success("Job closed successfully!");
          window.location.reload();
        } else {
          toast.error("Failed to close job: " + response.message);
        }
      } catch (error) {
        toast.error("Error closing job, please try again later.");
        console.error("Error closing job:", error);
      }
    }
  };

  const handleViewApplicationsClick = () => {
    if (job) {
      router.push(
        `/company/applications?jobId=${job.id}&jobTitle=${encodeURIComponent(
          job.title
        )}`
      );
    }
  };

  const handleCancelApplicationClick = async () => {
    if (!job) {
      toast.error("Job not found");
      return;
    }

    if (window.confirm("Are you sure you want to cancel your application?")) {
      const success = await handleCancelApplication(job.id);
      if (success) {
        setHasApplied(false);
        setApplicationId(null);

        const newUrl = new URL(window.location.href);
        newUrl.searchParams.delete("application_id");
        newUrl.searchParams.delete("from");
        window.history.replaceState({}, "", newUrl.toString());
      }
    }
  };

  const handleApplySuccess = (applicationId: string) => {
    setHasApplied(true);
    setApplicationId(applicationId);

    // Update URL params
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set("from", "applied");
    newUrl.searchParams.set("application_id", applicationId);
    window.history.replaceState({}, "", newUrl.toString());
  };

  const handleApprove = async () => {
    if (!job) return;
    const result = await approveJob(job.id);
    if (result.success) {
      toast.success("Job approved successfully!");
      window.location.reload();
    } else {
      toast.error("Failed to approve job: " + result.message);
    }
  };

  const handleReject = async () => {
    if (!job) return;
    const result = await rejectJob(job.id, rejectNote);
    if (result.success) {
      toast.success("Job rejected successfully!");
      window.location.reload();
    } else {
      toast.error("Failed to reject job: " + result.message);
    }
  };

  const handleStatusChange = async (newStatus: "active" | "schedule") => {
    if (!job) return;

    try {
      const token = getToken();
      if (!token) {
        toast.error("Please login again!");
        return;
      }

      const updateData: any = {
        status: newStatus,
      };

      // If changing to schedule, we need to open schedule modal
      if (newStatus === "schedule") {
        setIsScheduleModalOpen(true);
        return;
      }

      const response = await updateJob(job.id, updateData, token);
      if (response.success) {
        toast.success(`Job ${newStatus === "active" ? "published" : "scheduled"} successfully!`);
        window.location.reload();
      } else {
        toast.error(`Failed to update job: ${response.message}`);
      }
    } catch (error) {
      toast.error("Error updating job, please try again later.");
      console.error("Error updating job:", error);
    }
  };

  const handleReopenJob = async () => {
    if (!job) return;

    if (job.deadline) {
      const deadline = new Date(job.deadline);
      const now = new Date();
      if (deadline < now) {
        toast.error("Job deadline has already passed. Please update the deadline.");
        return;
      }
    }

    if (window.confirm("Are you sure you want to reopen this job?")) {
      try {
        const token = getToken();
        if (!token) {
          toast.error("Please login again!");
          return;
        }

        const updateData = {
          status: "active",
        };

        const response = await updateJob(job.id, updateData, token);
        if (response.success) {
          toast.success("Job reopened successfully!");
          window.location.reload();
        } else {
          toast.error("Failed to reopen job: " + response.message);
        }
      } catch (error) {
        toast.error("Error reopening job, please try again later.");
        console.error("Error reopening job:", error);
      }
    }
  };

  const handleUpdateNotes = async (notes: string) => {
    if (!job) return;
    const token = getToken();
    if (!token) {
      toast.error("Please login again!");
      return;
    }
    const result = await updateJob(job.id, { moderator_notes: notes }, token);
    if (result.success) {
      toast.success("Job notes updated successfully!");
      window.location.reload();
    }
  };

  useEffect(() => {
    const checkIfApplied = () => {
      // Check if coming from jobs-applied page
      const fromAppliedJobs = searchParams.get("from") === "applied";
      const appId = searchParams.get("application_id");

      if (fromAppliedJobs) {
        setHasApplied(true);
        if (appId) {
          setApplicationId(appId);
        }
      }
    };

    checkIfApplied();
  }, [searchParams]);

  useEffect(() => {
    setIsSavedState(isSaved);
  }, [isSaved]);

  if (!job) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-primary text-xl">Job not found</div>
      </div>
    );
  }

  const salaryText = job.is_salary_negotiable
    ? "Negotiable"
    : `${parseInt(job.salary_min).toLocaleString()} - ${parseInt(
        job.salary_max
      ).toLocaleString()}`;

  const deadlineDate = job.deadline
    ? new Date(job.deadline).toLocaleDateString()
    : "Not specified";

  const postedAt = formatDateForDisplay(job.created_at);

  return (
    <div className="bg-neutral-light-40 min-h-screen py-4">
      <div className="flex flex-col mx-6">
        <GoBack />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-10 mx-10 py-6">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col justify-between bg-neutral-light-20 border border-primary-20 rounded-3xl space-y-4 p-4">
            <div className="text-primary font-semibold text-2xl">
              {job.title}
            </div>
            <div className="flex flex-wrap gap-4 justify-between">
              <div className="flex items-center gap-2">
                <DollarSign
                  size={34}
                  className="bg-linear-(--gradient-primary-2) text-background rounded-full"
                />
                <div className="flex flex-col justify-between">
                  <div className="text-primary font-semibold text-xl">
                    Salary
                  </div>
                  <div className="text-primary-80 font-semibold">
                    {salaryText}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin
                  size={34}
                  className="bg-linear-(--gradient-primary-2) text-background rounded-full"
                />
                <div className="flex flex-col justify-between">
                  <div className="text-primary font-semibold text-xl">
                    Location
                  </div>
                  <div className="text-primary-80 font-semibold">
                    {job.province}, {job.ward}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Hourglass
                  size={34}
                  className="bg-linear-(--gradient-primary-2) text-background rounded-full"
                />
                <div className="flex flex-col justify-between">
                  <div className="text-primary font-semibold text-xl">
                    Experience
                  </div>
                  <div className="text-primary-80 font-semibold">
                    {job.experience_level}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 justify-between">
              <div className="flex flex-wrap gap-2">
                <div className="flex relative bg-highlight rounded-xl px-2">
                  <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-primary-80">
                    <Clock size={24} />
                  </div>
                  <span className="w-full pl-8 pr-2 py-2 font-semibold rounded-xl text-primary-80 ">
                    Posted Date: {postedAt}
                  </span>
                </div>
                <div className="flex relative bg-highlight rounded-xl px-2">
                  <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-primary-80">
                    <Clock size={24} />
                  </div>
                  <span className="w-full pl-8 pr-2 py-2 font-semibold rounded-xl text-primary-80 ">
                    Deadline: {deadlineDate}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {!isHR && !isModerator && (
                  <button
                    onClick={
                      hasApplied || isFull
                        ? undefined
                        : () => setIsApplyModalOpen(true)
                    }
                    disabled={hasApplied || isFull}
                    className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 transform ${
                      hasApplied
                        ? "bg-accent text-background cursor-not-allowed"
                        : isFull
                        ? "bg-accent text-background cursor-not-allowed"
                        : "bg-accent text-background hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 cursor-pointer"
                    }`}
                  >
                    {hasApplied ? "Applied ✓" : isFull ? "Full" : "Apply now"}
                  </button>
                )}
                {!isHR && hasApplied && userRole === "candidate" && (
                  <button
                    onClick={handleCancelApplicationClick}
                    disabled={isCancelling}
                    className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-red-500/30 transform hover:-translate-y-0.5 flex items-center gap-2 bg-primary-60 text-white hover:bg-red-600 cursor-pointer ${
                      isCancelling ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <X size={20} />
                    Cancel Application
                  </button>
                )}
                  <button
                    disabled
                    className="px-6 py-2 bg-accent rounded-full text-background font-semibold text-lg cursor-not-allowed"
                  >
                    Applied: {job?.applications_count || 0}/{job?.number_of_openings || 0}
                  </button>
                
                {userRole === 'candidate' && (
                  <button
                    onClick={handleSaveClick}
                    disabled={isSaving}
                    className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer ${
                      isSavedState
                        ? "bg-red-500 text-white hover:bg-red-600"
                        : "bg-accent text-background hover:bg-accent/90"
                    } ${isSaving ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <Heart
                      size={20}
                      className={isSavedState ? "fill-white" : ""}
                    />
                    {isSavedState ? "Saved" : "Save"}
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="bg-neutral-light-20 border border-primary-20 rounded-3xl space-y-4">
            <div className="flex flex-col">
              <span className="w-full rounded-t-3xl text-background font-semibold text-2xl px-6 py-4 bg-secondary">
                Job Detail
              </span>
              <div className="flex flex-col justify-between px-6 space-y-4 my-4">
                <div className="">
                  <h2 className="font-semibold text-accent">Job Description</h2>
                  <p className="text-primary">
                    {renderTextWithLineBreaks(job.description, "No description available")}
                  </p>
                </div>
                <div>
                  <h2 className="font-semibold text-accent">
                    Applicant Requirements
                  </h2>
                  <p className="text-primary">
                    {renderTextWithLineBreaks(job.requirements, "No requirements specified")}
                  </p>
                </div>
                <div>
                  <h2 className="font-semibold text-accent">Benefits</h2>
                  <p className="text-primary">
                    {renderTextWithLineBreaks(job.benefits, "No benefits specified")}
                  </p>
                </div>
                <div>
                  <h2 className="font-semibold text-accent">Work Place</h2>
                  <p className="text-primary">{renderTextWithLineBreaks(job.work_place)}</p>
                </div>
                <div>
                  <h2 className="font-semibold text-accent">Working Time</h2>
                  <p className="text-primary">
                    {renderTextWithLineBreaks(job.working_hours, "Not specified")}
                  </p>
                </div>
                <div>
                  <h2 className="font-semibold text-accent">
                    {hasApplied ? "Application Status" : "Apply now!"}
                  </h2>
                  <p className="text-primary">
                    {hasApplied
                      ? "You have already applied for this position."
                      : "Click the Apply button above to submit your application."}
                  </p>
                  {!isHR && !isModerator && (
                    <button
                      onClick={
                        hasApplied || isFull
                          ? undefined
                          : () => setIsApplyModalOpen(true)
                      }
                      disabled={hasApplied || isFull}
                      className={`px-4 py-2 mb-4 mt-4 rounded-full font-semibold transition-all duration-300 transform ${
                        hasApplied
                          ? "bg-green-600 text-white cursor-not-allowed"
                          : isFull
                          ? "bg-gray-400 text-white cursor-not-allowed"
                          : "bg-accent text-background hover:-translate-y-0.5 cursor-pointer"
                      }`}
                    >
                      {hasApplied ? "Applied ✓" : isFull ? "Full" : "Apply now"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col justify-between bg-neutral-light-20 border border-primary-20 rounded-3xl space-y-2 p-4">
            <div className="flex px-2">
              <img
                src={company?.logo_url || "/logo.png"}
                alt="Company"
                className="border-1 rounded-xs w-16 h-16 object-contain"
              />
              <div className="text-primary ml-4">
                {company?.company_name || "Company Name"}
              </div>
            </div>

            <div className="px-4 space-y-2">
              {company?.size && (
                <div className="flex gap-10">
                  <div className="flex gap-2">
                    <Users size={24} className="text-primary" />
                    <span className="text-primary font-semibold">Scale: </span>
                  </div>
                  <span className="text-primary-80">{company.size}</span>
                </div>
              )}
              {company?.industry && (
                <div className="flex gap-10">
                  <div className="flex gap-2">
                    <BriefcaseBusiness size={24} className="text-primary" />
                    <span className="text-primary font-semibold">Field: </span>
                  </div>
                  <span className="text-primary-80">{company.industry}</span>
                </div>
              )}
              {company?.address && (
                <div className="flex gap-3">
                  <div className="flex gap-2">
                    <MapPin size={24} className="text-primary" />
                    <span className="text-primary font-semibold">
                      Address:{" "}
                    </span>
                  </div>
                  <span className="text-primary-80">{renderTextWithLineBreaks(company.address)}</span>
                </div>
              )}
              {company?.phone_number && (
                <div className="flex gap-3">
                  <div className="flex gap-2">
                    <Phone size={24} className="text-primary" />
                    <span className="text-primary font-semibold">Phone: </span>
                  </div>
                  <span className="text-primary-80">
                    {company.phone_number}
                  </span>
                </div>
              )}
            </div>

            <div className="flex space-x-1 text-accent font-semibold justify-center">
              <a href={`/company-detail/${company?.id}`} className="flex gap-2">
                <p>View company page </p>
                <FileStack />
              </a>
            </div>
          </div>

          <div className="bg-neutral-light-20 border border-primary-20 rounded-3xl space-y-4">
            <div className="flex flex-col">
              <span className="w-full rounded-t-3xl text-background font-semibold text-2xl text-center px-6 py-4 bg-secondary">
                General Information
              </span>
              <div className="flex flex-col space-y-2 my-4 mx-6">
                <div className="flex gap-4">
                  <ShieldHalf
                    size={44}
                    className="bg-linear-(--gradient-primary-2) rounded-full text-background"
                  />
                  <div className="flex flex-col justify-between">
                    <span className="text-secondary font-semibold">
                      Position
                    </span>
                    <span className="text-secondary-80">{job.position}</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <GraduationCap
                    size={44}
                    className="bg-linear-(--gradient-primary-2) rounded-full text-background"
                  />
                  <div className="flex flex-col justify-between">
                    <span className="text-secondary font-semibold">
                      Education
                    </span>
                    <span className="text-secondary-80">
                      {job.education_level}
                    </span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Users
                    size={44}
                    className="bg-linear-(--gradient-primary-2) rounded-full text-background"
                  />
                  <div className="flex flex-col justify-between">
                    <span className="text-secondary font-semibold">
                      Number of openings
                    </span>
                    <span className="text-secondary-80">
                      {job.number_of_openings}
                    </span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <BriefcaseBusiness
                    size={44}
                    className="bg-linear-(--gradient-primary-2) rounded-full text-background"
                  />
                  <div className="flex flex-col">
                    <span className="text-secondary font-semibold">
                      Job type
                    </span>
                    <span className="text-secondary-80">{job.job_type}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-neutral-light-20 border border-primary-20 rounded-3xl space-y-4">
            <div className="flex flex-col">
              <span className="w-full rounded-t-3xl text-background font-semibold text-2xl text-center px-6 py-4 bg-secondary">
                Job Tags
              </span>
              <div className="flex flex-col space-y-2 mx-6 my-4">
                <div className="flex flex-col">
                  <span className="font-semibold text-accent">
                    Experience Level
                  </span>
                  <div className="grid grid-cols-2 gap-4">
                    <span className="bg-highlight-40 rounded-full px-4 py-2 text-center text-primary font-semibold">
                      {job.experience_level}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-accent">Job Type</span>
                  <div className="grid grid-cols-2 gap-4">
                    <span className="bg-highlight-40 rounded-full px-4 py-2 text-center text-primary font-semibold">
                      {job.job_type}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-accent">Location</span>
                  <div className="grid grid-cols-2 gap-4">
                    <span className="bg-highlight-40 rounded-full px-4 py-2 text-center text-primary font-semibold">
                      {job.province}
                    </span>
                  </div>
                </div>
                {job.skills && (
                  <div className="flex flex-col">
                    <span className="font-semibold text-accent">Skills</span>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.split(",").map((skill, index) => (
                        <span
                          key={index}
                          className="bg-highlight-40 rounded-full px-4 py-2 text-center text-primary font-semibold"
                        >
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isHR && (
        <div className="flex flex-col gap-6 mx-6 my-4">
          <div className="flex gap-2 items-center">
            <span className="text-primary-80 font-semibold">Status:</span>
            <JobStatusBadge status={job.status} />
          </div>

          <div className="flex gap-2 items-center">
            <span className="text-primary-80 font-semibold">
              Scheduled at:
            </span>
            <span className="text-primary-80">{formatDateForDisplayWithTime(job.scheduled_at)}</span>
          </div>

          <div className="flex gap-4 flex-wrap">
            <button
              onClick={handleEditClick}
              className="bg-secondary-60 hover:bg-secondary text-background px-6 py-2 rounded-full cursor-pointer"
            >
              Edit
            </button>
            <button
              onClick={handleViewApplicationsClick}
              className="bg-secondary-60 hover:bg-secondary text-background px-6 py-2 rounded-full cursor-pointer"
            >
              View Applications
            </button>
            <button
              onClick={handleCloseClick}
              className="bg-secondary-60 hover:bg-secondary text-background px-6 py-2 rounded-full cursor-pointer"
            >
              Close
            </button>
            
            {/* Show Publish Now button for draft jobs */}
            {job.status === "draft" && (
              <button
                onClick={() => handleStatusChange("active")}
                className="bg-accent hover:bg-secondary text-background px-6 py-2 rounded-full cursor-pointer"
              >
                Publish Now
              </button>
            )}
            
            {/* Show Reschedule button for scheduled jobs */}
            {job.status === "schedule" && (
              <button
                onClick={() => handleStatusChange("active")}
                className="bg-accent hover:bg-secondary text-background px-6 py-2 rounded-full cursor-pointer"
              >
                Publish Now
              </button>
            )}
            
             {job.status === "draft" && (
               <button
                 onClick={() => setIsScheduleModalOpen(true)}
                 className="bg-accent hover:bg-secondary text-background px-6 py-2 rounded-full cursor-pointer"
               >
                 Schedule Again
               </button>
             )}
             
             {job.status === "expired" && (
               <button
                 onClick={handleReopenJob}
                 className="bg-accent hover:bg-secondary text-background px-6 py-2 rounded-full cursor-pointer"
               >
                 Reopen Job
               </button>
             )}
          </div>
        </div>
      )}

      {isModerator && (
        <div className="flex flex-col gap-6 mx-6 my-4">
          <div className="flex gap-2 items-center">
            <span className="text-primary-80 font-semibold">Status:</span>
            <JobStatusBadge status={job.status} />
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-primary-80 font-semibold">
              Moderator Notes:
            </span>
            <span className="text-primary-80">{renderTextWithLineBreaks(job.moderator_notes, "No notes available")}</span>
          </div>
          <div className="flex gap-2">
            <button
              className="bg-accent hover:bg-secondary text-neutral-light-20 px-6 py-2 rounded-full cursor-pointer"
              onClick={handleApprove}
            >
              Approve
            </button>
            <button
              className="bg-red-600 hover:bg-red-700 text-background px-6 py-2 rounded-full cursor-pointer"
              onClick={() => setShowRejectNote(true)}
            >
              Reject
            </button>
          </div>
          {showRejectNote && (
            <div className="flex flex-col gap-2 w-full max-w-2xl">
              <label
                className="text-2xl font-bold text-primary mb-1"
                htmlFor="reject-note"
              >
                Moderator's Note:
              </label>
              <textarea
                id="reject-note"
                className="w-full min-h-[80px] border border-primary-40 rounded-lg px-4 py-2 text-primary-80 focus:outline-none focus:ring-2 focus:ring-accent bg-neutral-light-20"
                placeholder="Enter moderator's note for rejection"
                value={rejectNote}
                onChange={(e) => setRejectNote(e.target.value)}
              />
              <div className="flex gap-2">
                <button
                  className="mt-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full cursor-pointer font-semibold transition"
                  onClick={handleReject}
                >
                  Confirm Reject
                </button>
                <button
                  className="mt-2 bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-full cursor-pointer font-semibold transition"
                  onClick={() => setShowRejectNote(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Apply Job Modal */}
      {!isHR && !isModerator && job && !hasApplied && (
        <ApplyJobModal
          jobId={job.id}
          jobTitle={job.title}
          isOpen={isApplyModalOpen}
          onClose={() => setIsApplyModalOpen(false)}
          onApplySuccess={handleApplySuccess}
        />
      )}

      {/* Candidate Application Details */}
      {!isHR && !isModerator && hasApplied && job && (
        <CandidateApplication jobId={job.id} applicationId={applicationId} />
      )}

      {/* Job Edit Modal */}
      {isEditModalOpen && job && (
        <JobEditModal
          isOpen={isEditModalOpen}
          job={job}
          onClose={() => setIsEditModalOpen(false)}
          onJobUpdated={handleJobUpdated}
        />
      )}

      {/* Schedule Modal */}
      <ScheduleModal
        isOpen={isScheduleModalOpen}
        onClose={() => {
          setIsScheduleModalOpen(false);
          setScheduledAt("");
        }}
        scheduledAt={scheduledAt}
        onScheduledAtChange={setScheduledAt}
        onSchedule={async () => {
          if (!job) return;
          
          try {
            const token = getToken();
            if (!token) {
              toast.error("Please login again!");
              return;
            }

            const updateData = {
              status: "schedule",
              scheduled_at: localToUTC(scheduledAt),
            };

            const response = await updateJob(job.id, updateData, token);
            if (response.success) {
              toast.success("Job scheduled successfully!");
              setIsScheduleModalOpen(false);
              setScheduledAt("");
              window.location.reload();
            } else {
              toast.error(`Failed to schedule job: ${response.message}`);
            }
          } catch (error) {
            toast.error("Error scheduling job, please try again later.");
            console.error("Error scheduling job:", error);
          }
        }}
        isLoading={false}
        title="Schedule Job"
      />
    </div>
  );
}
