import { useState, useMemo } from "react";
import JobCard from "./jobCard";
import LocationFilter from "../locationFilter";
import usePagination from "../../hooks/usePagination";
import Pagination from "../../components/pagination";
import { jobs } from "../../components/fakeJob";

export default function FeaturedJob() {
  const [selectedProvince, setSelectedProvince] = useState("");
  const [keyword, setKeyword] = useState("");

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchProvince =
        selectedProvince === "" || job.province === selectedProvince;

      const matchKeyword =
        keyword === "" ||
        job.title.toLowerCase().includes(keyword.toLowerCase()) ||
        job.company.toLowerCase().includes(keyword.toLowerCase()) ||
        job.salary.toLowerCase().includes(keyword.toLowerCase()) ||
        job.province.toLowerCase().includes(keyword.toLowerCase());

      return matchProvince && matchKeyword;
    });
  }, [selectedProvince, keyword]);

  const { page, maxPage, current, next, prev } = usePagination(
    filteredJobs,
    12
  );

  return (
    <div>
      <LocationFilter
        onSelectProvince={setSelectedProvince}
        onKeywordChange={setKeyword}
      />
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
