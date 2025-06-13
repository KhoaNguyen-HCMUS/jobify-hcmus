"use Client";
import Image from "next/image";
import { Heart } from "lucide-react";

export default function JobCard({ job }: any) {
  return (
    <div className="bg-highlight-20 p-4 rounded-2xl mx-4 my-6">
      <div className="flex mb-4">
        <div className="relative group">
          <Image
            src={job.image}
            alt={job.name}
            width="80"
            height="80"
            className="border-2 border-primary rounded-2xl mr-4"
          />
        </div>
        <div className="outline-none flex flex-col justify-between">
          <p className="font-bold text-primary max-w-xs line-clamp-2">
            {job.title}
          </p>
          <p className="text-primary-80 font-semibold max-w-xs line-clamp-2">
            {job.company}
          </p>
        </div>
      </div>
      <div className="flex justify-between mt-2 mx-4">
        <p className="bg-accent-20 text-primary-80 rounded-full px-4 font-semibold">
          {job.salary}
        </p>
        <span className="bg-accent-20 text-primary-80 rounded-full px-4 font-semibold">
          {job.province}
        </span>
        <span>
          <Heart size={24} />
        </span>
      </div>
    </div>
  );
}
