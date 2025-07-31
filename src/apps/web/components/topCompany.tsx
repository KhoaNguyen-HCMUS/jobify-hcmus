"use client";
import LocationFilter from "./locationFilter";
import CompanyCard from "./companyCard";
import usePagination from "../hooks/usePagination";
import Pagination from "./pagination";
import { companies } from "../components/fakeCompany";

export default function TopCompany() {
  const { page, maxPage, current, next, prev } = usePagination(companies, 12);

  return (
    <div>
      <LocationFilter />
      <div className="mx-7">
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
          {current.map((company) => (
            <CompanyCard key={company.id} company={company} />
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
