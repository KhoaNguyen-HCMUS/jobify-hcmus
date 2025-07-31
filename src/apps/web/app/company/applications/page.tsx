"use client";
import {
  ArrowLeft,
  BookUser,
  SquarePlus,
  Phone,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import KeyWord from "../../../components/keyWord";
import Skills from "../../../components/skills";
import Education from "../../../components/education";
import WorkExperience from "../../../components/workExperience";

interface ApplicationsProps {
  app: {
    id: string;
    title: string;
    name: string;
    industry: string;
    major: string;
    gender: string;
    phone: string;
    email: string;
    fileCV: string;
    intro: string;
    github: string;
    linkedIn: string;
    website: string;
    letter: string;
    location: string;
    CV: string;
    profile: string;
    applicationStatus: string;
    date: string;
    note: string;
  };
}

const titles = [
  "Chuyên Viên Kinh Doanh",
  "Nhân Viên Tư Vấn",
  "Quản Lý Dự Án",
  "Kỹ Sư Phần Mềm",
  "Nhân Sự Tuyển Dụng",
];
const names = [
  "Nguyen Van A",
  "Tran Thi B",
  "Le Hoang C",
  "Pham Minh D",
  "Doan Bao E",
];
const majors = [
  "Computer Science",
  "Business Administration",
  "Marketing",
  "Finance",
  "Hospitality Management",
];
const genders = ["Male", "Female", "Other"];
const phones = [
  "0901234567",
  "0912345678",
  "0987654321",
  "0938123456",
  "0967123456",
];
const emails = [
  "a@gmail.com",
  "b@gmail.com",
  "c@gmail.com",
  "d@gmail.com",
  "e@gmail.com",
];
const fileCVs = [
  "/cv-a.pdf",
  "/cv-b.pdf",
  "/cv-c.pdf",
  "/cv-d.pdf",
  "/cv-e.pdf",
];
const intros = [
  "I am passionate about technology.",
  "I love working with people.",
  "Fast learner and dedicated.",
  "Experienced in team leadership.",
  "Always eager to learn.",
];
const githubs = [
  "https://github.com/a",
  "https://github.com/b",
  "https://github.com/c",
  "https://github.com/d",
  "https://github.com/e",
];
const linkedIns = [
  "https://linkedin.com/in/a",
  "https://linkedin.com/in/b",
  "https://linkedin.com/in/c",
  "https://linkedin.com/in/d",
  "https://linkedin.com/in/e",
];
const websites = [
  "https://portfolio-a.com",
  "https://portfolio-b.com",
  "https://portfolio-c.com",
  "https://portfolio-d.com",
  "https://portfolio-e.com",
];
const letters = [
  "I am excited to apply for this position.",
  "I believe I’m a great fit for your team.",
  "My background and skills align with your needs.",
  "I’m looking forward to contributing to your company.",
  "I hope to bring value through my experience.",
];
const industries = [
  "information technology",
  "hospitality",
  "education",
  "finance",
  "marketing",
];
const locations = ["Ho Chi Minh", "Hanoi", "Da Nang", "Can Tho", "Hai Phong"];
const statuses = [
  "Interview request",
  "Pending review",
  "Accepted",
  "Rejected",
  "In progress",
];
const notes = [
  "Candidate possesses strong skills",
  "Needs improvement in communication",
  "Excellent background",
  "Average performance",
  "Top candidate for this role",
];

const randomItem = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

const apps = Array.from({ length: 30 }, (_, i) => ({
  id: (i + 1).toString(),
  title: randomItem(titles),
  name: randomItem(names),
  major: randomItem(majors),
  gender: randomItem(genders),
  phone: randomItem(phones),
  email: randomItem(emails),
  fileCV: randomItem(fileCVs),
  intro: randomItem(intros),
  github: randomItem(githubs),
  linkedIn: randomItem(linkedIns),
  website: randomItem(websites),
  letter: randomItem(letters),
  industry: randomItem(industries),
  location: randomItem(locations),
  CV: randomItem(fileCVs),
  profile: <BookUser size={24} />,
  applicationStatus: randomItem(statuses),
  date: `2025-07-${String((i % 28) + 1).padStart(2, "0")}`,
  note: randomItem(notes),
}));

const skills = [{ skill: "Python" }, { skill: "C++" }, { skill: "C#" }];

const work = [
  {
    title: "Software Engineer",
    company: "Tech Solution Inc.",
    timeRange: "March 2022 - Present",
  },
];

const edu = [
  {
    title: "Software Engineer",
    institution: "Tech Solution Inc.",
    timeRange: "March 2022 - Present",
  },
  {
    title: "Software Engineer",
    institution: "Tech Solution Inc.",
    timeRange: "March 2022 - Present",
  },
];

export default function RecruiterApplicationsPage({ app }: ApplicationsProps) {
  const router = useRouter();

  const [experience, setExperience] = useState("allExperience");
  const [education, setEducation] = useState("allEducation");
  const [location, setLocation] = useState("allLocation");

  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);

  const handleRowClick = (id: string) => {
    setSelectedCandidateId(id);
    setShowModal(true);
  };

  const selectedCandidate = apps.find((c) => c.id === selectedCandidateId);

  // const [skills, setSkills] = useState<{ skill: string }[]>([]);
  // const [work, setWork] = useState<
  //   { title: string; company: string; timeRange: string }[]
  // >([]);
  // const [edu, setEdu] = useState<
  //   { title: string; institution: string; timeRange: string }[]
  // >([]);

  // useEffect(() => {
  //   if (selectedCandidateId) {
  //     fetch(`jobs/:id/applications/${selectedCandidateId}`)
  //       .then((res) => {
  //         if (!res.ok) throw Error("Failed to fetch");
  //         return res.json();
  //       })
  //       .then((data) => {
  //         setSkills(data.skills || []);
  //         setWork(data.work || []);
  //         setEdu(data.edu || []);
  //       })
  //       .catch((err) => {
  //         console.error("Error fetching candidate data:", err);
  //         setSkills([]);
  //         setWork([]);
  //         setEdu([]);
  //       });
  //   }
  // }, [selectedCandidateId]);

  const [letter, setLetter] = useState(
    selectedCandidate?.letter ||
      "Hello, my name is Hinh Diem Xuan, a recent graduate in Software Engineering – IT from University of Science.I have a strong foundation in programming, databases, and web development, with hands-on project experience. I'm passionate about technology, eager to learn, and looking forward to contributing to impactful projects in a professional environment"
  );

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
          {selectedCandidate?.title}
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
              {apps.map((candidate, index) => (
                <tr
                  key={candidate.id}
                  onClick={() => handleRowClick(candidate.id)}
                  className={`py-2 px-4 text-primary-80 hover:bg-highlight transition-colors cursor-pointer ${
                    index % 2 === 0 ? "bg-highlight-20" : "bg-highlight-40"
                  }`}
                >
                  <td className="w-2/15 border border-primary-60 p-2">
                    <span className="line-clamp-1">{candidate.name}</span>
                  </td>
                  <td className="w-2/15 border border-primary-60 p-2">
                    <span className="line-clamp-1">{candidate.industry}</span>
                  </td>
                  <td className="w-2/15 border border-primary-60 p-2">
                    <span className="line-clamp-1">{candidate.location}</span>
                  </td>
                  <td className="w-1/15 border border-primary-60 p-2">
                    <span className="flex justify-center items-center">
                      {candidate.CV}
                    </span>
                  </td>
                  <td className="w-1/15 border border-primary-60 p-2">
                    <span className="flex justify-center items-center">
                      {candidate.profile}
                    </span>
                  </td>
                  <td className="w-2/15 border border-primary-60 p-2">
                    <span className="line-clamp-1">
                      {candidate.applicationStatus}
                    </span>
                  </td>
                  <td className="w-2/15 border border-primary-60 p-2">
                    <span className="line-clamp-1">{candidate.date}</span>
                  </td>
                  <td className="w-3/15 border border-primary-60 p-2">
                    <span className="line-clamp-1">{candidate.note}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {showModal && selectedCandidate && (
            <div
              onClick={() => {
                setShowModal(false);
                setSelectedCandidateId(null);
              }}
              className="fixed inset-0 bg-primary-80 z-50 flex items-center justify-center"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="w-3/5 max-h-[90vh] overflow-y-auto bg-neutral-light rounded-xl relative"
              >
                <div className="flex flex-col">
                  <div className="flex flex-col gap-2 mx-10 my-4">
                    <span className="text-primary text-2xl font-bold">
                      Profile:
                    </span>
                    <div className="bg-neutral-light-40 shadow-md rounded-3xl">
                      <div className="flex flex-col gap-y-4 mx-10 my-4">
                        <div className="flex flex-wrap gap-4">
                          <div className="flex-1 flex justify-center items-center">
                            <label className="relative w-40 h-40 border border-primary-60 rounded-lg flex items-center justify-center cursor-pointer hover:bg-highlight-20">
                              <input
                                type="file"
                                accept="image/*"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                  }
                                }}
                              />
                              <img
                                src="/logo-light.png"
                                alt="upload icon"
                                className="w-40 h-40 opacity-40"
                              />
                            </label>
                          </div>
                          <div className="flex-4 flex flex-col">
                            <div className="text-primary text-2xl font-semibold">
                              {selectedCandidate?.name}
                            </div>
                            <div className="flex flex-wrap">
                              <div className="flex-1 flex flex-col text-primary-80">
                                <span className="font-semibold">
                                  {selectedCandidate?.industry}
                                </span>
                                <span>{selectedCandidate?.gender}</span>
                              </div>
                              <div className="flex-1 flex flex-col text-primary-80">
                                <span className="font-semibold">
                                  {selectedCandidate?.major}
                                </span>
                                <span>{selectedCandidate?.phone}</span>
                              </div>
                            </div>
                            <div className="text-accent">
                              {selectedCandidate?.email}
                            </div>
                            <div className="text-primary-80">
                              {selectedCandidate?.location}
                            </div>
                            <div className="text-accent">
                              <b>CV: </b>
                              <a
                                href={selectedCandidate?.fileCV}
                                download
                                className="hover:text-secondary hover:underline"
                              >
                                {selectedCandidate?.CV}
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <div className="flex gap-2 text-accent font-semibold">
                            <SquarePlus size={24} />
                            <span>INTRODUCTION</span>
                          </div>
                          <span className="text-primary-80 border-t border-primary-40">
                            {selectedCandidate?.intro}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-4">
                          <div className="flex-1 flex flex-col">
                            <div className="flex gap-2 text-accent font-semibold">
                              <Phone size={24} />
                              <span>CONTACT</span>
                            </div>
                            <div className="flex flex-col text-primary border-t border-primary-40">
                              <span>
                                GitHub:{" "}
                                <span className="text-accent hover:text-secondary hover:underline">
                                  {selectedCandidate?.github}
                                </span>
                              </span>
                              <span>
                                LinkedIn:{" "}
                                <span className="text-accent hover:text-secondary hover:underline">
                                  {selectedCandidate?.linkedIn}
                                </span>
                              </span>
                              <span>
                                Personal Website:{" "}
                                <a
                                  href={selectedCandidate?.website}
                                  className="text-accent hover:text-secondary hover:underline"
                                >
                                  {selectedCandidate?.website}
                                </a>
                              </span>
                            </div>
                          </div>
                          <div className="flex-1 flex flex-col">
                            <div className="flex gap-2 text-accent font-semibold">
                              <Briefcase size={24} />
                              <span>SKILLS</span>
                            </div>
                            <div className="flex flex-wrap gap-2 border-t border-primary-40 pt-2">
                              {skills.map((skill, idx) => (
                                <Skills key={idx} skill={skill.skill} />
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-4">
                          <div className="flex-1 flex flex-col">
                            <div className="flex gap-2 text-accent font-semibold">
                              <Briefcase size={24} />
                              <span>WORK EXPERIENCE</span>
                            </div>
                            <div className="flex flex-col border-t border-primary-40">
                              {work?.map((works, idx) => (
                                <WorkExperience
                                  key={idx}
                                  title={works.title}
                                  company={works.company}
                                  timeRange={works.timeRange}
                                />
                              ))}
                            </div>
                          </div>
                          <div className="flex-1 flex flex-col">
                            <div className="flex gap-2 text-accent font-semibold">
                              <GraduationCap size={24} />
                              <span>EDUCATION</span>
                            </div>
                            <div className="flex flex-col border-t border-primary-40">
                              {edu?.map((education, idx) => (
                                <Education
                                  key={idx}
                                  title={education.title}
                                  institution={education.institution}
                                  timeRange={education.timeRange}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 mx-10 my-4">
                    <span className="text-primary text-2xl font-bold">
                      Cover Letter:
                    </span>
                    <div className="relative shadow-lg bg-neutral-light-20 mb-4 rounded-xl">
                      <textarea
                        id="letter"
                        value={letter}
                        onChange={(e) => setLetter(e.target.value)}
                        className="w-full h-32 px-4 py-3 pr-12 text-primary-80 placeholder-primary-80 focus:outline-none resize-none"
                        placeholder="Write a brief introduction about yourself (strengths, weaknesses) and clearly state your desire and reason for applying for this position."
                      ></textarea>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mx-10 mb-4">
                    <button className="bg-[#F52121] text-background hover:bg-red-800 px-6 py-2 rounded-full cursor-pointer">
                      Report
                    </button>
                    <button className="bg-primary-80 text-neutral-light-20 px-6 py-2 rounded-full cursor-pointer">
                      Pending
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
