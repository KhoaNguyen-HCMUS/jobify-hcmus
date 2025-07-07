import { Heart } from "lucide-react";

interface JobCardProps {
  job: {
    title: string;
    company: string;
    salary: string;
    province: string;
    image: string;
    name: string;
    isPending?: boolean;
  };
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg cursor-pointer">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-16 h-16 rounded-xl overflow-hidden">
          <img
            src={job.image}
            alt={job.name}
            className="w-full h-full object-cover"
          />
        </div>
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
        {job.isPending ? (
          <span className="text-highlight-20 font-semibold px-4 py-2 bg-accent-80 rounded-full">
            Pending
          </span>
        ) : (
          <span></span>
        )}
        <span className="text-primary-80">
          <Heart size={24} />
        </span>
      </div>
    </div>
  );
}
