"use client";
import { useState, useEffect } from "react";
import JobCard from "../../../components/job/jobCard";
import { CircleX, Plus, ChevronDown, ChevronUp, X } from "lucide-react";
import usePagination from "../../../hooks/usePagination";
import Pagination from "../../../components/pagination";
import KeyWord from "@web/components/keyWord";

const jobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "Google",
    salary: "2000 - 3000$",
    province: "Ho Chi Minh",
    image: "/google-logo.png",
    name: "Google Logo",
  },
  {
    id: 2,
    title: "Backend Developer",
    company: "Microsoft",
    salary: "1800 - 2800$",
    province: "Ha Noi",
    image: "/microsoft-logo.png",
    name: "Microsoft Logo",
  },
  {
    id: 3,
    title: "Senior Frontend Developer",
    company: "Google",
    salary: "2000 - 3000$",
    province: "Ho Chi Minh",
    image: "/google-logo.png",
    name: "Google Logo",
  },
  {
    id: 4,
    title: "Senior Frontend Developer",
    company: "Google",
    salary: "2000 - 3000$",
    province: "Ho Chi Minh",
    image: "/google-logo.png",
    name: "Google Logo",
  },
  {
    id: 5,
    title: "Senior Frontend Developer",
    company: "Google",
    salary: "2000 - 3000$",
    province: "Ho Chi Minh",
    image: "/google-logo.png",
    name: "Google Logo",
  },
  {
    id: 6,
    title: "Senior Frontend Developer",
    company: "Google",
    salary: "2000 - 3000$",
    province: "Ho Chi Minh",
    image: "/google-logo.png",
    name: "Google Logo",
  },
  {
    id: 7,
    title: "Senior Frontend Developer",
    company: "Google",
    salary: "2000 - 3000$",
    province: "Ho Chi Minh",
    image: "/google-logo.png",
    name: "Google Logo",
  },
  {
    id: 8,
    title: "Senior Frontend Developer",
    company: "Google",
    salary: "2000 - 3000$",
    province: "Ho Chi Minh",
    image: "/google-logo.png",
    name: "Google Logo",
  },
  {
    id: 9,
    title: "Senior Frontend Developer",
    company: "Google",
    salary: "2000 - 3000$",
    province: "Ho Chi Minh",
    image: "/google-logo.png",
    name: "Google Logo",
  },
  {
    id: 10,
    title: "Senior Frontend Developer",
    company: "Google",
    salary: "2000 - 3000$",
    province: "Ho Chi Minh",
    image: "/google-logo.png",
    name: "Google Logo",
  },
  {
    id: 11,
    title: "Senior Frontend Developer",
    company: "Google",
    salary: "2000 - 3000$",
    province: "Ho Chi Minh",
    image: "/google-logo.png",
    name: "Google Logo",
  },
  {
    id: 12,
    title: "Full Stack Developer",
    company: "Apple",
    salary: "2500 - 3500$",
    province: "Da Nang",
    image: "/apple-logo.png",
    name: "Apple Logo",
  },
  {
    id: 13,
    title: "DevOps Engineer",
    company: "Amazon",
    salary: "2200 - 3200$",
    province: "Ho Chi Minh",
    image: "/amazon-logo.png",
    name: "Amazon Logo",
  },
  {
    id: 14,
    title: "UI/UX Designer",
    company: "Meta",
    salary: "1900 - 2900$",
    province: "Ha Noi",
    image: "/meta-logo.png",
    name: "Meta Logo",
  },
  {
    id: 15,
    title: "Mobile Developer",
    company: "Netflix",
    salary: "2100 - 3100$",
    province: "Ho Chi Minh",
    image: "/netflix-logo.png",
    name: "Netflix Logo",
  },
];

const related = ["Sales", "Construction", "Python", "Design", "Marketing"];
const areaList = ["Sales", "Construction", "Python", "Design", "Marketing"];
const skills = ["Sales", "Construction", "Python", "Design", "Marketing"];

