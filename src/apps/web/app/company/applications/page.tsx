"use client";
import {
  ArrowLeft,
  BookUser,
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
} from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import KeyWord from "../../../components/keyWord";
import Skills from "../../../components/skills";
import Education from "../../../components/education";
import WorkExperience from "../../../components/workExperience";
import ProtectedRoute from "../../../components/ProtectedRoute";
import { getApplicationsByJob, Application } from "../../../services/applications";
import { formatRelativeTime } from "../../../utils/numberUtils";
import { toast } from "react-toastify";


function RecruiterApplicationsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const jobId = searchParams.get('jobId');
  const jobTitle = searchParams.get('jobTitle') || 'Job Applications';

  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [experience, setExperience] = useState("allExperience");
  const [education, setEducation] = useState("allEducation");
  const [location, setLocation] = useState("allLocation");

  // Fetch applications for the specific job
  useEffect(() => {
    const fetchApplications = async () => {
      if (!jobId) {
        setError("No job ID provided");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await getApplicationsByJob(jobId);
        
        if (response.success && response.data) {
          setApplications(response.data);
        } else {
          setError(response.message || "Failed to fetch applications");
        }
      } catch (error) {
        setError("Network error occurred");
        console.error("Error fetching applications:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, [jobId]);

  const handleRowClick = (applicationId: string) => {
    router.push(`/company/applications/${applicationId}?jobId=${jobId}&jobTitle=${encodeURIComponent(jobTitle)}`);
  };

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-primary text-lg">Loading applications...</div>
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

  if (applications.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-primary text-lg">No applications found for this job.</div>
      </div>
    );
  }

  return (
    <div className="flex gap-2 bg-neutral-light-60">
      <div className="flex-1 flex flex-col">
        <button
          onClick={() => router.back()}
          className="flex gap-2 cursor-pointer m-4"
        >
          <div className="text-primary">
            <ArrowLeft size={34} />
          </div>
          <span className="text-accent text-2xl font-semibold">
            Applications
          </span>
        </button>
        <div className="h-full bg-neutral-light-20  rounded-tr-2xl">
          <div>
            <div className="bg-primary rounded-tr-2xl text-highlight-20 px-4 py-2 font-semibold">
              Experience
            </div>
            <div className="flex flex-col">
              <label className="px-4 py-2 text-primary hover:bg-neutral-light-80 cursor-pointer">
                <input
                  type="radio"
                  name="experience"
                  value="allExperience"
                  checked={experience === "allExperience"}
                  onChange={(e) => setExperience(e.target.value)}
                  className="mr-2 bg-accent accent-accent"
                />
                All
              </label>
              <label className="px-4 py-2 text-primary hover:bg-neutral-light-80 cursor-pointer">
                <input
                  type="radio"
                  name="experience"
                  value="noRequired"
                  checked={experience === "noRequired"}
                  onChange={(e) => setExperience(e.target.value)}
                  className="mr-2 bg-accent accent-accent"
                />
                No required
              </label>
              <label className="px-4 py-2 text-primary hover:bg-neutral-light-80 cursor-pointer">
                <input
                  type="radio"
                  name="experience"
                  value="lessThan1"
                  checked={experience === "lessThan1"}
                  onChange={(e) => setExperience(e.target.value)}
                  className="mr-2 bg-accent accent-accent"
                />
                Less than 1 year
              </label>
              <label className="px-4 py-2 text-primary hover:bg-neutral-light-80 cursor-pointer">
                <input
                  type="radio"
                  name="experience"
                  value="1"
                  checked={experience === "1"}
                  onChange={(e) => setExperience(e.target.value)}
                  className="mr-2 bg-accent accent-accent"
                />
                1 year
              </label>
              <label className="px-4 py-2 text-primary hover:bg-neutral-light-80 cursor-pointer">
                <input
                  type="radio"
                  name="experience"
                  value="2"
                  checked={experience === "2"}
                  onChange={(e) => setExperience(e.target.value)}
                  className="mr-2 bg-accent accent-accent"
                />
                2 years
              </label>
              <label className="px-4 py-2 text-primary hover:bg-neutral-light-80 cursor-pointer">
                <input
                  type="radio"
                  name="experience"
                  value="3"
                  checked={experience === "3"}
                  onChange={(e) => setExperience(e.target.value)}
                  className="mr-2 bg-accent accent-accent"
                />
                3 years
              </label>
              <label className="px-4 py-2 text-primary hover:bg-neutral-light-80 cursor-pointer">
                <input
                  type="radio"
                  name="experience"
                  value="4"
                  checked={experience === "4"}
                  onChange={(e) => setExperience(e.target.value)}
                  className="mr-2 bg-accent accent-accent"
                />
                4 years
              </label>
              <label className="px-4 py-2 text-primary hover:bg-neutral-light-80 cursor-pointer">
                <input
                  type="radio"
                  name="experience"
                  value="5"
                  checked={experience === "5"}
                  onChange={(e) => setExperience(e.target.value)}
                  className="mr-2 bg-accent accent-accent"
                />
                5 years
              </label>
              <label className="px-4 py-2 text-primary hover:bg-neutral-light-80 cursor-pointer">
                <input
                  type="radio"
                  name="experience"
                  value="over5"
                  checked={experience === "over5"}
                  onChange={(e) => setExperience(e.target.value)}
                  className="mr-2 bg-accent accent-accent"
                />
                Over 5 years
              </label>
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
                  onChange={(e) => setEducation(e.target.value)}
                  className="mr-2 bg-accent accent-accent"
                />
                All
              </label>
              <label className="px-4 py-2 text-primary hover:bg-neutral-light-80 cursor-pointer">
                <input
                  type="radio"
                  name="education"
                  value="highSchool"
                  checked={education === "highSchool"}
                  onChange={(e) => setEducation(e.target.value)}
                  className="mr-2 bg-accent accent-accent"
                />
                High School
              </label>
              <label className="px-4 py-2 text-primary hover:bg-neutral-light-80 cursor-pointer">
                <input
                  type="radio"
                  name="education"
                  value="vocationalCertificate"
                  checked={education === "vocationalCertificate"}
                  onChange={(e) => setEducation(e.target.value)}
                  className="mr-2 bg-accent accent-accent"
                />
                Vocational Certificate
              </label>
              <label className="px-4 py-2 text-primary hover:bg-neutral-light-80 cursor-pointer">
                <input
                  type="radio"
                  name="education"
                  value="collegeDiploma"
                  checked={education === "collegeDiploma"}
                  onChange={(e) => setEducation(e.target.value)}
                  className="mr-2 bg-accent accent-accent"
                />
                College Diploma
              </label>
              <label className="px-4 py-2 text-primary hover:bg-neutral-light-80 cursor-pointer">
                <input
                  type="radio"
                  name="education"
                  value="bachelor"
                  checked={education === "bachelor"}
                  onChange={(e) => setEducation(e.target.value)}
                  className="mr-2 bg-accent accent-accent"
                />
                Bachelor's Degree
              </label>
              <label className="px-4 py-2 text-primary hover:bg-neutral-light-80 cursor-pointer">
                <input
                  type="radio"
                  name="education"
                  value="master"
                  checked={education === "master"}
                  onChange={(e) => setEducation(e.target.value)}
                  className="mr-2 bg-accent accent-accent"
                />
                Master's Degree
              </label>
              <label className="px-4 py-2 text-primary hover:bg-neutral-light-80 cursor-pointer">
                <input
                  type="radio"
                  name="education"
                  value="doctorate"
                  checked={education === "doctorate"}
                  onChange={(e) => setEducation(e.target.value)}
                  className="mr-2 bg-accent accent-accent"
                />
                Doctorate
              </label>
              <label className="px-4 py-2 text-primary hover:bg-neutral-light-80 cursor-pointer">
                <input
                  type="radio"
                  name="education"
                  value="ielts"
                  checked={education === "ielts"}
                  onChange={(e) => setEducation(e.target.value)}
                  className="mr-2 bg-accent accent-accent"
                />
                IELTS
              </label>
              <label className="px-4 py-2 text-primary hover:bg-neutral-light-80 cursor-pointer">
                <input
                  type="radio"
                  name="education"
                  value="hsk"
                  checked={education === "hsk"}
                  onChange={(e) => setEducation(e.target.value)}
                  className="mr-2 bg-accent accent-accent"
                />
                HSK
              </label>
            </div>
          </div>
          <div>
            <div className="bg-primary text-highlight-20 px-4 py-2 font-semibold">
              Location
            </div>
            <div className="flex flex-col">
              <label className="px-4 py-2 text-primary hover:bg-neutral-light-80 cursor-pointer">
                <input
                  type="radio"
                  name="location"
                  value="allLocation"
                  checked={location === "allLocation"}
                  onChange={(e) => setLocation(e.target.value)}
                  className="mr-2 bg-accent accent-accent"
                />
                All
              </label>
              <label className="px-4 py-2 text-primary hover:bg-neutral-light-80 cursor-pointer">
                <input
                  type="radio"
                  name="location"
                  value="hcm"
                  checked={location === "hcm"}
                  onChange={(e) => setLocation(e.target.value)}
                  className="mr-2 bg-accent accent-accent"
                />
                Ho Chi Minh
              </label>
              <label className="px-4 py-2 text-primary hover:bg-neutral-light-80 cursor-pointer">
                <input
                  type="radio"
                  name="location"
                  value="hn"
                  checked={location === "hn"}
                  onChange={(e) => setLocation(e.target.value)}
                  className="mr-2 bg-accent accent-accent"
                />
                Ha Noi
              </label>
              <label className="px-4 py-2 text-primary hover:bg-neutral-light-80 cursor-pointer">
                <input
                  type="radio"
                  name="location"
                  value="AG"
                  checked={location === "AG"}
                  onChange={(e) => setLocation(e.target.value)}
                  className="mr-2 bg-accent accent-accent"
                />
                An Giang
              </label>
              <label className="px-4 py-2 text-primary hover:bg-neutral-light-80 cursor-pointer">
                <input
                  type="radio"
                  name="location"
                  value="HP"
                  checked={location === "HP"}
                  onChange={(e) => setLocation(e.target.value)}
                  className="mr-2 bg-accent accent-accent"
                />
                Hai Phong
              </label>
              <label className="px-4 py-2 text-primary hover:bg-neutral-light-80 cursor-pointer">
                <input
                  type="radio"
                  name="location"
                  value="DN"
                  checked={location === "DN"}
                  onChange={(e) => setLocation(e.target.value)}
                  className="mr-2 bg-accent accent-accent"
                />
                Dong Nai
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-6 flex flex-col gap-4 m-4">
        <div className="flex justify-end">
          <KeyWord />
        </div>
        <b className="bg-neutral-light-20 text-primary text-2xl px-4 py-2 rounded-lg border border-primary-60">
          {jobTitle}
        </b>
        <div>
          <table className="w-full table-fixed">
            <thead>
              <tr className="bg-primary text-neutral-light-20 align-middle">
                <th className="w-2/15 border border-primary-60 p-2">Name</th>
                <th className="w-2/15 border border-primary-60 p-2">
                  Industry
                </th>
                <th className="w-2/15 border border-primary-60 p-2">
                  Location
                </th>
                <th className="w-1/15 border border-primary-60 p-2">CV</th>
                <th className="w-1/15 border border-primary-60 p-2">Profile</th>
                <th className="w-2/15 border border-primary-60 p-2">
                  Application status
                </th>
                <th className="w-2/15 border border-primary-60 p-2">
                  Date Submitted
                </th>
                <th className="w-3/15 border border-primary-60 p-2">Note</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application, index) => (
                <tr
                  key={application.id}
                  onClick={() => handleRowClick(application.id)}
                  className={`py-2 px-4 text-primary-80 hover:bg-highlight transition-colors cursor-pointer ${
                    index % 2 === 0 ? "bg-highlight-20" : "bg-highlight-40"
                  }`}
                >
                  <td className="w-2/15 border border-primary-60 p-2">
                    <span className="line-clamp-1">{application.user_profile.full_name}</span>
                  </td>
                  <td className="w-2/15 border border-primary-60 p-2">
                    <span className="line-clamp-1">{application.user_profile.industry}</span>
                  </td>
                  <td className="w-2/15 border border-primary-60 p-2">
                    <span className="line-clamp-1">{application.user_profile.province}, {application.user_profile.ward}</span>
                  </td>
                  <td className="w-1/15 border border-primary-60 p-2">
                    <span className="flex justify-center items-center">
                      <b
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownloadResume(application.resume_url, application.user_profile.full_name);
                        }}
                        className="text-accent hover:text-secondary-60"
                      >
                        <Download size={16} />
                      </b>
                    </span>
                  </td>
                  <td className="w-1/15 border border-primary-60 p-2">
                    <span className="flex justify-center items-center">
                      <User size={16} />
                    </span>
                  </td>
                  <td className="w-2/15 border border-primary-60 p-2">
                    <span className="line-clamp-1 px-2 py-1 rounded" >
                      {application.status}
                    </span>
                  </td>
                  <td className="w-2/15 border border-primary-60 p-2">
                    <span className="line-clamp-1">{formatRelativeTime(new Date(application.applied_at))}</span>
                  </td>
                  <td className="w-3/15 border border-primary-60 p-2">
                    <span className="line-clamp-1">{application.notes || 'No notes'}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
}

export default function RecruiterApplicationsPage() {
  return (
    <ProtectedRoute allowedRoles={['company']}>
      <RecruiterApplicationsContent />
    </ProtectedRoute>
  );
}
