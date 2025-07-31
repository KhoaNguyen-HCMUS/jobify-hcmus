import { Heart } from "lucide-react";
import JobStatusBadge from "./jobStatusBadge";
import Link from "next/link";

interface JobCardProps {
  job: {
    id: number;
    title: string;
    company: string;
    salary: string;
    province: string;
    logo: string;
    name: string;
    major: string;
    status?: string;
  };
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <Link href={`/jobs/${job.id}`}>
      <div className="bg-neutral-light-20 rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg cursor-pointer">
        <div className="flex items-center space-x-4 mb-4">
          <img
            src={job.logo}
            alt={job.name}
            className="w-1/5 h-1/5 object-contain"
          />
          <div>
            <h3 className="font-bold text-lg text-text line-clamp-1">
              {job.title}
            </h3>
            <p className="text-text-80">{job.company}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 justify-between items-center text-sm">
          <span className="text-primary-80 font-semibold px-4 py-2 bg-accent-20 rounded-full">
            {job.salary} {" VNĐ"}
          </span>
          <span className="text-primary-80 font-semibold px-4 py-2 bg-accent-20 rounded-full">
            {job.province}
          </span>
          <JobStatusBadge status={job.status} />
          <span className="text-primary-80">
            <Heart size={24} />
          </span>
        </div>
      </div>
    </Link>
  );
}
