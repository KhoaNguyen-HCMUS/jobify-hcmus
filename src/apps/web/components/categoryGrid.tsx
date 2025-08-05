"use client";
import CategoryCard from "./categoryCard";

import usePagination from "../hooks/usePagination";
import Pagination from "./pagination";
import { industries, Industry } from "../constants/topIndustriesConstants";

export default function CategoryGrid() {
  const { page, maxPage, current, next, prev } = usePagination(industries, 8);

  return (
    <div>
      <div className="mx-7">
        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          {current.map((industry: Industry) => (
            <CategoryCard 
              key={industry.id} 
              category={industry} 
            />
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
