"use client";
import { useState } from "react";
import { Search, MapPin } from "lucide-react";
import FeaturedJob from "../../components/job/featuredJob";
import TopCompany from "../../components/topCompany";
import CategoryGrid from "../../components/categoryGrid";

export default function HomePage() {
  const [keyword, setKeyword] = useState("");
  const [address, setAddress] = useState("");

  const handleFind = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Key word: ", keyword);
    console.log("Address: ", address);
  };

  return (
    <div className="w-full min-h-screen bg-highlight-60">
      <div className="mb-10">
        <h1 className="font-bold text-7xl ml-16 text-primary mb-10">
          Find Opportunities <br /> That Fit You Best!
        </h1>
        <p className="text-2xl text-secondary ml-16">
          From Startup Roles to Global Careers - Lat's Build Your Future
          Together.
        </p>
      </div>
      <form onSubmit={handleFind}>
        <div className="flex ml-16 mb-16">
          <div className="relative mr-10">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary">
              <Search size={24} />
            </div>
            <input
              type="keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Enter key word..."
              className="w-full pl-12 pr-4 py-4 bg-accent-20 rounded-md text-primary-80 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all duration-300"
            />
          </div>
          <div className="relative mr-10">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary">
              <MapPin size={24} />
            </div>
            <input
              id="address"
              type="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter address..."
              className="w-full pl-12 pr-4 py-4 bg-accent-20 rounded-md text-primary-80 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all duration-300"
            />
          </div>
          <div className="relative">
            <button
              type="submit"
              className="cursor-pointer absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-20 font-semibold text-2xl bg-secondary px-6 py-3.5 rounded-md"
            >
              Search
            </button>
          </div>
        </div>
        <div className="bg-neutral-light-40">
          <h2 className="font-bold text-4xl text-primary pl-10 w-full mb-6 pt-6">
            <i>New Jobs</i>
          </h2>
          <FeaturedJob />
        </div>
        <div className="bg-accent-20">
          <h2 className="font-bold text-4xl text-primary pl-10 w-full mb-6 pt-6">
            <i>Top Company</i>
          </h2>
          <TopCompany />
        </div>
        <div className="bg-accent-20">
          <h2 className="font-bold text-4xl text-neutral-light-20 pl-10 py-6 w-full bg-primary mb-6">
            <i>Top Outstanding Industries</i>
          </h2>
          <CategoryGrid />
        </div>
      </form>
    </div>
  );
}
