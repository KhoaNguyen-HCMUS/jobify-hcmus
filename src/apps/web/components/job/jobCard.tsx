import { Heart } from "lucide-react";
import JobStatusBadge from "./jobStatusBadge";
import Link from "next/link";
import { 
  formatCurrency, 
  formatSalaryRange, 
  formatRelativeTime,
  formatPhoneNumber 
} from '../../utils/numberUtils';
import { DEFAULT_LOGO_IMAGE } from '../../constants/imgConstants';
import { getUserRole } from '../../utils/auth';
import { useSaveJob } from '../../hooks/useSaveJob';
import { useState } from 'react';

interface JobCardProps {
  job: {
    id: string;
    title: string;
    company_name: string | null;
    salary_min: string;
    salary_max: string;
    currency: string;
    province: string;
    logo: string | typeof  DEFAULT_LOGO_IMAGE;
    name: string;
    status?: string;
    created_at: Date;
    is_saved?: boolean;
  };
}

export default function JobCard({ job }: JobCardProps) {
  const [isSaved, setIsSaved] = useState(job.is_saved || false);
  const { handleSaveJob, isSaving } = useSaveJob();
  const userRole = getUserRole();

  const handleHeartClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const newSavedState = await handleSaveJob(job.id, isSaved);
    if (newSavedState !== isSaved) {
      setIsSaved(newSavedState);
    }
  };

  return (
    <Link href={`/jobs/${job.id}`}>
      <div className="shadow-md bg-neutral-light-20 rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg cursor-pointer">
        <div className="flex items-center space-x-4 mb-4">
          <img
            src={job.logo || DEFAULT_LOGO_IMAGE}
            alt={job.name}
            className="w-1/5 h-1/5 object-contain"
          />
          <div>
            <h3 className="font-bold text-lg text-text line-clamp-1">
              {job.title}
            </h3>
            <p className="text-text-80">{job.company_name}</p>
            <p className="text-text-80">{formatRelativeTime(job.created_at)}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 justify-between items-center text-sm">
          <span className="text-primary-80 font-semibold px-4 py-2 bg-accent-20 rounded-full">
            {formatSalaryRange(job.salary_min, job.salary_max)} {job.currency}
          </span>
          <span className="text-primary-80 font-semibold px-4 py-2 bg-accent-20 rounded-full">
            {job.province}
          </span>
          <JobStatusBadge status={job.status} />
          {userRole === 'candidate' && (
            <button
              onClick={handleHeartClick}
              disabled={isSaving}
              className={`text-primary-80 hover:text-red-500 transition-colors ${
                isSaving ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              title={isSaved ? 'Remove from saved' : 'Save job'}
            >
              <Heart 
                size={24} 
                className={isSaved ? 'fill-red-500 text-red-500' : ''}
              />
            </button>
          )}
        </div>
      </div>
    </Link>
  );
}
