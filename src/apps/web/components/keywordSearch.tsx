"use client";
import { useState } from "react";
import { Search, MapPin } from "lucide-react";

export default function KeywordSearch() {
  const [keyword, setKeyword] = useState("");
  const [address, setAddress] = useState("");

  const handleFind = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Key word: ", keyword);
    console.log("Address: ", address);
  };

  return (
    <form onSubmit={handleFind}>
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-10 mb-16 ml-14">
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
    </form>
  );
}
