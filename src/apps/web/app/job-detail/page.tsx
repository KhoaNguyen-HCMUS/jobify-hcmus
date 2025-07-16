"use client";
import { useState, useEffect } from "react";
import GoBack from "../../components/goBack";
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
  X,
} from "lucide-react";
import ApplyJobModal from "../../components/applyJobModal";

interface JobDetailProps {
  detail: {
    title: string;
    salary: string;
    location: string;
    experience: string;
    deadline: string;
    current: string;
    max: string;
    image: string;
    companyName: string;
    scale: string;
    field: string;
    jobDescription: string;
    applicantRequirements: string;
    benefit: string;
    right: string;
    workPlace: string;
    workingTime: string;
    applicationInformation: string;
    rank: string;
    education: string;
    numberOfRecruiter: string;
    formOfWork: string;
    relatedOccupations: string;
    requiredSkills: string;
    area: string;
  };
  isHR?: boolean;
}

const related = ["Sales", "Construction", "Python", "Design", "Marketing"];
const areaList = ["Sales", "Construction", "Python", "Design", "Marketing"];
const skills = ["Sales", "Construction", "Python", "Design", "Marketing"];

export default function JobDetailPage({ detail, isHR }: JobDetailProps) {
  const [title, setTitle] = useState(detail?.title || "");
  const [deadline, setDeadline] = useState(detail?.deadline || "");
  const [location, setLocation] = useState(detail?.location || "");
  const [salary, setSalary] = useState(detail?.salary || "");
  const [experience, setExperience] = useState(detail?.experience || "");
  const [rank, setRank] = useState(detail?.rank || "");
  const [education, setEducation] = useState(detail?.education || "");
  const [numberOfRecruits, setNumberOfRecruits] = useState(
    detail?.numberOfRecruiter || ""
  );
  const [formOfWork, setFormOfWork] = useState(detail?.formOfWork || "");
  const [relatedOccupations, setRelatedOccupations] = useState(
    detail?.relatedOccupations || ""
  );
  const [skill, setSkill] = useState(detail?.requiredSkills || "");
  const [area, setArea] = useState(detail?.area || "");
  const [workingTime, setWorkingTime] = useState(detail?.workingTime || "");
  const [workPlace, setWorkPlace] = useState(detail?.workPlace || "");
  const [jobDescription, setJobDescription] = useState(
    detail?.jobDescription || ""
  );
  const [applicantRequirements, setApplicantRequirements] = useState(
    detail?.applicantRequirements || ""
  );
  const [benefit, setBenefit] = useState(detail?.benefit || "");

  const isHrSafe = isHR ?? true;

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
    <div className="flex flex-col mx-20 my-10 gap-4">
      <GoBack />
      <div className="flex flex-wrap gap-8 px-6">
        <div className="flex-2 space-y-4">
          <div className="flex flex-col justify-between bg-neutral-light-20 shadow-xl rounded-3xl space-y-4 p-6">
            <div className="text-primary font-semibold text-2xl">
              {detail?.title}
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
                    {detail?.salary}
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
                    {detail?.location}
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
                    {detail?.experience}
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
                  Deadline: {detail?.deadline}
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
                    Applied: {detail?.current}/{detail?.max}
                  </button>
                )}
                <a
                  href="/save"
                  className="px-6 py-2 bg-accent rounded-full text-background font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 transform hover:-translate-y-0.5"
                >
                  Save
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4">
          <div className="flex flex-col justify-between bg-neutral-light-20 shadow-xl rounded-3xl space-y-4 p-6">
            <div className="flex px-2">
              <img
                src={detail?.image}
                alt={detail?.companyName}
                className="border-1 rounded-xs"
              />
              <div className="text-primary">{detail?.companyName}</div>
            </div>
            <div className="px-4 space-y-3">
              <div className="flex gap-10">
                <div className="flex gap-4">
                  <Users size={24} className="text-primary" />
                  <span className="text-primary font-semibold">Scale: </span>
                </div>
                <span className="text-primary-80">{detail?.scale}</span>
              </div>
              <div className="flex gap-10">
                <div className="flex gap-2">
                  <BriefcaseBusiness size={24} className="text-primary" />
                  <span className="text-primary font-semibold">Field: </span>
                </div>
                <span className="text-primary-80">{detail?.field}</span>
              </div>
              <div className="flex gap-3">
                <div className="flex gap-2">
                  <MapPin size={24} className="text-primary" />
                  <span className="text-primary font-semibold">Location: </span>
                </div>
                <span className="text-primary-80">{detail?.location}</span>
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
                  <p className="text-primary">{detail?.jobDescription}</p>
                </div>
                <div>
                  <h2 className="font-semibold text-accent">
                    Applicant Requirements
                  </h2>
                  <p className="text-primary">
                    {detail?.applicantRequirements}
                  </p>
                </div>
                <div>
                  <h2 className="font-semibold text-accent">Benefit</h2>
                  <p className="text-primary">{detail?.benefit}</p>
                </div>
                <div>
                  <h2 className="font-semibold text-accent">Right</h2>
                  <p className="text-primary">{detail?.right}</p>
                </div>
                <div>
                  <h2 className="font-semibold text-accent">Work Place</h2>
                  <p className="text-primary">{detail?.workPlace}</p>
                </div>
                <div>
                  <h2 className="font-semibold text-accent">Working Time</h2>
                  <p className="text-primary">{detail?.workingTime}</p>
                </div>
                <div>
                  <h2 className="font-semibold text-accent">Apply now!</h2>
                  <p className="text-primary">
                    {detail?.applicationInformation}
                  </p>
                </div>
              </div>
              <div>
                {!isHrSafe ? (
                  <div className="m-4">
                    <ApplyJobModal />
                  </div>
                ) : (
                  <button></button>
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
                        Ranks
                      </span>
                      <span className="text-secondary-80">{detail?.rank}</span>
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
                        {detail?.education}
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
                        Number of recruits
                      </span>
                      <span className="text-secondary-80">
                        {detail?.numberOfRecruiter}
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
                        Form of work
                      </span>
                      <span className="text-secondary-80">
                        {detail?.formOfWork}
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
                      Related occupations
                    </span>
                    <div className="grid grid-cols-2 gap-4 p-2">
                      <span className="bg-highlight-40 rounded-full px-4 py-2 text-center text-primary font-semibold">
                        {detail?.relatedOccupations}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <span className="font-semibold text-xl text-accent">
                      Required Skills
                    </span>
                    <div className="grid grid-cols-2 gap-4 p-2">
                      <span className="bg-highlight-40 rounded-full px-4 py-2 text-center text-primary font-semibold">
                        {detail?.requiredSkills}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <span className="font-semibold text-xl text-accent">
                      Area
                    </span>
                    <div className="grid grid-cols-2 gap-4 p-2">
                      <span className="bg-highlight-40 rounded-full px-4 py-2 text-center text-primary font-semibold">
                        {detail?.area}
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
              Active
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
                                    onFocus={() =>
                                      setOpenRelatedOccupation(true)
                                    }
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
                                Form of work*:
                              </label>
                              <div className="relative">
                                <input
                                  id="formOfWork"
                                  type="text"
                                  value={formOfWork}
                                  onChange={(e) =>
                                    setFormOfWork(e.target.value)
                                  }
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
                                  onChange={(e) =>
                                    setWorkingTime(e.target.value)
                                  }
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

            <button className="bg-secondary-60 hover:bg-secondary text-background px-6 py-2 rounded-full cursor-pointer">
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
