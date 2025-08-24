"use client";
import { useState } from "react";
import { Search } from "lucide-react";

export default function KeyWord() {
  const [keyword, setKeyword] = useState("");

  return (
    <div className="">
      <div className="relative w-full sm:w-96">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Enter key word..."
          className="pl-4 pr-10 py-2 w-full bg-neutral-light-20 rounded-full border border-primary-20 text-primary-80 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all duration-300"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-primary cursor-pointer">
          <Search size={24} />
        </div>
      </div>
    </div>
  );
}
