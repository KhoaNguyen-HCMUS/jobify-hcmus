"use client";
import { useState, useEffect } from "react";
import CategoryCard from "./categoryCard";
import usePagination from "../hooks/usePagination";
import Pagination from "./pagination";
import { getAllIndustries, Industry } from "../services/industries";

export default function CategoryGrid() {
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        setLoading(true);
        const response = await getAllIndustries();
        if (response.success && response.data) {
          // Get only parent industries (parent_id is null)
          const parentIndustries = response.data.filter(
            (industry) => !industry.parent_id
          );
          setIndustries(parentIndustries);
        }
      } catch (error) {
        console.error("Failed to fetch industries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIndustries();
  }, []);

  const { page, maxPage, current, next, prev } = usePagination(industries, 8);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-primary text-lg">Loading industries...</div>
      </div>
    );
  }

  return (
    <div className="bg-highlight-20">
      <div className="mx-6">
        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          {current.map((industry: Industry) => (
            <CategoryCard key={industry.id} category={industry} />
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