export default function RecruiterJobsSavedPage() {
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [experience, setExperience] = useState("");
  const [rank, setRank] = useState("");
  const [education, setEducation] = useState("");
  const [numberOfRecruits, setNumberOfRecruits] = useState("");
  const [formOfWork, setFormOfWork] = useState("");
  const [relatedOccupations, setRelatedOccupations] = useState("");
  const [skill, setSkill] = useState("");
  const [area, setArea] = useState("");
  const [workingTime, setWorkingTime] = useState("");
  const [workPlace, setWorkPlace] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [applicantRequirements, setApplicantRequirements] = useState("");
  const [benefit, setBenefit] = useState("");

  const { page, maxPage, current, next, prev } = usePagination(jobs, 8);

  const [isOpen, setIsOpen] = useState(false);

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

  // RemoveItem
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

  return (
    <div className="w-full h-full bg-neutral-light-60">
      <div className="flex flex-col px-20 py-10 gap-6">
        <div className="flex justify-between">
          <button
            onClick={() => setIsOpen(true)}
            className="border-2 border-secondary text-secondary font-semibold rounded-full flex items-center px-4 hover:bg-secondary hover:text-accent-20 transition cursor-pointer"
          >
            <Plus size={24} />
            <span>Post new job</span>
          </button>
          {isOpen && (
            <div
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-gray-700 z-50 flex items-center justify-center"
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
                              Ranks*:
                            </label>
                            <div className="relative">
                              <input
                                id="rank"
                                type="text"
                                value={rank}
                                onChange={(e) => setRank(e.target.value)}
                                placeholder="Enter ranks"
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
                                onChange={(e) =>
                                  setNumberOfRecruits(e.target.value)
                                }
                                placeholder="Enter number of recruits"
                                className="w-full border border-primary-80 pl-4 pr-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-1 focus:bg-white transition-all duration-300"
                                required
                              />
                            </div>
                          </div>
                          <div className="flex flex-col w-full max-w-2xl">
                            <label className="mb-1 text-sm font-bold text-primary">
                              Related Occupation:
                            </label>
                            <div className="relative w-full border border-primary-80 bg-neutral-light-20 rounded-xl p-2">
                              {/* Selected */}
                              <div className="flex flex-wrap gap-2 mb-2">
                                {selectedRelatedOccupations.map(
                                  (item, index) => (
                                    <span
                                      key={index}
                                      className="px-4 py-1 bg-neutral-medium-60 text-secondary font-semibold rounded-full text-sm flex items-center gap-2"
                                    >
                                      {item}
                                      <button
                                        onClick={() =>
                                          handleRemove(
                                            item,
                                            selectedRelatedOccupations,
                                            setSelectedRelatedOccupations
                                          )
                                        }
                                      >
                                        <X size={18} />
                                      </button>
                                    </span>
                                  )
                                )}
                              </div>
                              {/* Input */}
                              <div className="relative">
                                <input
                                  type="text"
                                  value={relatedOccupations}
                                  onChange={(e) =>
                                    setRelatedOccupations(e.target.value)
                                  }
                                  placeholder="Add related occupation"
                                  className="w-full pl-2 pb-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none"
                                  onFocus={() => setOpenRelatedOccupation(true)}
                                />
                                <button
                                  type="button"
                                  onClick={() =>
                                    setOpenRelatedOccupation(
                                      !openRelatedOccupation
                                    )
                                  }
                                  className="absolute right-3 top-1/2 -translate-y-1/2 text-primary"
                                >
                                  {openRelatedOccupation ? (
                                    <ChevronUp size={20} />
                                  ) : (
                                    <ChevronDown size={20} />
                                  )}
                                </button>
                              </div>
                              {/* Dropdown */}
                              {openRelatedOccupation && (
                                <div className="absolute left-0 top-full mt-2 w-full border border-primary-80 rounded-xl bg-neutral-light-20 shadow-lg p-2 z-10 max-h-40 overflow-y-auto">
                                  <div className="flex flex-wrap gap-2">
                                    {related
                                      .filter((item) =>
                                        item
                                          .toLowerCase()
                                          .includes(
                                            relatedOccupations.toLowerCase()
                                          )
                                      )
                                      .map((item, index) => (
                                        <span
                                          key={index}
                                          onClick={() =>
                                            handleSelect(
                                              item,
                                              selectedRelatedOccupations,
                                              setSelectedRelatedOccupations,
                                              setRelatedOccupations
                                            )
                                          }
                                          className="px-4 py-1 bg-neutral-medium-60 text-secondary font-semibold rounded-full text-sm cursor-pointer hover:bg-neutral-medium"
                                        >
                                          {item}
                                        </span>
                                      ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col w-full max-w-2xl">
                            <label className="mb-1 text-sm font-bold text-primary">
                              Area:
                            </label>
                            <div className="relative w-full border border-primary-80 bg-neutral-light-20 rounded-xl p-2">
                              {/* Selected */}
                              <div className="flex flex-wrap gap-2 mb-2">
                                {selectedAreas.map((item, index) => (
                                  <span
                                    key={index}
                                    className="px-4 py-1 bg-neutral-medium-60 text-secondary font-semibold rounded-full text-sm flex items-center gap-2"
                                  >
                                    {item}
                                    <button
                                      onClick={() =>
                                        handleRemove(
                                          item,
                                          selectedAreas,
                                          setSelectedAreas
                                        )
                                      }
                                    >
                                      <X size={18} />
                                    </button>
                                  </span>
                                ))}
                              </div>
                              {/* Input */}
                              <div className="relative">
                                <input
                                  type="text"
                                  value={area}
                                  onChange={(e) => setArea(e.target.value)}
                                  placeholder="Add area"
                                  className="w-full pl-2 pb-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none"
                                  onFocus={() => setOpenArea(true)}
                                />
                                <button
                                  type="button"
                                  onClick={() => setOpenArea(!openArea)}
                                  className="absolute right-3 top-1/2 -translate-y-1/2 text-primary"
                                >
                                  {openArea ? (
                                    <ChevronUp size={20} />
                                  ) : (
                                    <ChevronDown size={20} />
                                  )}
                                </button>
                              </div>
                              {/* Dropdown */}
                              {openArea && (
                                <div className="absolute left-0 top-full mt-2 w-full border border-primary-80 rounded-xl bg-neutral-light-20 shadow-lg p-2 z-10 max-h-40 overflow-y-auto">
                                  <div className="flex flex-wrap gap-2">
                                    {areaList
                                      .filter((item) =>
                                        item
                                          .toLowerCase()
                                          .includes(area.toLowerCase())
                                      )
                                      .map((item, index) => (
                                        <span
                                          key={index}
                                          onClick={() =>
                                            handleSelect(
                                              item,
                                              selectedAreas,
                                              setSelectedAreas,
                                              setArea
                                            )
                                          }
                                          className="px-4 py-1 bg-neutral-medium-60 text-secondary font-semibold rounded-full text-sm cursor-pointer hover:bg-neutral-medium"
                                        >
                                          {item}
                                        </span>
                                      ))}
                                  </div>
                                </div>
                              )}
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
                                onChange={(e) => setExperience(e.target.value)}
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
                              Form of work*:
                            </label>
                            <div className="relative">
                              <input
                                id="formOfWork"
                                type="text"
                                value={formOfWork}
                                onChange={(e) => setFormOfWork(e.target.value)}
                                placeholder="Enter form of work"
                                className="w-full border border-primary-80 pl-4 pr-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-1 focus:bg-white transition-all duration-300"
                                required
                              />
                            </div>
                          </div>
                          <div className="flex flex-col w-full max-w-2xl">
                            <label className="mb-1 text-sm font-bold text-primary">
                              Skills:
                            </label>
                            <div className="relative w-full border border-primary-80 bg-neutral-light-20 rounded-xl p-2">
                              {/* Selected */}
                              <div className="flex flex-wrap gap-2 mb-2">
                                {selectedSkills.map((item, index) => (
                                  <span
                                    key={index}
                                    className="px-4 py-1 bg-neutral-medium-60 text-secondary font-semibold rounded-full text-sm flex items-center gap-2"
                                  >
                                    {item}
                                    <button
                                      onClick={() =>
                                        handleRemove(
                                          item,
                                          selectedSkills,
                                          setSelectedSkills
                                        )
                                      }
                                    >
                                      <X size={18} />
                                    </button>
                                  </span>
                                ))}
                              </div>
                              {/* Input */}
                              <div className="relative">
                                <input
                                  type="text"
                                  value={skill}
                                  onChange={(e) => setSkill(e.target.value)}
                                  placeholder="Add skills"
                                  className="w-full pl-2 pb-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none"
                                  onFocus={() => setOpenSkill(true)}
                                />
                                <button
                                  type="button"
                                  onClick={() => setOpenSkill(!openSkill)}
                                  className="absolute right-3 top-1/2 -translate-y-1/2 text-primary"
                                >
                                  {openSkill ? (
                                    <ChevronUp size={20} />
                                  ) : (
                                    <ChevronDown size={20} />
                                  )}
                                </button>
                              </div>
                              {/* Dropdown */}
                              {openSkill && (
                                <div className="absolute left-0 top-full mt-2 w-full border border-primary-80 rounded-xl bg-neutral-light-20 shadow-lg p-2 z-10 max-h-40 overflow-y-auto">
                                  <div className="flex flex-wrap gap-2">
                                    {skills
                                      .filter((item) =>
                                        item
                                          .toLowerCase()
                                          .includes(skill.toLowerCase())
                                      )
                                      .map((item, index) => (
                                        <span
                                          key={index}
                                          onClick={() =>
                                            handleSelect(
                                              item,
                                              selectedSkills,
                                              setSelectedSkills,
                                              setSkill
                                            )
                                          }
                                          className="px-4 py-1 bg-neutral-medium-60 text-secondary font-semibold rounded-full text-sm cursor-pointer hover:bg-neutral-medium"
                                        >
                                          {item}
                                        </span>
                                      ))}
                                  </div>
                                </div>
                              )}
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
                                placeholder="Enter working time"
                                className="w-full border border-primary-80 pl-4 pr-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-1 focus:bg-white transition-all duration-300"
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
                        <button className="bg-secondary-60 text-neutral-light-20 hover:bg-secondary px-6 py-2 rounded-full font-semibold cursor-pointer">
                          Draft
                        </button>
                        <button className="bg-secondary text-neutral-light-20 hover:bg-secondary-60 px-6 py-2 rounded-full font-semibold cursor-pointer">
                          Post
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <KeyWord />
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-4">
          {current.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
        <Pagination page={page} maxPage={maxPage} onNext={next} onPrev={prev} />
      </div>
    </div>
  );
}
