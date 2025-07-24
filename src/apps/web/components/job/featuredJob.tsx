import JobCard from "./jobCard";
import LocationFilter from "../locationFilter";
import usePagination from "../../hooks/usePagination";
import Pagination from "../../components/pagination";
import { jobs } from "../../components/fakeJob";

export default function FeaturedJob() {
  const { page, maxPage, current, next, prev } = usePagination(jobs, 12);

  return (
    <div>
      <LocationFilter />
      <div className="mx-7">
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
          {current.map((job) => (
            <JobCard key={job.id} job={job} />
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
