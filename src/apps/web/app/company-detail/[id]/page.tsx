"use client";
import { MapPin, Search, Unlink2, Users } from "lucide-react";
import GoBack from "../../../components/goBack";
import { useState, useEffect } from "react";
import JobCard from "../../../components/job/jobCard";
import usePagination from "../../../hooks/usePagination";
import Pagination from "../../../components/pagination";
import { CompanyProfile } from "../../../services/companyProfile";
import { Job, getAllJobs } from "../../../services/jobs";
import { getProvinces, Province } from "../../../services/location";
import { useParams, useRouter } from "next/navigation";
import { toast } from 'react-toastify';

interface CompanyDetailResponse {
  success: boolean;
  message: string;
  data?: CompanyProfile;
}

const getCompanyById = async (id: string): Promise<CompanyDetailResponse> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/company/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();
    return result;
  } catch (error) {
    return {
      success: false,
      message: 'Network connection error',
    };
  }
};

const transformJobForCard = (job: Job) => ({
  id: job.id,
  title: job.title,
  company_name: job.company_name || null,
  salary_min: job.salary_min,
  salary_max: job.salary_max,
  currency: job.currency,
  province: job.province,
  logo: "/logo.png", 
  name: job.title, 
  status: job.status,
  created_at: new Date(job.created_at),
});

