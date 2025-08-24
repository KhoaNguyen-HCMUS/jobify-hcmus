"use client";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Search } from "lucide-react";

export default function RejectPendingSearch() {
  const [keyword, setKeyword] = useState("");

  return (
    <div className="flex flex-wrap justify-between">
      <div className="flex flex-wrap justify-between gap-6">
        <button className="bg-neutral-light-20 rounded-full text-primary px-8 border border-primary-20 py-2 cursor-pointer">
          <ArrowLeft size={24} />
        </button>
        <button className="bg-neutral-light-20 rounded-full text-primary px-8 border border-primary-20 py-2 cursor-pointer">
          Reject
        </button>
        <button className="bg-neutral-light-20 rounded-full text-primary px-8 border border-primary-20 py-2 cursor-pointer">
          Pending
        </button>
        <button className="bg-neutral-light-20 rounded-full text-primary px-8 border border-primary-20 py-2 cursor-pointer">
          <ArrowRight size={24} />
        </button>
      </div>
      <div className="flex flex-wrap justify-between relative">
        <input
          type="keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Enter key word..."
          className="pl-4 pr-4 py-2 w-100 bg-neutral-light-20 rounded-full border border-primary-20 text-primary-80 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all duration-300"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary cursor-pointer">
          <Search size={24} />
        </div>
      </div>
    </div>
  );
}
