"use client";
import FeaturedJob from "../components/job/featuredJob";
import CategoryGrid from "../components/categoryGrid";
import KeywordSearch from "../components/keywordSearch";

export default function HomePage() {
  return (
    <div className="w-full min-h-screen bg-accent-40">
      <div className="mb-10">
        <h1 className="font-bold text-7xl text-primary mb-10">
          Find Opportunities <br /> That Fit You Best!
        </h1>
        <p className="text-2xl text-secondary ml-16">
          From Startup Roles to Global Careers - Lat's Build Your Future
          Together.
        </p>
      </div>
      <div>
        <KeywordSearch />
        <div className="bg-neutral-light-40">
          <h2 className="font-bold text-4xl text-primary pl-10 w-full mb-6 pt-6">
            <i>New Jobs</i>
            <a href="/jobs" className="text-accent underline hover:text-accent/80 text-xl ml-4">
              See all
            </a>
          </h2>
          <FeaturedJob />
        </div>
        <div className="bg-accent-20">
          <h2 className="font-bold text-4xl text-neutral-light-20 pl-10 py-6 w-full bg-primary mb-6">
            <i>Top Outstanding Industries</i>
          </h2>
          <CategoryGrid />
        </div>
      </div>
    </div>
  );
}
