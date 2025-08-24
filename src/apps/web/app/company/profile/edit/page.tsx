"use client";
import { useState, useEffect } from "react";
import {
  MapPin,
  Briefcase,
  Globe,
  Building,
  Barcode,
  Phone,
  Mail,
  Users,
  Calendar,
  ChevronDown,
  X,
} from "lucide-react";
import {
  getCompanyProfile,
  updateCompanyProfile,
  CompanyProfile,
  UpdateCompanyData,
} from "../../../../services/companyProfile";
import {
  getAllIndustries,
  Industry,
  getIndustriesByCategory,
  IndustryCategory,
} from "../../../../services/industries";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../../../../components/ProtectedRoute";

function RecruiterProfileEditContent() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile | null>(
    null
  );

  const [companyName, setCompanyName] = useState("");
  const [website, setWebsite] = useState("");
  const [taxCode, setTaxCode] = useState("");
  const [businessLicenseNumber, setBusinessLicenseNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [industry, setIndustry] = useState("");
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [size, setSize] = useState("");
  const [foundedYear, setFoundedYear] = useState("");

  // Industry data
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [industryCategories, setIndustryCategories] = useState<
    IndustryCategory[]
  >([]);
  const [showIndustryDropdown, setShowIndustryDropdown] = useState(false);
  const [industrySearchTerm, setIndustrySearchTerm] = useState("");

  useEffect(() => {
    const loadCompanyProfile = async () => {
      try {
        setLoading(true);
        const response = await getCompanyProfile();
        if (response.success && response.data?.companyProfiles) {
          const profile = response.data.companyProfiles;
          setCompanyProfile(profile);

          setCompanyName(profile.company_name || "");
          setWebsite(profile.website || "");
          setTaxCode(profile.tax_code || "");
          setBusinessLicenseNumber(profile.license_number || "");
          setPhoneNumber(profile.phone_number || "");
          setEmail(profile.email || "");
          setDescription(profile.description || "");
          setAddress(profile.address || "");
          setIndustry(profile.industry || "");
          // Parse industries from string to array if they exist
          if (profile.industry) {
            const industriesArray = profile.industry
              .split(",")
              .map((ind) => ind.trim())
              .filter((ind) => ind);
            setSelectedIndustries(industriesArray);
          }
          setSize(profile.size || "");
          setFoundedYear(
            profile.founded_year ? profile.founded_year.toString() : ""
          );
        } else {
          toast.error(response.message || "Failed to load company profile");
        }
      } catch (error) {
        toast.error("Error loading company profile");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchIndustries = async () => {
      try {
        const response = await getAllIndustries();
        if (response.success && response.data) {
          setIndustries(response.data);
          const categories = getIndustriesByCategory(response.data);
          setIndustryCategories(categories);
        }
      } catch (error) {
        console.error("Error fetching industries:", error);
      }
    };

    loadCompanyProfile();
    fetchIndustries();
  }, []);

  const handleIndustryToggle = (industryName: string) => {
    setSelectedIndustries((prev) => {
      if (prev.includes(industryName)) {
        return prev.filter((ind) => ind !== industryName);
      } else {
        return [...prev, industryName];
      }
    });
  };

  const removeIndustry = (industryName: string) => {
    setSelectedIndustries((prev) => prev.filter((ind) => ind !== industryName));
  };

  const filteredIndustries = industries.filter((industry) =>
    industry.name.toLowerCase().includes(industrySearchTerm.toLowerCase())
  );

  const filteredCategories = industrySearchTerm
    ? industryCategories
        .map((category) => ({
          ...category,
          children: category.children.filter((industry) =>
            industry.name
              .toLowerCase()
              .includes(industrySearchTerm.toLowerCase())
          ),
        }))
        .filter((category) => category.children.length > 0)
    : industryCategories;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(".industry-dropdown")) {
        setShowIndustryDropdown(false);
        setIndustrySearchTerm(""); // Clear search when dropdown closes
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = async () => {
    try {
      setSaving(true);

      const updateData: UpdateCompanyData = {
        company_name: companyName.trim() || undefined,
        website: website.trim() || undefined,
        tax_code: taxCode.trim() || undefined,
        license_number: businessLicenseNumber.trim() || undefined,
        phone_number: phoneNumber.trim() || undefined,
        email: email.trim() || undefined,
        description: description.trim() || undefined,
        address: address.trim() || undefined,
        industry:
          selectedIndustries.length > 0
            ? selectedIndustries.join(", ")
            : undefined,
        size: size.trim() || undefined,
        founded_year: foundedYear ? parseInt(foundedYear) : undefined,
      };

      Object.keys(updateData).forEach((key) => {
        if (updateData[key as keyof UpdateCompanyData] === undefined) {
          delete updateData[key as keyof UpdateCompanyData];
        }
      });

      const response = await updateCompanyProfile(updateData);

      if (response.success) {
        toast.success("Company profile updated successfully!");
        router.push("/company/profile");
      } else {
        toast.error(response.message || "Failed to update company profile");
      }
    } catch (error) {
      toast.error("Error updating company profile");
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-full min-h-screen bg-neutral-light-60 flex items-center justify-center">
        <div className="text-primary text-xl">Loading company profile...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-screen bg-neutral-light-60">
      <div className="flex flex-col justify-between px-20 py-10 space-y-4">
        <div className="text-accent font-bold text-2xl">
          Edit Company Information
        </div>
        <div className="flex flex-col gap-4 p-4">
          <div className="flex flex-wrap">
            <div className="flex-1 flex flex-col gap-2 px-4">
              <div className="flex flex-col">
                <label
                  htmlFor="companyName"
                  className="block text-lg font-bold text-primary ml-4"
                >
                  Company Name*:
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary">
                    <Building size={18} />
                  </div>
                  <input
                    id="companyName"
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Enter company name"
                    className="w-full border border-primary-60 pl-12 pr-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-1 focus:bg-white transition-all duration-300"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="taxCode"
                  className="block text-lg font-bold text-primary ml-4"
                >
                  Tax Code*:
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary">
                    <Barcode size={18} />
                  </div>
                  <input
                    id="taxCode"
                    type="text"
                    value={taxCode}
                    onChange={(e) => setTaxCode(e.target.value)}
                    placeholder="Enter tax code"
                    className="w-full border border-primary-60 pl-12 pr-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-1 focus:bg-white transition-all duration-300"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="phoneNumber"
                  className="block text-lg font-bold text-primary ml-4"
                >
                  Phone Number:
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary">
                    <Phone size={18} />
                  </div>
                  <input
                    id="phoneNumber"
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter phone number"
                    className="w-full border border-primary-60 pl-12 pr-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-1 focus:bg-white transition-all duration-300"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="block text-lg font-bold text-primary ml-4"
                >
                  Email:
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary">
                    <Mail size={18} />
                  </div>
                  <div className="w-full  pl-12 pr-4 py-2 rounded-xl text-primary">
                    {email || "No email available"}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex flex-col px-4">
                <label
                  htmlFor="website"
                  className="block text-lg font-bold text-primary ml-4"
                >
                  Company Website:
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary">
                    <Globe size={18} />
                  </div>
                  <input
                    id="website"
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="Enter website URL"
                    className="w-full border border-primary-60 pl-12 pr-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-1 focus:bg-white transition-all duration-300"
                  />
                </div>
              </div>
              <div className="flex flex-col px-4">
                <label
                  htmlFor="businessLicenseNumber"
                  className="block text-lg font-bold text-primary ml-4"
                >
                  Business License Number*:
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary">
                    <Barcode size={18} />
                  </div>
                  <input
                    id="businessLicenseNumber"
                    type="text"
                    value={businessLicenseNumber}
                    onChange={(e) => setBusinessLicenseNumber(e.target.value)}
                    placeholder="Enter business license number"
                    className="w-full border border-primary-60 pl-12 pr-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-1 focus:bg-white transition-all duration-300"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col px-4">
                <label
                  htmlFor="size"
                  className="block text-lg font-bold text-primary ml-4"
                >
                  Company Size:
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary">
                    <Users size={18} />
                  </div>
                  <input
                    id="size"
                    type="text"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    placeholder="Enter company size (e.g., 50-100 employees)"
                    className="w-full border border-primary-60 pl-12 pr-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-1 focus:bg-white transition-all duration-300"
                  />
                </div>
              </div>
              <div className="flex flex-col px-4">
                <label
                  htmlFor="foundedYear"
                  className="block text-lg font-bold text-primary ml-4"
                >
                  Founded Year:
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary">
                    <Calendar size={18} />
                  </div>
                  <input
                    id="foundedYear"
                    type="number"
                    value={foundedYear}
                    onChange={(e) => setFoundedYear(e.target.value)}
                    placeholder="Enter founded year"
                    min="1900"
                    max={new Date().getFullYear()}
                    className="w-full border border-primary-60 pl-12 pr-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-1 focus:bg-white transition-all duration-300"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 px-4">
            <label
              htmlFor="address"
              className="block text-lg font-bold text-primary ml-4"
            >
              Address:
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary">
                <MapPin size={18} />
              </div>
              <input
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter company address"
                className="w-full border border-primary-60 pl-12 pr-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-1 focus:bg-white transition-all duration-300"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 px-4">
            <label
              htmlFor="industry"
              className="block text-lg font-bold text-primary ml-4"
            >
              Industry:
            </label>
            <div className="relative industry-dropdown z-100">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary z-10">
                <Briefcase size={18} />
              </div>
              <div className="relative">
                <div
                  className="w-full border border-primary-60 pl-12 pr-10 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-1 focus:primary focus:bg-white transition-all duration-300 cursor-pointer min-h-[42px] flex items-center"
                  onClick={() => {
                    setShowIndustryDropdown(!showIndustryDropdown);
                    if (!showIndustryDropdown) {
                      // Auto-focus search input when dropdown opens
                      setTimeout(() => {
                        const searchInput = document.querySelector(
                          ".industry-search-input"
                        ) as HTMLInputElement;
                        if (searchInput) {
                          searchInput.focus();
                        }
                      }, 100);
                    }
                  }}
                >
                  <div className="flex flex-wrap gap-1 flex-1">
                    {selectedIndustries.length > 0 ? (
                      selectedIndustries.map((industryName, index) => (
                        <span
                          key={index}
                          className="bg-primary-20 text-primary px-2 py-1 rounded-lg text-sm flex items-center gap-1"
                        >
                          {industryName}
                          <X
                            size={14}
                            className="cursor-pointer hover:text-accent"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeIndustry(industryName);
                            }}
                          />
                        </span>
                      ))
                    ) : (
                      <span className="text-primary-60">Select industries</span>
                    )}
                  </div>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-primary cursor-pointer">
                    <ChevronDown size={18} />
                  </div>
                </div>
              </div>
              {showIndustryDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-primary-60 rounded-xl max-h-60 overflow-hidden">
                  {/* Search Input */}
                  <div className="p-3 border-b border-primary-20">
                    <input
                      type="text"
                      placeholder="Search industries..."
                      value={industrySearchTerm}
                      onChange={(e) => setIndustrySearchTerm(e.target.value)}
                      onKeyDown={(e) => {
                        if (
                          e.key === "Enter" &&
                          filteredIndustries.length > 0
                        ) {
                          e.preventDefault();
                          const firstIndustry = filteredIndustries.sort(
                            (a, b) => a.name.localeCompare(b.name)
                          )[0];
                          handleIndustryToggle(firstIndustry.name);
                          setIndustrySearchTerm("");
                        }
                      }}
                      className="industry-search-input w-full px-3 py-2 border border-primary-40 rounded-lg text-primary-80 outline-none focus:ring-1 focus:ring-accent focus:border-accent"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  {/* Industry List */}
                  <div className="max-h-48 overflow-y-auto">
                    {industrySearchTerm ? (
                      // Show flat filtered list when searching
                      filteredIndustries.length > 0 ? (
                        filteredIndustries
                          .sort((a, b) => a.name.localeCompare(b.name))
                          .map((industry) => (
                            <div
                              key={industry.id}
                              className={`px-4 py-2 hover:bg-neutral-light-80 cursor-pointer text-primary-80 flex items-center gap-2 ${
                                selectedIndustries.includes(industry.name)
                                  ? "bg-primary-20"
                                  : ""
                              }`}
                              onClick={() =>
                                handleIndustryToggle(industry.name)
                              }
                            >
                              <input
                                type="checkbox"
                                checked={selectedIndustries.includes(
                                  industry.name
                                )}
                                onChange={() => {}}
                                className="w-4 h-4 text-accent bg-gray-100 border-gray-300 rounded focus:ring-accent"
                              />
                              <span className="flex-1">{industry.name}</span>
                            </div>
                          ))
                      ) : (
                        <div className="px-4 py-2 text-primary-60 text-center">
                          No industries found
                        </div>
                      )
                    ) : // Show categorized list when not searching
                    filteredCategories.length > 0 ? (
                      filteredCategories.map((category) => (
                        <div key={category.id}>
                          {/* Category Header */}
                          <div className="px-4 py-2 bg-neutral-light-40 text-primary font-semibold text-sm border-b border-primary-20">
                            {category.name}
                          </div>
                          {/* Category Children */}
                          {category.children.map((industry) => (
                            <div
                              key={industry.id}
                              className={`px-6 py-2 hover:bg-neutral-light-80 cursor-pointer text-primary-80 flex items-center gap-2 ${
                                selectedIndustries.includes(industry.name)
                                  ? "bg-primary-20"
                                  : ""
                              }`}
                              onClick={() =>
                                handleIndustryToggle(industry.name)
                              }
                            >
                              <input
                                type="checkbox"
                                checked={selectedIndustries.includes(
                                  industry.name
                                )}
                                onChange={() => {}}
                                className="w-4 h-4 text-accent bg-gray-100 border-gray-300 rounded focus:ring-accent"
                              />
                              <span className="flex-1">{industry.name}</span>
                            </div>
                          ))}
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-primary-60 text-center">
                        No industries available
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2 px-4">
            <label
              htmlFor="description"
              className="block text-lg font-bold text-primary ml-4"
            >
              Description:
            </label>
            <div className="relative">
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter company description"
                className="w-full border border-primary-60 pl-4 pr-4 py-2 h-40 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-1 focus:bg-white transition-all duration-300 resize-none"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => router.push("/company/profile")}
            className="hover:bg-accent hover:text-neutral-light-60 cursor-pointer text-accent border border-accent font-semibold rounded-2xl px-6 py-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="bg-accent hover:text-accent hover:bg-neutral-light-60 cursor-pointer border border-accent text-neutral-light-20 font-semibold rounded-2xl px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function RecruiterProfileEditPage() {
  return (
    <ProtectedRoute allowedRoles={["company"]}>
      <RecruiterProfileEditContent />
    </ProtectedRoute>
  );
}
