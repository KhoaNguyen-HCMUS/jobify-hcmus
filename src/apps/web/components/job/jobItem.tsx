import { Heart } from "lucide-react";
import JobStatusBadge from "./jobStatusBadge";
import Link from "next/link";

interface JobItemProps {
  job: {
    id: number;
    logo: string;
    name: string;
    title: string;
    company: string;
    province: string;
    experience: string;
    salary: string;
    postedAt: string;
    status?: string;
  };
}

export default function Job({ job }: JobItemProps) {
  return (
    <Link href={`/jobs/${job.id}`}>
      <div className="shadow-md bg-neutral-light-20 rounded-2xl border border-primary-20 p-4 mx-6 mt-4 transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg cursor-pointer">
        <div className="flex gap-4">
          <img
            src={job.logo}
            alt={job.name}
            className="object-contain h-1/5 w-1/5"
          />
          <div className="flex flex-col justify-between flex-1">
            <span className="font-bold text-lg text-primary line-clamp-2">
              {job.title}
            </span>
            <div className="flex flex-col justify-between gap-2 mt-2">
              <span className="text-primary-60 font-semibold line-clamp-1">
                {job.company}
              </span>
              <div className="flex justify-between items-start flex-wrap gap-2">
                <div className="flex flex-wrap gap-2">
                  <span className="bg-accent-20 text-primary-80 font-semibold rounded-full px-4 py-1">
                    {job.province}
                  </span>

                  <span className="bg-accent-20 text-primary-80 font-semibold rounded-full px-4 py-1">
                    {job.experience}
                  </span>

                  <span className="bg-accent-20 text-primary-80 font-semibold rounded-full px-4 py-1">
                    {job.salary} VNĐ
                  </span>

                  <JobStatusBadge status={job.status} />
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-primary-60 font-semibold">
                    {job.postedAt}
                  </span>
                  <Heart className="text-secondary-40" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
