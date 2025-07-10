"use client";
import { useState } from "react";
import {
  User,
  Mail,
  VenusAndMars,
  Phone,
  MapPin,
  Briefcase,
  CatIcon,
  StarHalf,
  Globe,
  GraduationCap,
} from "lucide-react";

export default function CandidateProfileEditPage() {
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [intro, setIntro] = useState("");
  const [location, setLocation] = useState("");
  const [industry, setIndustry] = useState("");
  const [profession, setProfession] = useState("");
  const [github, setGithub] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [skill, setSkill] = useState("");
  const [website, setWebsite] = useState("");
  const [workEx, setWorkEx] = useState("");
  const [education, setEducation] = useState("");

  return (
    <div className="w-full h-full bg-neutral-light-60">
      <div className="flex flex-col justify-between px-20 py-10 space-y-4">
        <div className="text-accent font-bold text-2xl">
          Personal Information
        </div>
        <div className="flex flex-col gap-4 p-4">
          <div className="flex flex-wrap">
            <div className="flex-1 flex flex-col gap-2 px-4">
              <div className="flex flex-col">
                <label
                  htmlFor="fullName"
                  className="block text-sm font-bold text-primary ml-4"
                >
                  Full Name*:
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary">
                    <User size={18} />
                  </div>
                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full border-2 border-primary pl-12 pr-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all duration-300"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="fullName"
                  className="block text-sm font-bold text-primary ml-4"
                >
                  Email:
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary">
                    <Mail size={18} />
                  </div>
                  <input
                    id="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full border-2 border-primary pl-12 pr-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all duration-300"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex flex-col px-4">
                <label
                  htmlFor="gender"
                  className="block text-sm font-bold text-primary ml-4"
                >
                  Gender*:
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary">
                    <VenusAndMars size={18} />
                  </div>
                  <input
                    id="gender"
                    type="text"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    placeholder="Enter your gender"
                    className="w-full border-2 border-primary pl-12 pr-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all duration-300"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col px-4">
                <label
                  htmlFor="phone"
                  className="block text-sm font-bold text-primary ml-4"
                >
                  Phone Number*:
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary">
                    <Phone size={18} />
                  </div>
                  <input
                    id="phone"
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone number"
                    className="w-full border-2 border-primary pl-12 pr-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all duration-300"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 px-4">
            <label
              htmlFor="intro"
              className="block text-sm font-bold text-primary ml-4"
            >
              Introduce yourself:
            </label>
            <div className="relative">
              <input
                id="intro"
                type="text"
                value={intro}
                onChange={(e) => setIntro(e.target.value)}
                placeholder="Enter your self-introduction"
                className="w-full border-2 border-primary pl-4 pr-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all duration-300"
                required
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 px-4">
            <label
              htmlFor="location"
              className="block text-sm font-bold text-primary ml-4"
            >
              Location detail:
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary">
                <MapPin size={18} />
              </div>
              <input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter your location detail"
                className="w-full border-2 border-primary pl-12 pr-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all duration-300"
                required
              />
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="flex-1 flex flex-col gap-2 px-4">
              <div className="flex flex-col">
                <label
                  htmlFor="industry"
                  className="block text-sm font-bold text-primary ml-4"
                >
                  Industry:
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary">
                    <Briefcase size={18} />
                  </div>
                  <input
                    id="industry"
                    type="text"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    placeholder="Enter your industry"
                    className="w-full border-2 border-primary pl-12 pr-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all duration-300"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="github"
                  className="block text-sm font-bold text-primary ml-4"
                >
                  Github:
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary">
                    <CatIcon size={18} />
                  </div>
                  <input
                    id="github"
                    type="text"
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    placeholder="Enter your Github ID"
                    className="w-full border-2 border-primary pl-12 pr-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all duration-300"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="skill"
                  className="block text-sm font-bold text-primary ml-4"
                >
                  Skills:
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary">
                    <Briefcase size={18} />
                  </div>
                  <input
                    id="skill"
                    type="text"
                    value={skill}
                    onChange={(e) => setSkill(e.target.value)}
                    placeholder="Enter your skills"
                    className="w-full border-2 border-primary pl-12 pr-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all duration-300"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="workEx"
                  className="block text-sm font-bold text-primary ml-4"
                >
                  Work Experience:
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary">
                    <Briefcase size={18} />
                  </div>
                  <input
                    id="workEx"
                    type="text"
                    value={workEx}
                    onChange={(e) => setWorkEx(e.target.value)}
                    placeholder="Enter your work experience"
                    className="w-full border-2 border-primary pl-12 pr-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all duration-300"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-2 px-4">
              <div className="flex flex-col">
                <label
                  htmlFor="profession"
                  className="block text-sm font-bold text-primary ml-4"
                >
                  Profession:
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary">
                    <Briefcase size={18} />
                  </div>
                  <input
                    id="profession"
                    type="text"
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                    placeholder="Enter your profession"
                    className="w-full border-2 border-primary pl-12 pr-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all duration-300"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="linkedIn"
                  className="block text-sm font-bold text-primary ml-4"
                >
                  Linkedin:
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary">
                    <StarHalf size={18} />
                  </div>
                  <input
                    id="linkedIn"
                    type="text"
                    value={linkedIn}
                    onChange={(e) => setLinkedIn(e.target.value)}
                    placeholder="Enter your Linkedin ID"
                    className="w-full border-2 border-primary pl-12 pr-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all duration-300"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="website"
                  className="block text-sm font-bold text-primary ml-4"
                >
                  Personal website:
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary">
                    <Globe size={18} />
                  </div>
                  <input
                    id="website"
                    type="text"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="Enter your website link"
                    className="w-full border-2 border-primary pl-12 pr-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all duration-300"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="education"
                  className="block text-sm font-bold text-primary ml-4"
                >
                  Education:
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary">
                    <GraduationCap size={18} />
                  </div>
                  <input
                    id="education"
                    type="text"
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    placeholder="Add education"
                    className="w-full border-2 border-primary pl-12 pr-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all duration-300"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="hover:bg-accent hover:text-neutral-light-60 cursor-pointer text-accent border-2 border-accent font-semibold rounded-2xl px-6 py-2">
            <a href="/candidate/profile">Cancel</a>
          </div>
          <div className="bg-accent hover:text-accent hover:bg-neutral-light-60 cursor-pointer border-2 border-accent text-neutral-light-20 font-semibold rounded-2xl px-6 py-2">
            <a href="/candidate/profile">Save</a>
          </div>
        </div>
      </div>
    </div>
  );
}
