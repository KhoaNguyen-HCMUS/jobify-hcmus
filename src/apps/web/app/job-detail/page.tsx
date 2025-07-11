"use client";
import { useState, useEffect, useRef } from "react";
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
} from "lucide-react";
import ApplyJobModal from "../../components/applyJobModal";

interface JobDetailProps {
  detail: {
    head: string;
    salary: string;
    location: string;
    experience: string;
    deadline: string;
    image: string;
    companyName: string;
    scale: string;
    field: string;
    jobDescription: string;
    applicantRequirements: string;
    income: string;
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
}

export default function JobDetailPage({ detail }: JobDetailProps) {
  return (
    <div className="flex flex-col mx-20 my-10 gap-4">
      <GoBack />
      <div className="flex flex-wrap gap-8 px-6">
        <div className="flex-2 space-y-4">
          <div className="flex flex-col justify-between bg-neutral-light-20 shadow-xl rounded-3xl space-y-4 p-6">
            <div className="text-primary font-semibold text-2xl">
              {detail?.head}
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
                <ApplyJobModal />
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
                  <h2 className="font-semibold text-accent">Income</h2>
                  <p className="text-primary">{detail?.income}</p>
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
              <div className="ml-5 my-6">
                <ApplyJobModal />
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
    </div>
  );
}
