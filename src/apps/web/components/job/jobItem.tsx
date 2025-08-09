import { Heart } from "lucide-react";
import JobStatusBadge from "./jobStatusBadge";
import Link from "next/link";
import { getUserRole } from '../../utils/auth';
import { useSaveJob } from '../../hooks/useSaveJob';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface JobItemProps {
  job: {
    id: string;
    logo: string;
    name: string;
    title: string;
    company_name: string;
    province: string;
    experience: string;
    salary: string;
    postedAt: string;
    is_salary_negotiable: boolean;
    status?: string;
    is_saved?: boolean;
    is_applied?: boolean;
    fromApplied?: boolean;
    application_id?: string;
  };
}

export default function Job({ job }: JobItemProps) {
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
        
        if (window.location.pathname.includes('/saved-jobs')) {
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
    if (isSaved) params.append('saved', 'true');
    if (job.fromApplied) params.append('from', 'applied');
    if (job.application_id) params.append('application_id', job.application_id);
    const queryString = params.toString();
    return `/jobs/${job.id}${queryString ? `?${queryString}` : ''}`;
  };

  return (
    <Link href={buildJobUrl()}>
      <div className="shadow-md bg-neutral-light-20 rounded-xl border border-primary-20 p-3 mx-4 mt-3 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer">
        <div className="flex gap-3">
          <img
            src={job.logo}
            alt={job.name}
            className="object-contain h-12 w-12"
          />
          <div className="flex flex-col justify-between flex-1">
            <span className="font-bold text-base text-primary line-clamp-2">
              {job.title}
            </span>
            <div className="flex flex-col justify-between gap-1.5 mt-1.5">
              <span className="text-primary-60 font-semibold line-clamp-1 text-sm">
                {job.company_name}
              </span>
              <div className="flex justify-between items-start flex-wrap gap-1.5">
                <div className="flex flex-wrap gap-1.5">
                  <span className="bg-accent-20 text-primary-80 font-semibold rounded-full px-3 py-0.5 text-xs">
                    {job.province}
                  </span>

                  <span className="bg-accent-20 text-primary-80 font-semibold rounded-full px-3 py-0.5 text-xs">
                    {job.experience}
                  </span>

                  <span className="bg-accent-20 text-primary-80 font-semibold rounded-full px-3 py-0.5 text-xs">
                    {job.salary}
                  </span>

                  <span className="bg-accent-20 text-primary-80 font-semibold rounded-full px-3 py-0.5 text-xs">
                    {job.is_salary_negotiable ? "Negotiable" : "Fixed "}
                  </span>



                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-primary-60 font-semibold text-xs">
                    {job.postedAt}
                  </span>
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
                        size={18} 
                        className={isSaved ? 'fill-red-500 text-red-500' : 'text-secondary-40'}
                      />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
