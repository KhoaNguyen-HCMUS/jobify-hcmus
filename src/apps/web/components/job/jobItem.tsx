import { Heart } from "lucide-react";
import JobStatusBadge from "./jobStatusBadge";
import Link from "next/link";

interface JobItemProps {
  job: {
    id: string;
    logo: string;
    name: string;
    title: string;
    company_name: string;
    province: string;
    experience: string;
    salary: string;
    postedAt: string;
    is_salary_negotiable: boolean;
    status?: string;
  };
}

export default function Job({ job }: JobItemProps) {
  return (
    <Link href={`/jobs/${job.id}`}>
      <div className="shadow-md bg-neutral-light-20 rounded-xl border border-primary-20 p-3 mx-4 mt-3 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer">
        <div className="flex gap-3">
          <img
            src={job.logo}
            alt={job.name}
            className="object-contain h-12 w-12"
          />
          <div className="flex flex-col justify-between flex-1">
            <span className="font-bold text-base text-primary line-clamp-2">
              {job.title}
            </span>
            <div className="flex flex-col justify-between gap-1.5 mt-1.5">
              <span className="text-primary-60 font-semibold line-clamp-1 text-sm">
                {job.company_name}
              </span>
              <div className="flex justify-between items-start flex-wrap gap-1.5">
                <div className="flex flex-wrap gap-1.5">
                  <span className="bg-accent-20 text-primary-80 font-semibold rounded-full px-3 py-0.5 text-xs">
                    {job.province}
                  </span>

                  <span className="bg-accent-20 text-primary-80 font-semibold rounded-full px-3 py-0.5 text-xs">
                    {job.experience}
                  </span>

                  <span className="bg-accent-20 text-primary-80 font-semibold rounded-full px-3 py-0.5 text-xs">
                    {job.salary}
                  </span>

                  <span className="bg-accent-20 text-primary-80 font-semibold rounded-full px-3 py-0.5 text-xs">
                    {job.is_salary_negotiable ? "Negotiable" : "Fixed Salary"}
                  </span>



                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-primary-60 font-semibold text-xs">
                    {job.postedAt}
                  </span>
                  <Heart className="text-secondary-40" size={18} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
