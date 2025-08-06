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
} from "lucide-react";
import ApplyJobModal from "../../components/applyJobModal";
import CandidateApplication from "./candidateApplication";
import { useRouter, useSearchParams } from "next/navigation";
import { Job } from "../../services/jobs";
import { useSaveJob } from "../../hooks/useSaveJob";    
import { getUserRole } from "../../utils/auth";
import { CompanyProfile } from "../../services/companyProfile";
import GoBack from "../goBack";
import { toast } from "react-toastify";

interface JobDetailData {
  company: CompanyProfile;
  job: Job;
}

interface JobDetailProps {
  job?: Job;
  jobDetailData?: JobDetailData;
  isHR?: boolean;
  isSaved?: boolean;
}

export default function JobDetail({ job: propJob, jobDetailData, isHR, isSaved = false }: JobDetailProps) {
  const [job, setJob] = useState<Job | null>(propJob || jobDetailData?.job || null);
  const [company, setCompany] = useState<CompanyProfile | null>(jobDetailData?.company || null);
  const [isSavedState, setIsSavedState] = useState<boolean>(isSaved);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [hasApplied, setHasApplied] = useState<boolean>(false);
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const { handleSaveJob, handleUnsaveJob, isSaving } = useSaveJob();
  const userRole = getUserRole();
  const router = useRouter();
  const searchParams = useSearchParams();

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
        newUrl.searchParams.set('saved', 'true');
      } else {
        newUrl.searchParams.delete('saved');
      }
      window.history.replaceState({}, '', newUrl.toString());
      
      if (!newSavedState && isSaved) {
        const referrer = document.referrer;
      }
    }
  };

  const handleEditClick = () => {
    if (job) {
      router.push(`/jobs/${job.id}/edit`);
    }
  };

  // Check if user has applied to this job
  useEffect(() => {
    const checkIfApplied = () => {
      // Check if coming from jobs-applied page
      const fromAppliedJobs = searchParams.get('from') === 'applied';
      const appId = searchParams.get('application_id');
      
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
    ? 'Negotiable' 
    : `${parseInt(job.salary_min).toLocaleString()} - ${parseInt(job.salary_max).toLocaleString()}`;

  const deadlineDate = job.deadline ? new Date(job.deadline).toLocaleDateString() : 'Not specified';

  return (
    <div className="bg-neutral-light-40 min-h-screen">
      <div className="flex flex-col mx-6 my-4">
        <GoBack />
        {isHR && (
          <button
            onClick={handleEditClick}
            className="flex items-center gap-2 px-4 py-2 bg-accent text-background rounded-lg hover:bg-accent/90 transition-colors"
          >
            <Edit size={20} />
            Edit Job
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-8 px-6">
        <div className="flex-2 space-y-4">
          <div className="flex flex-col justify-between bg-neutral-light-20 shadow-xl rounded-3xl space-y-4 p-6">
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
            <div className="flex flex-wrap gap-4 justify-between">
              <div className="flex relative bg-highlight rounded-xl px-2">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary-80">
                  <Clock size={24} />
                </div>
                <span className="w-full pl-10 pr-4 py-2 text-lg font-semibold rounded-xl text-primary-80 ">
                  Deadline: {deadlineDate}
                </span>
              </div>
              <div className="flex flex-wrap gap-4">
                {!isHR ? (
                  <button
                    onClick={hasApplied ? undefined : () => setIsApplyModalOpen(true)}
                    disabled={hasApplied}
                    className={`px-6 py-2 rounded-full font-semibold text-lg transition-all duration-300 transform ${
                      hasApplied 
                        ? 'bg-green-600 text-white cursor-not-allowed' 
                        : 'bg-accent text-background hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 cursor-pointer'
                    }`}
                  >
                    {hasApplied ? 'Applied ✓' : 'Apply now'}
                  </button>
                ) : (
                  <button
                    disabled
                    className="px-6 py-2 bg-accent rounded-full text-background font-semibold text-lg cursor-not-allowed"
                  >
                    Applied: {job.applications_count}/{job.number_of_openings}
                  </button>
                )}
                {userRole === 'candidate' && (
                  <button
                    onClick={handleSaveClick}
                    disabled={isSaving}
                    className={`px-6 py-2 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 transform hover:-translate-y-0.5 flex items-center gap-2 ${
                      isSavedState 
                        ? 'bg-red-500 text-white hover:bg-red-600' 
                        : 'bg-accent text-background hover:bg-accent/90'
                    } ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <Heart 
                      size={20} 
                      className={isSavedState ? 'fill-white' : ''}
                    />
                    {isSavedState ? 'Saved' : 'Save'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <div className="flex flex-col justify-between bg-neutral-light-20 shadow-xl rounded-3xl space-y-4 p-6">
            <div className="flex px-2">
              <img
                src={company?.logo_url || "/logo.png"}
                alt="Company"
                className="border-1 rounded-xs w-16 h-16 object-contain"
              />
              <div className="text-primary ml-4">{company?.company_name || "Company Name"}</div>
            </div>
            <div className="px-4 space-y-3">
              {company?.size && (
                <div className="flex gap-10">
                  <div className="flex gap-4">
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
                    <span className="text-primary font-semibold">Address: </span>
                  </div>
                  <span className="text-primary-80">{company.address}</span>
                </div>
              )}
              {company?.phone_number && (
                <div className="flex gap-3">
                  <div className="flex gap-2">
                    <Phone size={24} className="text-primary" />
                    <span className="text-primary font-semibold">Phone: </span>
                  </div>
                  <span className="text-primary-80">{company.phone_number}</span>
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
        </div>
      </div>

      <div className="flex flex-wrap gap-6 px-6">
        <div className="flex-2 space-y-4">
          <div className="bg-neutral-light-20 shadow-xl rounded-3xl space-y-4">
            <div className="flex flex-col">
              <span className="w-full rounded-t-3xl text-background font-semibold text-2xl px-6 py-4 bg-secondary">
                Job detail
              </span>
              <div className="flex flex-col justify-between px-6 space-y-4 mt-4">
                <div className="">
                  <h2 className="font-semibold text-accent">Job Description</h2>
                  <p className="text-primary">{job.description || 'No description available'}</p>
                </div>
                <div>
                  <h2 className="font-semibold text-accent">
                    Applicant Requirements
                  </h2>
                  <p className="text-primary">{job.requirements || 'No requirements specified'}</p>
                </div>
                <div>
                  <h2 className="font-semibold text-accent">Benefits</h2>
                  <p className="text-primary">{job.benefits || 'No benefits specified'}</p>
                </div>
                <div>
                  <h2 className="font-semibold text-accent">Responsibilities</h2>
                  <p className="text-primary">{job.responsibilities || 'No responsibilities specified'}</p>
                </div>
                <div>
                  <h2 className="font-semibold text-accent">Work Place</h2>
                  <p className="text-primary">{job.work_place}</p>
                </div>
                <div>
                  <h2 className="font-semibold text-accent">Working Time</h2>
                  <p className="text-primary">{job.working_hours || 'Not specified'}</p>
                </div>
                <div>
                  <h2 className="font-semibold text-accent">
                    {hasApplied ? 'Application Status' : 'Apply now!'}
                  </h2>
                  <p className="text-primary">
                    {hasApplied 
                      ? 'You have already applied for this position.' 
                      : 'Click the Apply button above to submit your application.'
                    }
                  </p>
                  {!isHR && (
                    <button
                      onClick={hasApplied ? undefined : () => setIsApplyModalOpen(true)}
                      disabled={hasApplied}
                      className={`mb-4 mt-4 px-6 py-2 rounded-full font-semibold text-lg duration-300 ${
                        hasApplied 
                          ? 'bg-green-600 text-white cursor-not-allowed' 
                          : 'bg-accent text-background hover:shadow-lg hover:shadow-primary/30 cursor-pointer'
                      }`}
                    >
                      {hasApplied ? 'Applied ✓' : 'Apply now'}
                    </button>
                  )}
                </div>
                 
               </div>
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <div className="flex flex-col justify-between rounded-xl p-4 space-y-4">
            <div className="bg-neutral-light-20 shadow-xl rounded-3xl space-y-4">
              <div className="flex flex-col justify-between">
                <span className="w-full rounded-t-3xl text-background font-semibold text-2xl text-center px-6 py-4 bg-secondary">
                  General Information
                </span>
                <div className="flex flex-col space-y-4 my-6 mx-6">
                  <div className="flex px-4 gap-4">
                    <ShieldHalf
                      size={34}
                      className="bg-linear-(--gradient-primary-2) rounded-full text-background"
                    />
                    <div className="flex flex-col justify-between">
                      <span className="text-secondary font-semibold">
                        Position
                      </span>
                      <span className="text-secondary-80">{job.position}</span>
                    </div>
                  </div>
                  <div className="flex px-4 gap-4">
                    <GraduationCap
                      size={34}
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
                  <div className="flex px-4 gap-4">
                    <Users
                      size={34}
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
                  <div className="flex px-4 gap-4">
                    <BriefcaseBusiness
                      size={34}
                      className="bg-linear-(--gradient-primary-2) rounded-full text-background"
                    />
                    <div className="flex flex-col">
                      <span className="text-secondary font-semibold">
                        Job type
                      </span>
                      <span className="text-secondary-80">
                        {job.job_type}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-xl p-4 space-y-4">
            <div className="bg-neutral-light-20 shadow-xl rounded-3xl space-y-4">
              <div className="flex flex-col justify-between">
                <span className="w-full rounded-t-3xl text-background font-semibold text-2xl text-center px-6 py-4 bg-secondary">
                  Job Tags
                </span>
                <div className="flex flex-col space-y-4 mx-6 my-6">
                  <div className="flex flex-col space-y-2">
                    <span className="font-semibold text-xl text-accent">
                      Experience Level
                    </span>
                    <div className="grid grid-cols-2 gap-4 p-2">
                      <span className="bg-highlight-40 rounded-full px-4 py-2 text-center text-primary font-semibold">
                        {job.experience_level}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <span className="font-semibold text-xl text-accent">
                      Job Type
                    </span>
                    <div className="grid grid-cols-2 gap-4 p-2">
                      <span className="bg-highlight-40 rounded-full px-4 py-2 text-center text-primary font-semibold">
                        {job.job_type}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <span className="font-semibold text-xl text-accent">
                      Location
                    </span>
                    <div className="grid grid-cols-2 gap-4 p-2">
                      <span className="bg-highlight-40 rounded-full px-4 py-2 text-center text-primary font-semibold">
                        {job.province}
                      </span>
                    </div>
                  </div>
                  {job.skills && (
                    <div className="flex flex-col space-y-2">
                      <span className="font-semibold text-xl text-accent">
                        Skills
                      </span>
                      <div className="flex flex-wrap gap-2 p-2">
                        {job.skills.split(',').map((skill, index) => (
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
      </div>

      {isHR && (
        <div className="flex flex-col gap-6 mx-6 my-4">
          <div className="flex gap-2 items-center">
            <span className="text-primary-80 font-semibold">Status:</span>
            <button className="bg-accent hover:bg-secondary text-neutral-light-20 px-6 py-2 rounded-full cursor-pointer">
              {job.status}
            </button>
          </div>
          
          
          <div className="flex gap-4">
            <button className="bg-[#E91919] hover:bg-red-800 text-background px-6 py-2 rounded-full cursor-pointer">
              Close
            </button>
            <button className="bg-[#E91919] hover:bg-red-800 text-background px-6 py-2 rounded-full cursor-pointer">
              Delete
            </button>
          </div>
        </div>
      )}
      
      {/* Apply Job Modal */}
      {!isHR && job && !hasApplied && (
        <ApplyJobModal 
          jobId={job.id} 
          jobTitle={job.title} 
          isOpen={isApplyModalOpen} 
          onClose={() => setIsApplyModalOpen(false)} 
        />
      )}

      {/* Candidate Application Details */}
      {!isHR && hasApplied && job && (
        <CandidateApplication jobId={job.id} applicationId={applicationId} />
      )}
    </div>
  );
}
