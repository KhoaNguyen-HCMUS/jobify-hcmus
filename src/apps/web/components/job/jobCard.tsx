"use client";

interface JobCardProps {
  job: {
    title: string;
    company: string;
    salary: string;
    province: string;
    image: string;
    name: string;
  };
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <div
      className="bg-white rounded-2xl border border-gray-200 p-6 transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg cursor-pointer"
    >
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-16 h-16 rounded-xl overflow-hidden">
          <img src={job.image} alt={job.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h3 className="font-bold text-lg text-text line-clamp-1">{job.title}</h3>
          <p className="text-text-80">{job.company}</p>
        </div>
      </div>
      <div className="flex justify-between items-center text-sm">
        <span className="text-green-600 font-semibold">{job.salary}</span>
        <span className="text-text-60">{job.province}</span>
      </div>
    </div>
  );
}