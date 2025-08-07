"use client";
import {
  ArrowLeft,
  SquarePlus,
  Phone,
  Briefcase,
  GraduationCap,
  Download,
  Clock,
  CheckCircle,
  XCircle,
  User,
  MapPin,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import ProtectedRoute from "../../../../components/ProtectedRoute";
import { getApplicationById, ApplicationDetail, ApplicationStatusHistory, updateApplicationStatus } from "../../../../services/applications";
import { getCandidateProfileById, Profile } from "../../../../services/candidateProfile";
import { formatRelativeTime } from "../../../../utils/numberUtils";
import { toast } from "react-toastify";
import CandidateProfileDetail from "../../../../components/candidate/CandidateProfileDetail";
import JobStatusBadge from "../../../../components/job/jobStatusBadge";



const STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending', className: 'bg-gray-400 text-white' },
  { value: 'shortlist', label: 'Shortlist', className: 'bg-blue-200 text-blue-900' },
  { value: 'interview_request', label: 'Interview request', className: 'bg-blue-400 text-white' },
  { value: 'hired', label: 'Hire', className: 'bg-blue-700 text-white' },
  { value: 'rejected', label: 'Reject', className: 'bg-gray-600 text-white' },
];

function ApplicationDetailContent() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const applicationId = params.id as string;
  const jobId = searchParams.get('jobId');
  const jobTitle = searchParams.get('jobTitle') || 'Job Application';

  const [application, setApplication] = useState<ApplicationDetail | null>(null);
  const [candidateProfile, setCandidateProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showStatusForm, setShowStatusForm] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [noteInput, setNoteInput] = useState<string>("");

  useEffect(() => {
    if (application) {
      setSelectedStatus(application.status || "pending");
      setNoteInput(application.notes || "");
    }
  }, [application]);

  // Fetch application details and candidate profile
  useEffect(() => {
    const fetchData = async () => {
      if (!applicationId) {
        setError("No application ID provided");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        
        // Fetch application details
        const applicationResponse = await getApplicationById(applicationId);
        
                 if (applicationResponse.success && applicationResponse.data) {
           setApplication(applicationResponse.data);
           
           // Fetch candidate profile using candidate_id from user_profile
           if (applicationResponse.data.user_profile && applicationResponse.data.user_profile.id) {
             try {
               const profileResponse = await getCandidateProfileById(applicationResponse.data.candidate_id);
               if (profileResponse.success && profileResponse.data?.profile) {
                 setCandidateProfile(profileResponse.data.profile);
               }
             } catch (profileError) {
               console.error("Error fetching candidate profile:", profileError);
               // Don't fail the whole request if profile fetch fails
             }
           }
         } else {
           setError(applicationResponse.message || "Failed to fetch application");
         }
      } catch (error) {
        setError("Network error occurred");
        console.error("Error fetching application:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [applicationId]);

  const handleDownloadResume = (resumeUrl: string, candidateName: string) => {
    try {
      const link = document.createElement('a');
      link.href = resumeUrl;
      link.download = `${candidateName}_resume.pdf`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      toast.error("Failed to download resume");
    }
  };

  const handleBackClick = () => {
    if (jobId && jobTitle) {
      router.push(`/company/applications?jobId=${jobId}&jobTitle=${encodeURIComponent(jobTitle)}`);
    } else {
      router.back();
    }
  };

  const handleUpdateStatus = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!applicationId) return;
    setIsUpdating(true);
    try {
      const res = await updateApplicationStatus(applicationId, { newStatus: selectedStatus, notes: noteInput || undefined });
      if (res.success) {
        toast.success("Application status updated successfully");
        setShowStatusForm(false);
        // reload application
        const applicationResponse = await getApplicationById(applicationId);
        if (applicationResponse.success && applicationResponse.data) {
          setApplication(applicationResponse.data);
        }
      } else {
        toast.error(res.message || "Failed to update status");
      }
    } catch (err) {
      toast.error("Network error");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-primary text-lg">Loading application details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-lg">Error: {error}</div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-primary text-lg">Application not found.</div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-light-40 min-h-screen">
      <div className="flex flex-col mx-6 my-4">
        <button
          onClick={handleBackClick}
          className="flex gap-2 cursor-pointer mb-4"
        >
          <div className="text-primary">
            <ArrowLeft size={34} />
          </div>
          <span className="text-accent text-2xl font-semibold">
            Back to Applications
          </span>
        </button>
      </div>

      <div className="flex flex-col mx-6 mb-6">
        <div className="bg-neutral-light-20 rounded-t-2xl p-4">
          <div className="flex justify-between items-center">
            <span className="text-primary text-2xl font-bold">
              Profile:
            </span>
            <button
              onClick={handleBackClick}
              className="text-primary hover:text-accent"
              title="Back to Applications"
            >
              <X size={24} />
            </button>
          </div>
        </div>

         {candidateProfile && (
           <div className="bg-neutral-light-20 shadow-md rounded-3xl mb-6">
             <CandidateProfileDetail 
               profile={candidateProfile} 
               showActions={false}
               onDownloadResume={() => handleDownloadResume(application.resume_url, candidateProfile.full_name)}
             />
           </div>
         )}

         {/* Application Notes */}
         {application.notes && (
           <div className="bg-neutral-light-20 shadow-md rounded-3xl mb-6">
             <div className="flex flex-col gap-y-4 mx-10 my-4">
               <div className="flex flex-col">
                 <div className="flex gap-2 text-accent font-bold">
                   <Briefcase size={24} />
                   <span>NOTES</span>
                 </div>
                 <span className="text-primary-80 border-t border-primary-40">
                   {application.notes}
                 </span>
               </div>
             </div>
           </div>
         )}

         {/* Application Status History */}
         {application.application_status_history && application.application_status_history.length > 0 && (
           <div className="bg-neutral-light-20 shadow-md rounded-3xl mb-6">
             <div className="flex flex-col gap-y-4 mx-10 my-4">
               <div className="flex flex-col">
                 <div className="flex gap-2 text-accent font-bold">
                   <Clock size={24} />
                   <span>STATUS HISTORY</span>
                 </div>
                 <div className="flex flex-col border-t border-primary-40">
                   {application.application_status_history.map((history: ApplicationStatusHistory, idx: number) => (
                     <div key={idx} className="p-2">
                       <div className="flex items-center gap-2 text-sm">
                         <JobStatusBadge status={history.old_status} />
                         <span>→</span>
                         <JobStatusBadge status={history.new_status} />
                         <span className="text-primary-60 text-xs">
                           {formatRelativeTime(new Date(history.created_at))}
                         </span>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
             </div>
           </div>
         )}

                   {/* Cover Letter */}
          <div className=" mb-6">
            <div className="flex flex-col gap-y-4 mx-10 my-4">
              <div className="flex flex-col">
                <span className="text-primary text-2xl font-bold">
              COVER LETTER:
            </span>
                <span className="text-primary-80 bg-white p-4 rounded-lg whitespace-pre-line">
                  {application.cover_letter || 'No cover letter'}
                </span>
              </div>
            </div>
          </div>
      </div>

      <div className="flex flex-wrap gap-2 mx-10 mb-4">
        <button 
          onClick={() => toast.info("Report functionality will be implemented")}
          className="bg-[#F52121] text-background hover:bg-red-800 px-6 py-2 rounded-full cursor-pointer"
        >
          Report
        </button>
        <button 
          onClick={() => setShowStatusForm((v) => !v)}
          className="bg-primary-80 text-neutral-light-20 px-6 py-2 rounded-full cursor-pointer disabled:opacity-60"
          disabled={isUpdating}
          
        >
          Update Status
        </button>
        {showStatusForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 animate-fade-in">
            <form onSubmit={handleUpdateStatus} className="bg-white rounded-2xl shadow-2xl p-6 flex flex-col gap-4 w-full max-w-xs animate-fade-in">
              <label className="font-semibold text-primary">Select new status:</label>
              <div className="flex flex-col gap-2">
                {STATUS_OPTIONS.map(opt => (
                  <button
                    type="button"
                    key={opt.value}
                    className={`w-full text-left px-1 py-1 rounded-lg font-semibold border-none outline-none ${selectedStatus === opt.value ? 'ring-2 ring-accent' : ''}`}
                    onClick={() => setSelectedStatus(opt.value)}
                  >
                    {opt.value}
                  </button>
                ))}
              </div>
              <label className="font-semibold text-primary mt-2">Note (optional):</label>
              <textarea
                className="border rounded-lg p-2 min-h-[60px]"
                value={noteInput}
                onChange={e => setNoteInput(e.target.value)}
                placeholder="Enter note for HR/company..."
              />
              <div className="flex gap-2 mt-2">
                <button
                  type="submit"
                  className="bg-accent text-white px-4 py-2 rounded-full font-semibold disabled:opacity-60"
                  disabled={isUpdating}
                >
                  {isUpdating ? 'Updating...' : 'Submit'}
                </button>
                <button
                  type="button"
                  className="bg-gray-300 text-primary px-4 py-2 rounded-full font-semibold"
                  onClick={() => setShowStatusForm(false)}
                  disabled={isUpdating}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ApplicationDetailPage() {
  return (
    <ProtectedRoute allowedRoles={['company']}>
      <ApplicationDetailContent />
    </ProtectedRoute>
  );
}

