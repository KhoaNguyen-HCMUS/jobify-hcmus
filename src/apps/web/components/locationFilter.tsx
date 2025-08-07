"use client";
import { useState } from "react";
import { Funnel } from "lucide-react";

export default function LocationFilter() {
  const [keyword, setKeyword] = useState("");
  return (
    <div className="flex justify-between mb-5">
      <div className="relative ml-10">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary">
          <Funnel size={24} />
        </div>
        <input
          type="keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Enter key word..."
          className="pl-12 pr-4 py-4 bg-highlight-20 rounded-md text-primary-80 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all duration-300"
        />
      </div>
      <div className="flex mr-12 space-x-10 items-center">
        <button className="cursor-pointer bg-highlight-60 text-primary py-2 px-6 rounded-full font-semibold">
          Hải Phòng
        </button>
        <button className="cursor-pointer bg-highlight-60 text-primary py-2 px-6 rounded-full font-semibold">
          Hồ Chí Minh
        </button>
        <button className="cursor-pointer bg-highlight-60 text-primary py-2 px-6 rounded-full font-semibold">
          Hà Nội
        </button>
      </div>
    </div>
  );
}
