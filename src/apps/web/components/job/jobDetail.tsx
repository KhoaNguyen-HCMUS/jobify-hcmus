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
  CircleX,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Heart,
} from "lucide-react";
import ApplyJobModal from "../../components/applyJobModal";
import { useRouter } from "next/navigation";
import { Job } from "../../services/jobs";
import { useSaveJob } from "../../hooks/useSaveJob";    
import { getUserRole } from "../../utils/auth";

interface JobDetailProps {
  job?: Job;
  isHR?: boolean;
}


export default function JobDetail({ job: propJob, isHR }: JobDetailProps) {
  const [job, setJob] = useState<Job | null>(propJob || null);
  const [isSaved, setIsSaved] = useState(false);
  const { handleSaveJob, isSaving } = useSaveJob();
  const userRole = getUserRole();


  const handleSaveClick = async () => {
    if (!job) return;
    
    const newSavedState = await handleSaveJob(job.id, isSaved);
    if (newSavedState !== isSaved) {
      setIsSaved(newSavedState);
    }
  };
  useEffect(() => {
    if (propJob) {
      setJob(propJob);
    }
  }, [propJob]);

  const router = useRouter();

  const [title, setTitle] = useState(job?.title || "");
  const [deadline, setDeadline] = useState(job?.deadline || "");
  const [location, setLocation] = useState(job?.province || "");
  const [salary, setSalary] = useState(job?.salary_min || "");
  const [experience, setExperience] = useState(job?.experience_level || "");
  const [rank, setRank] = useState(job?.position || "");
  const [education, setEducation] = useState(job?.education_level || "");
  const [numberOfRecruits, setNumberOfRecruits] = useState(
    job?.number_of_openings?.toString() || ""
  );
  const [formOfWork, setFormOfWork] = useState(job?.job_type || "");
  const [relatedOccupations, setRelatedOccupations] = useState("");
  const [skill, setSkill] = useState(job?.skills || "");
  const [area, setArea] = useState("");
  const [workingTime, setWorkingTime] = useState(job?.working_hours || "");
  const [workPlace, setWorkPlace] = useState(job?.work_place || "");
  const [jobDescription, setJobDescription] = useState(
    job?.description || ""
  );
  const [applicantRequirements, setApplicantRequirements] = useState(
    job?.requirements || ""
  );
  const [benefit, setBenefit] = useState(job?.benefits || "");

  const isHrSafe = isHR ?? false;

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenNext, setIsOpenNext] = useState(false);
  const [selectedRelatedOccupations, setSelectedRelatedOccupations] = useState<
    string[]
  >([]);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const [openRelatedOccupation, setOpenRelatedOccupation] = useState(false);
  const [openArea, setOpenArea] = useState(false);
  const [openSkill, setOpenSkill] = useState(false);

  const handleSelect = (
    item: string,
    selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>,
    setInput: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (!selected.includes(item)) {
      setSelected([...selected, item]);
    }
    setInput("");
  };

  const handleRemove = (
    item: string,
    selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setSelected(selected.filter((i) => i !== item));
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

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
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4 px-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-background rounded-lg hover:bg-primary-80 transition-colors"
        >
          <ArrowLeft size={20} />
          Back
        </button>
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
                {!isHrSafe ? (
                  <ApplyJobModal />
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
                      isSaved 
                        ? 'bg-red-500 text-white hover:bg-red-600' 
                        : 'bg-accent text-background hover:bg-accent/90'
                    } ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <Heart 
                      size={20} 
                      className={isSaved ? 'fill-white' : ''}
                    />
                    {isSaved ? 'Saved' : 'Save'}
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
                src="/logo.png"
                alt="Company"
                className="border-1 rounded-xs w-16 h-16 object-contain"
              />
              <div className="text-primary ml-4">Company Name</div>
            </div>
            <div className="px-4 space-y-3">
              <div className="flex gap-10">
                <div className="flex gap-4">
                  <Users size={24} className="text-primary" />
                  <span className="text-primary font-semibold">Scale: </span>
                </div>
                <span className="text-primary-80">Medium</span>
              </div>
              <div className="flex gap-10">
                <div className="flex gap-2">
                  <BriefcaseBusiness size={24} className="text-primary" />
                  <span className="text-primary font-semibold">Field: </span>
                </div>
                <span className="text-primary-80">Technology</span>
              </div>
              <div className="flex gap-3">
                <div className="flex gap-2">
                  <MapPin size={24} className="text-primary" />
                  <span className="text-primary font-semibold">Location: </span>
                </div>
                <span className="text-primary-80">{job.province}, {job.ward}</span>
              </div>
            </div>
            <div className="flex space-x-1 text-accent font-semibold justify-center">
              <a href="/company" className="flex gap-2">
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
                  <h2 className="font-semibold text-accent">Apply now!</h2>
                  <p className="text-primary">Click the Apply button above to submit your application.</p>
                </div>
              </div>
              <div>
                {!isHrSafe ? (
                  <div className="m-4">
                    <ApplyJobModal />
                  </div>
                ) : (
                  <button >Do sth</button>
                )}
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {!isHrSafe ? (
        <div></div>
      ) : (
        <div className="flex flex-col gap-4 mx-6 my-4 font-semibold">
          <div className="flex gap-2 items-center">
            <span className="text-primary-80 ">Status:</span>
            <button className="bg-accent hover:bg-secondary text-neutral-light-20 px-6 py-2 rounded-full cursor-pointer">
              {job.status}
            </button>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => {
                setIsOpen(true);
                setIsOpenNext(false);
              }}
              className="bg-secondary-60 hover:bg-secondary text-background px-6 py-2 rounded-full cursor-pointer"
            >
              Edit
            </button>
            {isOpen && (
              <div
                onClick={() => {
                  if (!isOpenNext) setIsOpen(false);
                }}
                className="fixed inset-0 bg-primary-80 z-50 flex items-center justify-center"
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="w-3/5 max-h-[90vh] overflow-y-auto bg-neutral-light-40 rounded-2xl relative"
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between bg-primary rounded-t-2xl gap-4 pl-4 pr-4 py-2">
                      <span className="text-neutral-light-20 text-2xl font-bold">
                        Job post
                      </span>
                      <div className="px-4">
                        <CircleX
                          size={32}
                          onClick={() => setIsOpen(false)}
                          className="absolute right-3 text-secondary-40 cursor-pointer"
                        />
                      </div>
                    </div>
                    <div className="px-4 pb-4">
                      <div className="flex flex-col rounded-b-2xl gap-2">
                        <div className="flex flex-col">
                          <label
                            htmlFor="title"
                            className="block text-sm font-bold text-primary"
                          >
                            Title*:
                          </label>
                          <div className="relative">
                            <input
                              id="title"
                              type="text"
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                              placeholder="Enter name"
                              className="w-full border border-primary-80 pl-4 pr-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-1 focus:bg-white transition-all duration-300"
                              required
                            />
                          </div>
                        </div>
                        <div className="w-full flex flex-wrap gap-x-10 gap-y-2">
                          <div className="flex-1 flex flex-col gap-2">
                            <div className="flex flex-col">
                              <label
                                htmlFor="deadline"
                                className="block text-sm font-bold text-primary"
                              >
                                Deadline*:
                              </label>
                              <div className="relative">
                                <input
                                  id="deadline"
                                  type="date"
                                  value={deadline}
                                  onChange={(e) => setDeadline(e.target.value)}
                                  placeholder="dd/mm/yyyy"
                                  className="w-full border border-primary-80 pl-4 pr-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-1 focus:bg-white transition-all duration-300"
                                  required
                                />
                              </div>
                            </div>
                            <div className="flex flex-col">
                              <label
                                htmlFor="salary"
                                className="block text-sm font-bold text-primary"
                              >
                                Salary*:
                              </label>
                              <div className="relative">
                                <input
                                  id="salary"
                                  type="text"
                                  value={salary}
                                  onChange={(e) => setSalary(e.target.value)}
                                  placeholder="Enter salary"
                                  className="w-full border border-primary-80 pl-4 pr-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-1 focus:bg-white transition-all duration-300"
                                  required
                                />
                              </div>
                            </div>
                            <div className="flex flex-col">
                              <label
                                htmlFor="rank"
                                className="block text-sm font-bold text-primary"
                              >
                                Position*:
                              </label>
                              <div className="relative">
                                <input
                                  id="rank"
                                  type="text"
                                  value={rank}
                                  onChange={(e) => setRank(e.target.value)}
                                  placeholder="Enter position"
                                  className="w-full border border-primary-80 pl-4 pr-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-1 focus:bg-white transition-all duration-300"
                                  required
                                />
                              </div>
                            </div>
                            <div className="flex flex-col">
                              <label
                                htmlFor="numberOfRecruits"
                                className="block text-sm font-bold text-primary"
                              >
                                Number of openings*:
                              </label>
                              <div className="relative">
                                <input
                                  id="numberOfRecruits"
                                  type="text"
                                  value={numberOfRecruits}
                                  onChange={(e) =>
                                    setNumberOfRecruits(e.target.value)
                                  }
                                  placeholder="Enter number of openings"
                                  className="w-full border border-primary-80 pl-4 pr-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-1 focus:bg-white transition-all duration-300"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                          <div className="flex-1 flex flex-col gap-2">
                            <div className="flex flex-col">
                              <label
                                htmlFor="location"
                                className="block text-sm font-bold text-primary"
                              >
                                Location:
                              </label>
                              <div className="relative">
                                <input
                                  id="location"
                                  type="text"
                                  value={location}
                                  onChange={(e) => setLocation(e.target.value)}
                                  placeholder="Enter location"
                                  className="w-full border border-primary-80 pl-4 pr-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-1 focus:bg-white transition-all duration-300"
                                />
                              </div>
                            </div>
                            <div className="flex flex-col">
                              <label
                                htmlFor="experience"
                                className="block text-sm font-bold text-primary"
                              >
                                Experience:
                              </label>
                              <div className="relative">
                                <input
                                  id="experience"
                                  type="text"
                                  value={experience}
                                  onChange={(e) =>
                                    setExperience(e.target.value)
                                  }
                                  placeholder="Enter experience"
                                  className="w-full border border-primary-80 pl-4 pr-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-1 focus:bg-white transition-all duration-300"
                                />
                              </div>
                            </div>
                            <div className="flex flex-col">
                              <label
                                htmlFor="education"
                                className="block text-sm font-bold text-primary"
                              >
                                Education:
                              </label>
                              <div className="relative">
                                <input
                                  id="education"
                                  type="text"
                                  value={education}
                                  onChange={(e) => setEducation(e.target.value)}
                                  placeholder="Enter education"
                                  className="w-full border border-primary-80 pl-4 pr-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-1 focus:bg-white transition-all duration-300"
                                />
                              </div>
                            </div>
                            <div className="flex flex-col">
                              <label
                                htmlFor="formOfWork"
                                className="block text-sm font-bold text-primary"
                              >
                                Job type*:
                              </label>
                              <div className="relative">
                                <input
                                  id="formOfWork"
                                  type="text"
                                  value={formOfWork}
                                  onChange={(e) =>
                                    setFormOfWork(e.target.value)
                                  }
                                  placeholder="Enter job type"
                                  className="w-full border border-primary-80 pl-4 pr-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-1 focus:bg-white transition-all duration-300"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="workPlace"
                            className="block text-sm font-bold text-primary"
                          >
                            Work Place:
                          </label>
                          <div className="relative">
                            <input
                              id="workPlace"
                              type="text"
                              value={workPlace}
                              onChange={(e) => setWorkPlace(e.target.value)}
                              placeholder="Enter work place"
                              className="w-full border border-primary-80 px-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-1 focus:bg-white transition-all duration-300"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="jobDescription"
                            className="block text-sm font-bold text-primary"
                          >
                            Job Description:
                          </label>
                          <div className="relative">
                            <textarea
                              id="jobDescription"
                              value={jobDescription}
                              onChange={(e) =>
                                setJobDescription(e.target.value)
                              }
                              className="w-full border border-primary-80 h-16 px-4 py-2 text-primary-80 focus:outline-none resize-none bg-neutral-light-20 rounded-xl focus:ring-1 focus:bg-white transition-all duration-300"
                              placeholder="Enter description"
                            ></textarea>
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="applicantRequirements"
                            className="block text-sm font-bold text-primary"
                          >
                            Applicant Requirements:
                          </label>
                          <div className="relative">
                            <textarea
                              id="applicantRequirements"
                              value={applicantRequirements}
                              onChange={(e) =>
                                setApplicantRequirements(e.target.value)
                              }
                              className="w-full border border-primary-80 h-16 px-4 py-2 text-primary-80 focus:outline-none resize-none bg-neutral-light-20 rounded-xl focus:ring-1 focus:bg-white transition-all duration-300"
                              placeholder="Enter applicant requirements"
                            ></textarea>
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="benefit"
                            className="block text-sm font-bold text-primary"
                          >
                            Benefits:
                          </label>
                          <div className="relative">
                            <textarea
                              id="benefit"
                              value={benefit}
                              onChange={(e) => setBenefit(e.target.value)}
                              className="w-full border border-primary-80 h-16 px-4 py-2 text-primary-80 focus:outline-none resize-none bg-neutral-light-20 rounded-xl focus:ring-1 focus:bg-white transition-all duration-300"
                              placeholder="Enter benefits"
                            ></textarea>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <button
                            onClick={() => setIsOpen(false)}
                            className="bg-secondary-60 text-neutral-light-20 hover:bg-secondary px-6 py-2 rounded-full font-semibold cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => setIsOpenNext(true)}
                            className="bg-secondary text-neutral-light-20 hover:bg-secondary-60 px-6 py-2 rounded-full font-semibold cursor-pointer"
                          >
                            Save
                          </button>
                          {isOpenNext && (
                            <div className="fixed inset-0 bg-primary/60 z-30 flex items-center justify-center">
                              <div
                                onClick={(e) => e.stopPropagation()}
                                className="w-full max-w-2/5 flex flex-col items-center text-center font-semibold bg-neutral-light-40 rounded-2xl p-6 gap-4"
                              >
                                <span className="text-primary">
                                  Your job post has been submitted successfully.
                                  It will be published once approved.
                                </span>
                                <button
                                  onClick={() => {
                                    setIsOpenNext(false);
                                    setIsOpen(false);
                                  }}
                                  className="bg-accent hover:bg-secondary text-neutral-light-20 rounded-full px-6 py-2 cursor-pointer"
                                >
                                  Agree
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={() => router.push("/recruiter/applications")}
              className="bg-secondary-60 hover:bg-secondary text-background px-6 py-2 rounded-full cursor-pointer"
            >
              View applications
            </button>
            <button className="bg-[#E91919] hover:bg-red-800 text-background px-6 py-2 rounded-full cursor-pointer">
              Close
            </button>
            <button className="bg-[#E91919] hover:bg-red-800 text-background px-6 py-2 rounded-full cursor-pointer">
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