export default function CompanyDetailPage() {
  const [company, setCompany] = useState<CompanyProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [companyJobs, setCompanyJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { id } = useParams();
  const router = useRouter();

  const [keyword, setKeyword] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        setLoading(true);
        const response = await getCompanyById(id as string);
        if (response.success && response.data) {
          setCompany(response.data);
        } else {
          toast.error(response.message || 'Unable to load company details');
        }
      } catch (error) {
        toast.error('Error loading company details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCompany();
    }
  }, [id]);

  useEffect(() => {
    const fetchCompanyJobs = async () => {
      try {
        setJobsLoading(true);
        const response = await getAllJobs();
        if (response.success && response.data) {
          // Filter jobs by company ID
          const filteredJobs = response.data.filter(job => job.company_id === id);
          const sortedJobs = filteredJobs.sort((a, b) => 
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
          setCompanyJobs(sortedJobs);
          setFilteredJobs(sortedJobs);
        } else {
          toast.error(response.message || 'Failed to fetch jobs');
        }
      } catch (error) {
        toast.error('Error loading company jobs');
      } finally {
        setJobsLoading(false);
      }
    };

    if (id) {
      fetchCompanyJobs();
    }
  }, [id]);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await getProvinces();
        if (response.success && response.data) {
          setProvinces(response.data);
        }
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    };

    fetchProvinces();
  }, []);

  useEffect(() => {
    // Filter jobs based on keyword and location
    let filtered = companyJobs;

    if (keyword.trim()) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(keyword.toLowerCase()) ||
        job.description?.toLowerCase().includes(keyword.toLowerCase()) ||
        job.skills?.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    if (selectedProvince) {
      filtered = filtered.filter(job =>
        job.province === selectedProvince
      );
    }

    setFilteredJobs(filtered);
  }, [companyJobs, keyword, selectedProvince]);

  const { page, maxPage, current, next, prev } = usePagination(filteredJobs, 6);

  const handleFind = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled by useEffect above
    console.log("Searching with keyword:", keyword, "and location:", selectedProvince);
  };

  const handleProvinceSelect = (provinceName: string) => {
    setSelectedProvince(provinceName);
    setIsDropdownOpen(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-primary text-xl">Loading...</div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-primary text-xl">Company not found</div>
      </div>
    );
  }

  return (
    <div className="mx-10">
      <GoBack />
      <div className="rounded-3xl shadow-md mx-10 mt-6">
        <div className="flex flex-col">
          <div className="relative w-full h-72">
            <img
              src={company.cover_url || "/cover.jpg"}
              alt="coverImage"
              className="w-full h-full object-cover rounded-t-3xl"
            />
            <img
              src={company.logo_url || "/avt.jpg"}
              alt="logo"
              className="absolute object-contain top-60 left-20 w-30 rounded-3xl"
            />
          </div>
          <div className="bg-highlight-40 rounded-b-3xl">
            <div className="flex flex-col ml-60 mt-6 mb-10 space-y-6">
              <span className="text-primary text-2xl font-semibold">
                {company.company_name}
              </span>
              <div className="flex flex-wrap gap-10">
                {company.website && (
                  <div className="flex gap-2">
                    <Unlink2 className="text-primary" />
                    <a href={company.website} className="text-primary">
                      {company.website}
                    </a>
                  </div>
                )}
                {company.size && (
                  <div className="flex gap-2">
                    <Users className="text-primary" />
                    <span className="text-primary">{company.size} employees</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap m-10 gap-20">
        <div className="flex-2 shadow-md rounded-3xl bg-neutral-light-20 space-y-4">
          <div className="flex flex-col space-y-4">
            <span className="w-full rounded-t-3xl text-background font-semibold text-2xl px-6 py-4 bg-secondary">
              Company Introduction
            </span>
            <p className="text-primary px-6 mb-4">
              {company.description || "No description available"}
            </p>
          </div>
        </div>
        <div className="flex-1 shadow-md rounded-3xl bg-neutral-light-20 space-y-4">
          <div className="flex flex-col space-y-4">
            <span className="w-full rounded-t-3xl text-background font-semibold text-2xl px-6 py-4 bg-secondary">
              Contact Information
            </span>
            <span className="flex px-6">
              <MapPin className="text-primary font-semibold" />
              <p className="text-primary font-semibold">Địa chỉ công ty</p>
            </span>
            <p className="text-primary px-6 mb-4">{company.address || "No address available"}</p>
          </div>
        </div>
      </div>
    <div className="mx-10 mb-20">
  <div className="shadow-md rounded-3xl bg-neutral-light-20 space-y-4">
    <div className="flex flex-col items-center space-y-4">
      <span className="w-full rounded-t-3xl text-background font-semibold text-2xl px-6 py-4 bg-secondary">
        Job News
      </span>
      <div className="flex flex-col mt-6 w-full">
        <div className="flex items-center">
          <form onSubmit={handleFind} className="w-full">
            <div className="w-full px-14 relative">
                             <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
                 {/* Search Input */}
                 <div className="relative h-[60px]">
                   <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary z-10">
                     <Search size={24} />
                   </div>
                   <input
                     type="text"
                     value={keyword}
                     onChange={(e) => setKeyword(e.target.value)}
                     placeholder="Enter key word..."
                     className="w-full h-full pl-12 pr-4 bg-accent-20 rounded-md text-primary-80 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all duration-300"
                   />
                 </div>

                 {/* Location Input */}
                 <div className="relative h-[60px]">
                   <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary z-20">
                     <MapPin size={24} />
                   </div>
                   <input
                     type="text"
                     value={selectedProvince}
                     onChange={(e) => setSelectedProvince(e.target.value)}
                     onFocus={() => setIsDropdownOpen(true)}
                     onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                     placeholder="Select location..."
                     className="w-full h-full pl-12 pr-4 bg-accent-20 rounded-md text-primary-80 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all duration-300"
                   />
                   
                   {/* Dropdown */}
                   {isDropdownOpen && (
                     <div className="absolute z-30 w-full top-full mt-1">
                       <div className="bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                         <div
                           className="px-4 py-2 cursor-pointer hover:bg-gray-100 transition-colors"
                           onClick={() => handleProvinceSelect("")}
                         >
                           All locations
                         </div>
                         {provinces.map((province) => (
                           <div
                             key={province.code}
                             className="px-4 py-2 cursor-pointer hover:bg-gray-100 transition-colors"
                             onClick={() => handleProvinceSelect(province.name)}
                           >
                             {province.name}
                           </div>
                         ))}
                       </div>
                     </div>
                   )}
                 </div>

                 {/* Search Button */}
                 <div className="relative h-[60px]">
                   <button
                     type="submit"
                     className="w-full h-full bg-secondary text-secondary-20 font-semibold text-xl rounded-md cursor-pointer transition-all duration-300 hover:bg-secondary/90"
                   >
                     Search
                   </button>
                 </div>
               </div>
            </div>
          </form>
        </div>
        
        {/* Job Results */}
        <div className="mx-7">
          {jobsLoading ? (
            <div className="flex justify-center items-center h-32">
              <div className="text-primary text-lg">Loading jobs...</div>
            </div>
          ) : filteredJobs.length > 0 ? (
            <>
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-10">
                {current.map((job) => (
                  <JobCard key={job.id} job={transformJobForCard(job)} />
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
            </>
          ) : (
            <div className="text-center py-16">
              <div className="text-xl text-gray-600">
                No jobs available
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
</div>
    </div>
  );
}
