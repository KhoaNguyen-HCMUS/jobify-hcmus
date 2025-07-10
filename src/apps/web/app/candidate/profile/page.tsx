import { MapPin, Briefcase } from "lucide-react";
import PersonalInformation from "../../../components/personalInformation";
import Skills from "../../../components/skills";
import Education from "../../../components/education";
import WorkExperience from "../../../components/workExperience";

export default function CandidateProfilePage() {
  const userData = {
    fullName: "Hinh Diem Xuan",
    gender: "Female",
    email: "hdxuan23@clc.fitus.edu.vn",
    phone: "0909 123 456",
    introduce:
      "Hello, my name is Hinh Diem Xuan, a recent graduate in Software Engineering – IT from University of Science. I have a strong foundation in programming, databases, and web development, with hands-on project experience. I'm passionate about technology, eager to learn, and looking forward to contributing to impactful projects in a professional environment",
    location: "227 Nguyen Van Cu, district 5, Ho Chi Minh city, Viet Nam",
    industry: "IT",
    profession: "IT",
    github: "hdxuan23@clc.fitus.edu.vn",
    linkedIn: "Hinh Diem Xuan",
    website: "www.facebook.com/hdxuan",
  };

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

  return (
    <div className="w-full h-full bg-neutral-light-60">
      <div className="flex flex-col justify-between px-20 py-10">
        <div className="text-accent font-bold text-2xl">
          Personal Information
        </div>
        <div className="flex flex-col gap-4 p-4">
          <div className="flex flex-wrap">
            <div className="flex-1 flex flex-col gap-2">
              <PersonalInformation
                title="Full Name"
                inFor={userData.fullName}
              />
              <PersonalInformation title="Email" inFor={userData.email} />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <PersonalInformation title="Gender" inFor={userData.gender} />
              <PersonalInformation
                title="Phone Number"
                inFor={userData.phone}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <b className="text-primary">Introduce yourself:</b>
            <span className="text-primary-80">
              Hello, my name is Hinh Diem Xuan, a recent graduate in Software
              Engineering - IT from University of Science. I have a strong
              foundation in programming, databases, and web development, with
              hands-on project experience. I'm passionate about technology,
              eager to learn, and looking forward to contributing to impactful
              projects in a professional environment
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <b className="text-primary">Location detail:</b>
            <div className="flex flex-wrap gap-2 text-primary-80">
              <MapPin className="w-4 h-4" />
              <span className="flex justify-between">
                227 Nguyen Van Cu, district 5, Ho Chi Minh city, Viet Nam
              </span>
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="flex-1 flex flex-col gap-2">
              <PersonalInformation title="Industry" inFor={userData.industry} />
              <PersonalInformation title="GitHub" inFor={userData.github} />
              <div className="flex flex-col gap-2">
                <span className="text-primary text-lg">
                  <b>Skills:</b>
                </span>
                <div className="flex flex-wrap gap-2 items-center text-primary-80 font-semibold">
                  <Briefcase className="w-4 h-4 mr-1" />
                  <div className="flex flex-wrap gap-2 ">
                    {skills.map((skill, idx) => (
                      <Skills key={idx} skill={skill.skill} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <PersonalInformation
                title="Profession"
                inFor={userData.profession}
              />
              <PersonalInformation title="LinkedIn" inFor={userData.linkedIn} />
              <a href={userData.website}>
                <PersonalInformation
                  title="Person website"
                  inFor={userData.website}
                />
              </a>
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="flex-1 flex flex-col gap-2">
              <b className="text-primary">Work Experience:</b>
              <div className="flex flex-col gap-2">
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
            <div className="flex-1 flex flex-col gap-2">
              <b className="text-primary">Education:</b>
              <div className="flex flex-col gap-2">
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
        <div className="flex">
          <div className="bg-accent hover:bg-secondary cursor-pointer text-neutral-light-20 font-semibold rounded-2xl px-6 py-2">
            <a href="/candidate/profile/edit">Edit</a>
          </div>
        </div>
      </div>
    </div>
  );
}
