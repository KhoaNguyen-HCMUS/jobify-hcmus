"use client";
import FeaturedJob from "../components/job/featuredJob";
import CategoryGrid from "../components/categoryGrid";
import KeywordSearch from "../components/keywordSearch";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <div className="w-full min-h-screen bg-accent-40">
      <div className="mb-10">
        <h1 className="font-bold text-7xl text-primary ml-16 py-10">
          Find Opportunities <br /> That Fit You Best!
        </h1>
        <p className="text-2xl text-secondary ml-16">
          From Startup Roles to Global Careers - Lat's Build Your Future
          Together.
        </p>
      </div>
      <div>
        <div className="mx-16 mb-16">
          <Suspense fallback={<div />}> 
            <KeywordSearch />
          </Suspense>
        </div>
        <div className="bg-neutral-light-40">
          <div className="flex justify-between font-bold text-4xl text-primary px-10 w-full mb-6 pt-6">
            <i>New Jobs</i>
            <a
              href="/jobs"
              className="text-accent hover:text-primary text-xl ml-4"
            >
              See all
            </a>
          </div>
          <FeaturedJob />
        </div>
        <div className="bg-accent-20">
          <h2 className="font-bold text-4xl text-neutral-light-20 pl-10 py-6 w-full bg-primary">
            <i>Top Outstanding Industries</i>
          </h2>
          <CategoryGrid />
        </div>
      </div>
    </div>
  );
}
