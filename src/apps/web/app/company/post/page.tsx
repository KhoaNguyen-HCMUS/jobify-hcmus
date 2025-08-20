"use client";
import { useState, useEffect } from "react";

import { postNewJob } from "../../../services/jobs";
import { getToken } from "../../../utils/auth";
import ProtectedRoute from "../../../components/ProtectedRoute";
import {
  getProvinces,
  getDistrictsByProvince,
  Province,
  District,
} from "../../../services/location";
import {
  EXPERIENCE_LEVELS,
  EDUCATION_LEVELS,
  JOB_TYPES,
} from "../../../constants/jobConstants";
import {
  getAllIndustries,
  Industry,
  getIndustriesByCategory,
  IndustryCategory,
} from "../../../services/industries";
import {
  getCompanyProfile,
  CompanyProfile,
} from "../../../services/companyProfile";
import { toast } from "react-toastify";
import GoBack from "../../../components/goBack";
import { 
  getTomorrowLocalTimeISO, 
  localToUTC, 
  isLocalDateTimeInFuture
} from "../../../utils/timezoneUtils";
import { parseAddressToLocation } from "../../../utils/addressUtils";
import { useRouter } from "next/navigation";
import ScheduleModal from "../../../components/ScheduleModal";

interface JobPostProps {
  isOpen: boolean;
  onClose: () => void;
}

