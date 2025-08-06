import JobCard from "./jobCard";
import LocationFilter from "../locationFilter";
import usePagination from "../../hooks/usePagination";
import Pagination from "../../components/pagination";
import { getAllJobs, Job } from "../../services/jobs";
import { useEffect, useState } from "react";

const transformJobForCard = (job: Job) => ({
  id: job.id,
  title: job.title,
  company_name: job.company_name || null,
  salary_min: job.salary_min,
  salary_max: job.salary_max,
  currency: job.currency,
  province: job.province,
  logo: "/logo.png", 
  name: job.title, 
  status: job.status,
  created_at: new Date(job.created_at),
});

export default function FeaturedJob() {
  const [jobs, setJobs] = useState<Job[]>([]);
  
  useEffect(() => {
    const fetchJobs = async () => {
      const response = await getAllJobs();
      const jobsData = response.data || [];
      
      const sortedJobs = jobsData.sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      
      setJobs(sortedJobs);
    };
    fetchJobs();
  }, []);

  const { page, maxPage, current, next, prev } = usePagination(jobs, 12);

  return (
    <div>
      <div className="mx-7">
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
          {current.map((job) => (
            <JobCard key={job.id} job={transformJobForCard(job)} />
          ))}
        </div>
        <div className="py-4">
          <Pagination
            page={page}
            maxPage={maxPage}
            onNext={next}
            onPrev={prev}
          />
        </div>
      </div>
    </div>
  );
}
