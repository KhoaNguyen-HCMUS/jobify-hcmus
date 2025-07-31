"use client";
import { useState } from "react";
import { Funnel } from "lucide-react";

interface LocationFilterProps {
  onSelectProvince: (province: string) => void;
  onKeywordChange: (keyword: string) => void;
}

export default function LocationFilter({
  onSelectProvince,
  onKeywordChange,
}: LocationFilterProps) {
  const [keyword, setKeyword] = useState("");

  const handleSelect = (province: string) => {
    onSelectProvince(province);
  };

  return (
    <div className="flex justify-between mb-5">
      <div className="relative ml-10">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary">
          <Funnel size={24} />
        </div>
        <input
          type="text"
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
            onKeywordChange(e.target.value);
          }}
          placeholder="Enter key word..."
          className="pl-12 pr-4 py-4 bg-highlight-20 rounded-md text-primary-80 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all duration-300"
        />
      </div>
      <div className="flex mr-12 space-x-10 items-center">
        {["Hải Phòng", "Hồ Chí Minh", "Hà Nội"].map((province) => (
          <button
            key={province}
            onClick={() => handleSelect(province)}
            className="cursor-pointer bg-highlight-60 hover:bg-highlight text-primary py-2 px-6 rounded-full font-semibold"
          >
            {province}
          </button>
        ))}
        <button
          onClick={() => {
            onSelectProvince("");
            onKeywordChange("");
          }}
          className="cursor-pointer bg-highlight-60 hover:bg-highlight text-primary py-2 px-6 rounded-full font-semibold"
        >
          Tất cả
        </button>
      </div>
    </div>
  );
}
