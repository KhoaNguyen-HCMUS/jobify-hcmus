"use client";
import { MapPin, Briefcase, Mail, Phone, Globe, Building, Users } from "lucide-react";
import CompanyInformation from "../../../components/companyInformation";
import Industry from "../../../components/industry";
import { getCompanyProfile, CompanyProfile } from "../../../services/company";
import { useState, useEffect } from "react";
import {DEFAULT_COVER_IMAGE, DEFAULT_AVATAR_IMAGE} from "../../../constants/imgConstants";

export default function RecruiterProfilePage() {
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCompanyProfile = async () => {
      try {
        const response = await getCompanyProfile();
        if (response.success && response.data?.companyProfiles) {
          setCompanyProfile(response.data.companyProfiles);
        }
      } catch (error) {
        console.error("Error loading company profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCompanyProfile();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-full  min-h-screen bg-neutral-light-60 flex justify-center items-center">
        <div className="text-primary text-lg">Loading company profile...</div>
      </div>
    );
  }

  if (!companyProfile) {
    return (
      <div className="w-full h-full min-h-screen bg-neutral-light-60 flex justify-center items-center">
        <div className="text-primary text-lg">Failed to load company profile</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full  min-h-screen bg-neutral-light-60">
      <div className="flex flex-col justify-between px-20 py-10">
        <div className="text-accent font-bold text-2xl">
          Company details
        </div>
        <div className="flex flex-col gap-4 p-4">
          <div className="flex flex-wrap gap-6">
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <b className="text-primary">Company Name:</b>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-secondary" />
                  <span className="text-primary-80">{companyProfile.company_name}</span>
                </div>
              </div>
              
              <div className="flex flex-col gap-1">
                <b className="text-primary">Tax Code:</b>
                <div className="flex items-center gap-2">
                  <Building className="w-5 h-5 text-secondary" />
                  <span className="text-primary-80">{companyProfile.tax_code}</span>
                </div>
              </div>
              
              <div className="flex flex-col gap-1">
                <b className="text-primary">Company Email:</b>
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-secondary" />
                  <span className="text-primary-80">{companyProfile.email || "N/A"}</span>
                </div>
              </div>
              
              <div className="flex flex-col gap-1">
                <b className="text-primary">Address:</b>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-secondary" />
                  <span className="text-primary-80">{companyProfile.address || "No address available"}</span>
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <b className="text-primary">Description:</b>
                <span className="text-primary-80">{companyProfile.description || "No description available"}</span>
              </div>
              
              <div className="flex flex-col gap-1">
                <b className="text-primary">Company Size:</b>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-secondary" />
                  <span className="text-primary-80">{companyProfile.size || "N/A"}</span>
                </div>
              </div>
              
              <div className="flex flex-col gap-1">
                <b className="text-primary">Industry:</b>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-secondary" />
                  <div className="flex flex-wrap gap-2">
                    {companyProfile.industry ? (
                      companyProfile.industry.split(',').map((industry, index) => (
                        <span
                          key={index}
                          className="bg-accent-20 text-primary px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {industry.trim()}
                        </span>
                      ))
                    ) : (
                      <span className="text-primary-80">No industry specified</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <b className="text-primary">Company Website:</b>
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-secondary" />
                  <span className="text-primary-80">{companyProfile.website || "N/A"}</span>
                </div>
              </div>
              
              <div className="flex flex-col gap-1">
                <b className="text-primary">Business License Number:</b>
                <div className="flex items-center gap-2">
                  <Building className="w-5 h-5 text-secondary" />
                  <span className="text-primary-80">{companyProfile.license_number}</span>
                </div>
              </div>
              
              <div className="flex flex-col gap-1">
                <b className="text-primary">Company Phone Number:</b>
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-secondary" />
                  <span className="text-primary-80">{companyProfile.phone_number || "N/A"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-8">
          <div className="flex items-center gap-2">
            <b className="text-primary">Status:</b>
            <div className="bg-accent hover:bg-primary-80 text-neutral-light-20 font-semibold rounded-2xl px-6 py-2">
              {companyProfile.status}
            </div>
          </div>
          <div className="bg-primary-80 hover:bg-accent cursor-pointer text-neutral-light-20 font-semibold rounded-2xl px-6 py-2">
            <a href="/company/profile/edit">Edit</a>
          </div>
        </div>
      </div>
    </div>
  );
}
