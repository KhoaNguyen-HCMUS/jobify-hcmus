import { Heart } from "lucide-react";
import JobStatusBadge from "./jobStatusBadge";
import Link from "next/link";
import { formatSalaryRange, formatRelativeTime } from "../../utils/numberUtils";
import { DEFAULT_LOGO_IMAGE } from "../../constants/imgConstants";
import { getUserRole } from "../../utils/auth";
import { useSaveJob } from "../../hooks/useSaveJob";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface JobCardProps {
  job: {
    id: string;
    title: string;
    company_name: string | null;
    salary_min: string;
    salary_max: string;
    currency: string;
    province: string;
    logo: string | typeof DEFAULT_LOGO_IMAGE;
    name: string;
    status?: string;
    created_at: Date;
    is_saved?: boolean;
    is_applied?: boolean;
    fromApplied?: boolean;
    application_id?: string;
  };
}

export default function JobCard({ job }: JobCardProps) {
  const [isSaved, setIsSaved] = useState(job.is_saved || false);
  const { handleSaveJob, handleUnsaveJob, isSaving } = useSaveJob();
  const userRole = getUserRole();
  const router = useRouter();

  useEffect(() => {
    setIsSaved(job.is_saved || false);
  }, [job.is_saved]);

  const handleHeartClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isSaved) {
      const newSavedState = await handleUnsaveJob(job.id);
      if (newSavedState === false) {
        setIsSaved(false);

        if (window.location.pathname.includes("/saved-jobs")) {
          setTimeout(() => {
            router.refresh();
          }, 1000);
        }
      }
    } else {
      const newSavedState = await handleSaveJob(job.id);
      if (newSavedState === true) {
        setIsSaved(true);
      }
    }
  };

  const buildJobUrl = () => {
    const params = new URLSearchParams();
    if (isSaved) params.append("saved", "true");
    if (job.fromApplied) params.append("from", "applied");
    if (job.application_id) params.append("application_id", job.application_id);
    const queryString = params.toString();
    return `/jobs/${job.id}${queryString ? `?${queryString}` : ""}`;
  };

  return (
    <Link href={buildJobUrl()}>
      <div className="border border-primary-20 bg-neutral-light-20 rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg cursor-pointer">
        <div className="flex items-center space-x-4 mb-4">
          <img
            src={job.logo || DEFAULT_LOGO_IMAGE}
            alt={job.name}
            className="w-1/5 h-1/5 object-contain"
          />
          <div>
            <h3 className="font-bold text-lg text-primary line-clamp-1">
              {job.title}
            </h3>
            <p className="text-text-80 line-clamp-1">{job.company_name}</p>
            {!(job.is_applied || job.is_saved) && (
              <p className="text-text-80">
                {formatRelativeTime(job.created_at)}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-0.5 justify-between items-center text-xs">
          <span className="text-primary-80 font-semibold px-2 py-2 bg-accent-20 rounded-full">
            {formatSalaryRange(job.salary_min, job.salary_max)} {job.currency}
          </span>
          <span className="text-primary-80 font-semibold px-2 py-2 bg-accent-20 rounded-full">
            {job.province}
          </span>
          <JobStatusBadge status={job.status} />

          {userRole === "candidate" && (
            <button
              onClick={handleHeartClick}
              disabled={isSaving}
              className={`text-primary-80 hover:text-red-500 transition-colors ${
                isSaving ? "opacity-50 cursor-not-allowed" : ""
              }`}
              title={isSaved ? "Remove from saved" : "Save job"}
            >
              <Heart
                size={20}
                className={isSaved ? "fill-red-500 text-red-500" : ""}
              />
            </button>
          )}
        </div>
      </div>
    </Link>
  );
}
