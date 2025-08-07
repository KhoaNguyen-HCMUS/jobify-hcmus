"use client";
import { useState, useEffect } from "react";
import { Search, MapPin, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { getProvinces, Province } from "../services/location";

interface KeywordSearchProps {
  targetUrl?: string;
}

export default function KeywordSearch({ targetUrl = '/jobs' }: KeywordSearchProps) {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        setLoading(true);
        const response = await getProvinces();
        if (response.success && response.data) {
          setProvinces(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch provinces:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProvinces();
  }, []);

  const handleFind = (e: React.FormEvent) => {
    e.preventDefault();
    
    const params = new URLSearchParams();
    if (keyword.trim()) {
      params.set('keyword', keyword.trim());
    }
    if (selectedProvince) {
      params.set('location', selectedProvince);
    }
    
    const queryString = params.toString();
    const url = queryString ? `${targetUrl}?${queryString}` : targetUrl;
    router.push(url);
  };

  const handleProvinceSelect = (province: Province) => {
    setSelectedProvince(province.name);
    setIsDropdownOpen(false);
  };

  return (
    <form onSubmit={handleFind}>
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
        <div className="relative mr-10">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary">
            <Search size={24} />
          </div>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Enter keyword..."
            className="w-full pl-12 pr-4 py-4 bg-accent-20 rounded-md text-primary-80 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all duration-300"
          />
        </div>
        
        <div className="relative mr-10">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary">
            <MapPin size={24} />
          </div>
          <div 
            className="w-full pl-12 pr-4 py-4 bg-accent-20 rounded-md text-primary-80 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all duration-300 cursor-pointer flex justify-between items-center"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span className={selectedProvince ? "text-primary" : "text-primary-80"}>
              {selectedProvince || "Select location..."}
            </span>
            <ChevronDown size={20} className="text-primary" />
          </div>
          
          {isDropdownOpen && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto z-10">
              {loading ? (
                <div className="p-4 text-center text-gray-500">Loading...</div>
              ) : (
                <>
                  <div 
                    className="p-3 hover:bg-gray-100 cursor-pointer border-b"
                    onClick={() => setSelectedProvince("All locations")}
                  >
                    All locations
                  </div>
                  {provinces.map((province) => (
                    <div 
                      key={province.code}
                      className="p-3 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleProvinceSelect(province)}
                    >
                      {province.name}
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
        
        <div className="relative">
          <button
            type="submit"
            className="cursor-pointer absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-20 font-semibold text-2xl bg-secondary px-6 py-3.5 rounded-md hover:bg-secondary/90 transition-colors"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
}
