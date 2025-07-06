import { Heart } from "lucide-react";

interface JobItemProps {
  job: {
    logo: string;
    name: string;
    title: string;
    company: string;
    province: string;
    experience: string;
    salary: string;
    postedAt: string;
  };
}

export default function Job({ job }: JobItemProps) {
  return (
    <div className="bg-highlight-20 rounded-2xl border-2 border-highlight p-4 mx-6 mt-4">
      <div className="flex gap-4">
        <img
          src={job.logo}
          alt={job.name}
          className="object-contain h-1/5 w-1/5"
        />
        <div className="flex flex-col justify-between">
          <span className="font-bold text-lg text-primary line-clamp-2">
            {job.title}
          </span>
          <div className="flex flex-col justify-between gap-2">
            <span className="text-primary-60 font-semibold line-clamp-1">
              {job.company}
            </span>
            <div className="flex justify-between">
              <div className="flex justify-between flex-wrap gap-4">
                <span className="bg-accent-20 text-primary-80 font-semibold rounded-full px-6 py-2">
                  {job.province}
                </span>
                <span className="bg-accent-20 text-primary-80 font-semibold rounded-full px-6 py-2">
                  {job.experience}
                </span>
                <span className="bg-accent-20 text-primary-80 font-semibold rounded-full px-6 py-2">
                  {job.salary} {" VNĐ"}
                </span>
              </div>
              <div className="flex gap-2">
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
  );
}
