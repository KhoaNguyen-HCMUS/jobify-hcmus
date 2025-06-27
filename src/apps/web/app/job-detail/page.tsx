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
    numberPhone: string;
    formOfWork: string;
    relatedOccupations: string;
    requiredSkills: string;
    area: string;
  };
}

export default function JobDetailPage({ detail }: JobDetailProps) {
  return (
    <div className="grid grid-cols-3 grid-rows-3 p-4 m-4 gap-10">
      <div className="col-span-2 flex flex-col justify-between bg-highlight-20 rounded-xl p-4 space-y-4">
        <div className="font-semibold text-4xl">{detail?.head}</div>
        <div className="flex justify-between space-x-3">
          <div className="flex items-center">
            <DollarSign
              size={44}
              className="bg-linear-[180deg,#0F6EFF,#B7CAE5] text-background rounded-full"
            />
            <div className="flex flex-col justify-between pl-2">
              <div className="text-primary-80 font-semibold text-3xl">
                Salary
              </div>
              <div className="text-primary font-semibold text-2xl">
                {detail?.salary}
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <MapPin
              size={44}
              className="bg-linear-[180deg,#0F6EFF,#B7CAE5] text-background rounded-full"
            />
            <div className="flex flex-col justify-between pl-2">
              <div className="text-primary-80 font-semibold text-3xl">
                Location
              </div>
              <div className="text-primary font-semibold text-2xl">
                {detail?.location}
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <Hourglass
              size={44}
              className="bg-linear-[180deg,#0F6EFF,#B7CAE5] text-background rounded-full"
            />
            <div className="flex flex-col justify-between pl-2">
              <div className="text-primary-80 font-semibold text-3xl">
                Experience
              </div>
              <div className="text-primary font-semibold text-2xl">
                {detail?.experience}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex bg-highlight rounded-xl px-2">
            <Clock size={34} />
            <span className="text-secondary-80 font-semibold w-full pl-2 bg-highlight rounded-xl text-2xl">
              Deadline: {detail?.deadline}
            </span>
          </div>
          <div className="space-x-4">
            <a
              href="apply-now"
              className="p-2 bg-accent rounded-full text-background font-semibold text-2xl"
            >
              Apply now
            </a>
            <a
              href="save"
              className="p-2 bg-accent rounded-full text-background font-semibold text-2xl"
            >
              Save
            </a>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between bg-highlight-20 rounded-xl p-4 space-y-4">
        <div className="flex px-2">
          <img
            src={detail?.image}
            alt={detail?.companyName}
            className="border-1 rounded-xs"
          />
          <div className="text-primary">{detail?.companyName}</div>
        </div>
        <div className="px-4 space-y-3">
          <div className="flex">
            <Users size={24} className="text-primary-80" />
            <span className="pl-2 text-primary-80 font-semibold">
              Scale: {detail?.scale}
            </span>
          </div>
          <div className="flex">
            <BriefcaseBusiness size={24} className="text-primary-80" />
            <span className="pl-2 text-primary-80 font-semibold">
              Field: {detail?.field}
            </span>
          </div>
          <div className="flex">
            <MapPin size={24} className="text-primary-80" />
            <span className="pl-2 text-primary-80 font-semibold">
              Location: {detail?.location}
            </span>
          </div>
        </div>
        <div className="flex space-x-1 text-accent font-semibold justify-center">
          <a href="company">View company page</a>
          <FileStack />
        </div>
      </div>
      <div className="row-span-2 col-span-2 flex flex-col justify-between bg-highlight-20 rounded-xl p-4 space-y-4">
        <h1 className="font-bold text-2xl">Job details</h1>
        <div>
          <h2 className="font-semibold">Job Desciption</h2>
          <p>{detail?.jobDescription}</p>
        </div>
        <div>
          <h2 className="font-semibold">Applicant Requirements</h2>
          <p>{detail?.applicantRequirements}</p>
        </div>
        <div>
          <h2 className="font-semibold">Income</h2>
          <p>{detail?.income}</p>
        </div>
        <div>
          <h2 className="font-semibold">Right</h2>
          <p>{detail?.right}</p>
        </div>
        <div>
          <h2 className="font-semibold">Work Place</h2>
          <p>{detail?.workPlace}</p>
        </div>
        <div>
          <h2 className="font-semibold">Working Time</h2>
          <p>{detail?.workingTime}</p>
        </div>
        <div>
          <h2 className="font-semibold">Application Information</h2>
          <p>{detail?.applicationInformation}</p>
        </div>
        <div>
          <a
            href="apply-now"
            className="p-2 bg-accent rounded-full text-background font-semibold"
          >
            Apply now
          </a>
        </div>
      </div>
      <div className="flex flex-col justify-between bg-highlight-20 rounded-xl p-4 space-y-4">
        <h1 className="font-semibold text-center text-2xl">
          General Information
        </h1>
        <div className="flex px-4">
          <ShieldHalf
            size={44}
            className="bg-linear-[180deg,#0F6EFF,#B7CAE5] rounded-full text-background"
          />
          <div className="flex flex-col justify-between pl-2">
            <span className="text-primary-80 font-semibold">Ranks</span>
            <span>{detail?.rank}</span>
          </div>
        </div>
        <div className="flex px-4">
          <GraduationCap
            size={44}
            className="bg-linear-[180deg,#0F6EFF,#B7CAE5] rounded-full text-background"
          />
          <div className="flex flex-col justify-between pl-2">
            <span className="text-primary-80 font-semibold">Education</span>
            <span>{detail?.education}</span>
          </div>
        </div>
        <div className="flex px-4">
          <Users
            size={44}
            className="bg-linear-[180deg,#0F6EFF,#B7CAE5] rounded-full text-background"
          />
          <div className="flex flex-col justify-between pl-2">
            <span className="text-primary-80 font-semibold">
              Number of recruits
            </span>
            <span>{detail?.numberPhone}</span>
          </div>
        </div>
        <div className="flex px-4">
          <BriefcaseBusiness
            size={44}
            className="bg-linear-[180deg,#0F6EFF,#B7CAE5] rounded-full text-background"
          />
          <div className="flex flex-col pl-2">
            <span className="text-primary-80 font-semibold">Form of work</span>
            <span>{detail?.formOfWork}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between bg-highlight-20 rounded-xl p-4 space-y-4">
        <div>
          <div className="font-semibold text-2xl">Related occupations</div>
          <div className="grid grid-cols-2 gap-4 p-2">
            <span className="bg-highlight-60 rounded-full px-4 py-2 text-center text-primary font-semibold">
              {detail?.relatedOccupations}
            </span>
          </div>
        </div>
        <div>
          <div className="font-semibold text-2xl">Required Skills</div>
          <div className="grid grid-cols-2 gap-4 p-2">
            <span className="bg-highlight-60 rounded-full px-4 py-2 text-center text-primary font-semibold">
              {detail?.requiredSkills}
            </span>
          </div>
        </div>
        <div>
          <div className="font-semibold text-2xl">Area</div>
          <div className="grid grid-cols-2 gap-4 p-2">
            <span className="bg-highlight-60 rounded-full px-4 py-2 text-center text-primary font-semibold">
              {detail?.area}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
