"use client";
import { useState, useEffect } from "react";
import { 
  FileText, 
  Calendar, 
  Clock, 
  Download,
  CheckCircle,
  XCircle,
  Clock as ClockIcon
} from "lucide-react";
import { getApplicationByCandidate, getApplicationById, Application, ApplicationDetail } from "../../services/applications";
import { toast } from "react-toastify";
import { formatISODate, formatISODateTime } from "../../utils/numberUtils";
import JobStatusBadge from "./jobStatusBadge";

interface CandidateApplicationProps {
  jobId: string ;
  applicationId?: string | null;
}


export default function CandidateApplication({ jobId, applicationId }: CandidateApplicationProps) {
  const [applicationDetail, setApplicationDetail] = useState<ApplicationDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        setLoading(true);
        
        if (applicationId) {
          const response = await getApplicationById(applicationId);
          
          if (response.success && response.data) {
            setApplicationDetail(response.data);
          } else {
            setError(response.message || 'Failed to fetch application details');
          }
        } else {
          const response = await getApplicationByCandidate(jobId);
          
          if (response.success && response.data && response.data.length > 0) {
            const app = response.data[0];
            setApplicationDetail(app as unknown as ApplicationDetail);
          } else {
            setError('No application found for this job');
          }
        }
      } catch (error) {
        setError('Network error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [jobId, applicationId]);

  const handleDownloadCV = (resumeUrl: string) => {
    if (resumeUrl) {
      window.open(resumeUrl, '_blank');
    } else {
      toast.info('CV download functionality will be implemented');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-primary text-lg">Loading your application...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-red-500 text-lg">Error: {error}</div>
      </div>
    );
  }

  if (!applicationDetail) {
    return null;
  }

  return (
    <div className="p-6 mt-6">
      <div className="space-y-6">
        <div>
          <span className="text-primary font-medium">Application Status:</span>  <JobStatusBadge status={applicationDetail.status} />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="text-primary font-medium">CV:</span>
            <a 
              href={applicationDetail.resume_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary underline hover:text-accent"
            >
              {applicationDetail.user_profile.full_name || 'Resume'}.pdf
            </a>
          </div>
        </div>

        <div className="bg-neutral-light-20 rounded-lg overflow-hidden">
          <div className="bg-secondary text-white px-4 py-2 text-center font-medium">
            Cover letter
          </div>
          <div className="p-4 bg-neutral-light-20">
            <p className="text-text-80 text-sm leading-relaxed">
              {applicationDetail.cover_letter || 'No cover letter'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 