function RecruiterPostJobContent({ isOpen, onClose }: JobPostProps) {
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [location, setLocation] = useState("");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [isSalaryNegotiable, setIsSalaryNegotiable] = useState(false);
  const [experience, setExperience] = useState("");
  const [positions, setpositions] = useState("");
  const [education, setEducation] = useState("");
  const [numberOfRecruits, setNumberOfRecruits] = useState("");
  const [formOfWork, setFormOfWork] = useState("");
  const [skill, setSkill] = useState("");
  const [workingTime, setWorkingTime] = useState("");
  const [workPlace, setWorkPlace] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [applicantRequirements, setApplicantRequirements] = useState("");
  const [benefit, setBenefit] = useState("");

  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const [industries, setIndustries] = useState<Industry[]>([]);
  const [industryCategories, setIndustryCategories] = useState<
    IndustryCategory[]
  >([]);
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedSubIndustry, setSelectedSubIndustry] = useState("");

  const [companyProfile, setCompanyProfile] = useState<CompanyProfile | null>(
    null
  );

  const [isLoading, setIsLoading] = useState(false);
  const [scheduledAt, setScheduledAt] = useState("");
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const loadProvinces = async () => {
      const response = await getProvinces();
      if (response.success && response.data) {
        setProvinces(response.data);
      }
    };
    loadProvinces();
  }, []);

  useEffect(() => {
    const loadDistricts = async () => {
      if (selectedProvince) {
        const province = provinces.find((p) => p.name === selectedProvince);
        if (province) {
          const response = await getDistrictsByProvince(province.code);
          if (response.success && response.data) {
            setDistricts(response.data);
          }
        }
      } else {
        setDistricts([]);
      }
      setSelectedDistrict("");
    };
    loadDistricts();
  }, [selectedProvince, provinces]);

  useEffect(() => {
    const loadIndustries = async () => {
      const response = await getAllIndustries();
      if (response.success && response.data) {
        setIndustries(response.data);
        const categories = getIndustriesByCategory(response.data);
        setIndustryCategories(categories);
      }
    };
    loadIndustries();
  }, []);

  useEffect(() => {
    const loadCompanyProfile = async () => {
      const response = await getCompanyProfile();
      if (response.success && response.data) {
        setCompanyProfile(response.data.companyProfiles);
      }
    };
    if (isOpen) {
      loadCompanyProfile();
    }
  }, [isOpen]);

  useEffect(() => {
    if (companyProfile) {
      if (companyProfile.address && !workPlace) {
        setWorkPlace(companyProfile.address);
      }

      // Auto-fill province and district from company address
      if (companyProfile.address && provinces.length > 0) {
        const location = parseAddressToLocation(companyProfile.address, provinces, districts);
        if (location) {
          if (!selectedProvince) {
            setSelectedProvince(location.province);
          }
          if (!selectedDistrict && location.district) {
            setSelectedDistrict(location.district);
          }
        }
      }
    }
  }, [companyProfile, workPlace, provinces, districts, selectedProvince, selectedDistrict]);

  // Set default working time only once when component mounts
  useEffect(() => {
    if (companyProfile && !workingTime) {
      setWorkingTime("Monday - Friday, 8:00 AM - 5:00 PM");
    }
  }, [companyProfile]);

  useEffect(() => {
    setSelectedSubIndustry("");
  }, [selectedIndustry]);

  // Auto-fill district when districts are loaded and province is already selected
  useEffect(() => {
    if (companyProfile?.address && selectedProvince && districts.length > 0) {
      const location = parseAddressToLocation(companyProfile.address, provinces, districts);
      if (location && location.province === selectedProvince && !selectedDistrict && location.district) {
        setSelectedDistrict(location.district);
      }
    }
  }, [districts, selectedProvince, companyProfile, provinces, selectedDistrict]);

  const handleScheduleClick = () => {
    setShowScheduleModal(true);
    // Set default time to tomorrow at 9 AM in user's local timezone
    setScheduledAt(getTomorrowLocalTimeISO(9, 0));
  };

  const handleSubmit = async (status: "draft" | "active" | "schedule") => {
    if (
      !title ||
      !deadline ||
      !salaryMin ||
      !salaryMax ||
      !positions ||
      !numberOfRecruits ||
      !formOfWork ||
      !selectedProvince ||
      !selectedDistrict ||
      !experience ||
      !education ||
      !selectedIndustry
    ) {
      toast.error("Please fill in all required fields!");
      return;
    }

    if (status === "schedule" && !scheduledAt) {
      toast.error("Please select schedule time!");
      return;
    }

    if (status === "schedule" && scheduledAt) {
      if (!isLocalDateTimeInFuture(scheduledAt)) {
        toast.error("Schedule time must be in the future!");
        return;
      }
    }

    if (
      parseInt(salaryMin.replace(/\D/g, "")) >
      parseInt(salaryMax.replace(/\D/g, ""))
    ) {
      toast.error("Salary Min cannot be greater than Salary Max!");
      return;
    }

    setIsLoading(true);
    try {
      const token = getToken();
      if (!token) {
        toast.error("Please login again!");
        return;
      }

      const jobData = {
        title: title,
        province: selectedProvince || "Ho Chi Minh",
        ward: selectedDistrict || "District 1",
        work_place:
          workPlace || selectedDistrict || selectedProvince || "Ho Chi Minh",
        salary_min: parseInt(salaryMin.replace(/\D/g, "")) || 0,
        salary_max: parseInt(salaryMax.replace(/\D/g, "")) || 0,
        is_salary_negotiable: isSalaryNegotiable,
        experience_level: experience,
        position: positions,
        education_level: education,
        job_type: formOfWork,
        number_of_openings: parseInt(numberOfRecruits) || 1,
        deadline: deadline,
        working_hours: workingTime || "8:00 - 17:00",
        description: jobDescription,
        requirements: applicantRequirements,
        responsibilities: jobDescription,
        benefits: benefit,
        industry_id: selectedSubIndustry || selectedIndustry,
        currency: "VND",
        cost_coin: 10,
        status: status,
        skills: skill,
        ...(status === "schedule" && scheduledAt && { scheduled_at: localToUTC(scheduledAt) }),
      };

      const response = await postNewJob(jobData, token);

      if (response.success) {
        if (status === "draft") {
          toast.success("Job saved as draft successfully!");
        }
        if (status === "active") {
          toast.success("Job posted successfully!");
        }
        if (status === "schedule") {
          toast.success("Successfully scheduled!");
        }
        onClose();
        setTitle("");
        setDeadline("");
        setSalaryMin("");
        setSalaryMax("");
        setIsSalaryNegotiable(false);
        setExperience("");
        setpositions("");
        setEducation("");
        setNumberOfRecruits("");
        setFormOfWork("");
        setSkill("");
        setWorkingTime("");
        setWorkPlace("");
        setJobDescription("");
        setApplicantRequirements("");
        setBenefit("");
        setSelectedProvince("");
        setSelectedDistrict("");
        setSelectedIndustry("");
        setSelectedSubIndustry("");
        setScheduledAt("");
        setShowScheduleModal(false);
        setCompanyProfile(null);
      } else {
        toast.error("Failed to post job: " + response.message);
      }
    } catch (error) {
      toast.error("Error posting job, please try again later.");
      console.error("Error posting job:", error);
    } finally {
      setIsLoading(false);
      router.push("/company/jobs");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="flex flex-col bg-neutral-light-60 gap-4 pb-4">
      <GoBack />
      <div className="px-10">
        <span className="flex justify-between bg-secondary text-neutral-light-20 text-2xl font-bold rounded-t-2xl gap-4 pl-4 pr-4 py-2">
          Job Post
        </span>
        <div className="bg-highlight-20 p-4 rounded-b-2xl border border-primary-40">
          <div className="flex flex-col rounded-b-2xl gap-2">
            {companyProfile && (
              <div className="bg-primary-20 p-3 rounded-xl mb-2">
                <p className="text-primary font-semibold text-sm">
                  Posting job for:{" "}
                  <span className="text-secondary">
                    {companyProfile.company_name}
                  </span>
                </p>
                {companyProfile.address && (
                  <p className="text-primary-60 text-xs mt-1">
                    Address: {companyProfile.address}
                  </p>
                )}
              </div>
            )}
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
                  placeholder="Enter title"
                  className="w-full border border-primary-80 pl-4 pr-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-1 focus:bg-white transition-all duration-300"
                  required
                />
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
            <div className="w-full flex flex-wrap gap-x-10 gap-y-2">
              <div className="flex-1 flex flex-col gap-2">
                <div className="flex flex-col">
                  <label
                    htmlFor="province"
                    className="block text-sm font-bold text-primary"
                  >
                    Province*:
                  </label>
                  <div className="relative">
                    <select
                      id="province"
                      value={selectedProvince}
                      onChange={(e) => setSelectedProvince(e.target.value)}
                      className="cursor-pointer w-full border border-primary-80 pl-4 pr-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-1 focus:bg-white transition-all duration-300"
                      required
                    >
                      <option value="">Select province</option>
                      {provinces.map((province) => (
                        <option key={province.code} value={province.name}>
                          {province.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="experience"
                    className="block text-sm font-bold text-primary"
                  >
                    Experience Level*:
                  </label>
                  <div className="relative">
                    <select
                      id="experience"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      className="cursor-pointer w-full border border-primary-80 pl-4 pr-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-1 focus:bg-white transition-all duration-300"
                      required
                    >
                      <option value="">Select experience level</option>
                      {EXPERIENCE_LEVELS.map((level) => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="industry"
                    className="block text-sm font-bold text-primary"
                  >
                    Industry*:
                  </label>
                  <div className="relative">
                    <select
                      id="industry"
                      value={selectedIndustry}
                      onChange={(e) => setSelectedIndustry(e.target.value)}
                      className="cursor-pointer w-full border border-primary-80 pl-4 pr-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-1 focus:bg-white transition-all duration-300"
                      required
                    >
                      <option value="">Select industry category</option>
                      {industryCategories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

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
                      className=" cursor-pointer w-full border border-primary-80 pl-4 pr-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-1 focus:bg-white transition-all duration-300"
                      required
                    />
                  </div>
                </div>



                <div className="flex flex-col">
                  <label
                    htmlFor="positions"
                    className="block text-sm font-bold text-primary"
                  >
                    Position*:
                  </label>
                  <div className="relative">
                    <input
                      id="positions"
                      type="text"
                      value={positions}
                      onChange={(e) => setpositions(e.target.value)}
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
                    Number of recruits*:
                  </label>
                  <div className="relative">
                    <input
                      id="numberOfRecruits"
                      type="text"
                      value={numberOfRecruits}
                      onChange={(e) => setNumberOfRecruits(e.target.value)}
                      placeholder="Enter number of recruits"
                      className="w-full border border-primary-80 pl-4 pr-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-1 focus:bg-white transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="salaryMin"
                    className="block text-sm font-bold text-primary"
                  >
                    Salary Min*:
                  </label>
                  <div className="relative">
                    <input
                      id="salaryMin"
                      type="text"
                      value={salaryMin}
                      onChange={(e) => setSalaryMin(e.target.value)}
                      placeholder="Enter salary min"
                      className="w-full border border-primary-80 pl-4 pr-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-1 focus:bg-white transition-all duration-300"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <div className="flex flex-col">
                  <label
                    htmlFor="district"
                    className="block text-sm font-bold text-primary"
                  >
                    District*:
                  </label>
                  <div className="relative">
                    <select
                      id="district"
                      value={selectedDistrict}
                      onChange={(e) => setSelectedDistrict(e.target.value)}
                      className="cursor-pointer w-full border border-primary-80 pl-4 pr-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-1 focus:bg-white transition-all duration-300"
                      required
                      disabled={!selectedProvince}
                    >
                      <option value="">Select district</option>
                      {districts.map((district) => (
                        <option key={district.code} value={district.name}>
                          {district.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="education"
                    className="block text-sm font-bold text-primary"
                  >
                    Education Level*:
                  </label>
                  <div className="relative">
                    <select
                      id="education"
                      value={education}
                      onChange={(e) => setEducation(e.target.value)}
                      className="cursor-pointer w-full border border-primary-80 pl-4 pr-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-1 focus:bg-white transition-all duration-300"
                      required
                    >
                      <option value="">Select education level</option>
                      {EDUCATION_LEVELS.map((level) => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="subIndustry"
                    className="block text-sm font-bold text-primary"
                  >
                    Specialization (Optional):
                  </label>
                  <div className="relative">
                    <select
                      id="subIndustry"
                      value={selectedSubIndustry}
                      onChange={(e) => setSelectedSubIndustry(e.target.value)}
                      className="cursor-pointer w-full border border-primary-80 pl-4 pr-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-1 focus:bg-white transition-all duration-300"
                      disabled={!selectedIndustry}
                    >
                      <option value="">Select specialization (optional)</option>
                      {selectedIndustry && industryCategories
                        .find(cat => cat.id === selectedIndustry)
                        ?.children.map((subIndustry) => (
                          <option key={subIndustry.id} value={subIndustry.id}>
                            {subIndustry.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="formOfWork"
                    className="block text-sm font-bold text-primary"
                  >
                    Job Type*:
                  </label>
                  <div className="relative">
                    <select
                      id="formOfWork"
                      value={formOfWork}
                      onChange={(e) => setFormOfWork(e.target.value)}
                      className="cursor-pointer w-full border border-primary-80 pl-4 pr-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-1 focus:bg-white transition-all duration-300"
                      required
                    >
                      <option value="">Select job type</option>
                      {JOB_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="skills"
                    className="block text-sm font-bold text-primary"
                  >
                    Skills (separate by comma):
                  </label>
                  <div className="relative">
                    <input
                      id="skills"
                      type="text"
                      value={skill}
                      onChange={(e) => setSkill(e.target.value)}
                      placeholder="Enter skills (e.g., JavaScript, Communication, Teamwork)"
                      className="w-full border border-primary-80 pl-4 pr-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-1 focus:bg-white transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="workingTime"
                    className="block text-sm font-bold text-primary"
                  >
                    Working time:
                  </label>
                  <div className="relative">
                    <input
                      id="workingTime"
                      type="text"
                      value={workingTime}
                      onChange={(e) => setWorkingTime(e.target.value)}
                      placeholder="Enter working time (e.g., Mon - Fri, 9:00 - 18:00)"
                      className="w-full border border-primary-80 pl-4 pr-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-1 focus:bg-white transition-all duration-300"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="salaryMax"
                    className="block text-sm font-bold text-primary"
                  >
                    Salary Max*:
                  </label>
                  <div className="relative">
                    <input
                      id="salaryMax"
                      type="text"
                      value={salaryMax}
                      onChange={(e) => setSalaryMax(e.target.value)}
                      placeholder="Enter salary max"
                      className="w-full border border-primary-80 pl-4 pr-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-1 focus:bg-white transition-all duration-300"
                      required
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    id="isSalaryNegotiable"
                    type="checkbox"
                    checked={isSalaryNegotiable}
                    onChange={(e) => setIsSalaryNegotiable(e.target.checked)}
                    className="cursor-pointer w-4 h-4 text-secondary bg-neutral-light-20 border-primary-80 rounded focus:ring-secondary focus:ring-2"
                  />
                  <label
                    htmlFor="isSalaryNegotiable"
                    className="text-sm font-medium text-primary cursor-pointer"
                  >
                    Salary is negotiable
                  </label>
                </div>
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
                  onChange={(e) => setJobDescription(e.target.value)}
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
                  onChange={(e) => setApplicantRequirements(e.target.value)}
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
                Benefit:
              </label>
              <div className="relative">
                <textarea
                  id="benefit"
                  value={benefit}
                  onChange={(e) => setBenefit(e.target.value)}
                  className="w-full border border-primary-80 h-16 px-4 py-2 text-primary-80 focus:outline-none resize-none bg-neutral-light-20 rounded-xl focus:ring-1 focus:bg-white transition-all duration-300"
                  placeholder="Enter benefit"
                ></textarea>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => handleSubmit("draft")}
                disabled={isLoading}
                className="bg-secondary-60 text-neutral-light-20 hover:bg-secondary px-6 py-2 rounded-full font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Đang lưu..." : "Draft"}
              </button>
              <button
                onClick={() => handleSubmit("active")}
                disabled={isLoading}
                className="bg-secondary text-neutral-light-20 hover:bg-secondary-60 px-6 py-2 rounded-full font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Đang đăng..." : "Post"}
              </button>
              <button
                onClick={handleScheduleClick}
                disabled={isLoading}
                className="bg-primary-60 text-neutral-light-20 hover:bg-secondary-80 px-6 py-2 rounded-full font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Schedule
              </button>
                         </div>
           </div>
         </div>
       </div>

               {/* Schedule Modal */}
        <ScheduleModal
          isOpen={showScheduleModal}
          onClose={() => {
            setShowScheduleModal(false);
            setScheduledAt("");
          }}
          scheduledAt={scheduledAt}
          onScheduledAtChange={setScheduledAt}
          onSchedule={() => handleSubmit("schedule")}
          isLoading={isLoading}
          title="Schedule Job Post"
        />
     </div>
   );
 }

export default function RecruiterPostJobPage() {
  const [isOpen, setIsOpen] = useState(true);

  const onClose = () => setIsOpen(false);
  return (
    <ProtectedRoute allowedRoles={["company"]}>
      <RecruiterPostJobContent isOpen={isOpen} onClose={onClose} />
    </ProtectedRoute>
  );
}
