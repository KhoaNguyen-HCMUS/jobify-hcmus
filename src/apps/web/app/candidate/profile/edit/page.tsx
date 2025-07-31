"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  VenusAndMars,
  Phone,
  MapPin,
  Briefcase,
  CatIcon,
  StarHalf,
  Globe,
  Calendar,
  ChevronDown,
} from "lucide-react";
import { getProfile, updateProfile, Profile, Experience, Education, UpdateProfileData } from "../../../../services/profile";
import { getProvinces, getDistrictsByProvince, Province, District } from "../../../../services/location";
import { toast } from "react-toastify";
import ProtectedRoute from "../../../../components/ProtectedRoute";
import WorkExperience from "../../../../components/workExperience";
import EducationComponent from "../../../../components/education";
import { formatDateForInput } from "../../../../utils/dateUtils";

function CandidateProfileEditContent() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);

  // Basic profile fields
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [province, setProvince] = useState("");
  const [ward, setWard] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [industry, setIndustry] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [website, setWebsite] = useState("");
  const [skills, setSkills] = useState("");

  // Experience and Education arrays
  const [experiences, setExperiences] = useState<Partial<Experience>[]>([]);
  const [educations, setEducations] = useState<Partial<Education>[]>([]);

  // Location data
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [selectedProvinceCode, setSelectedProvinceCode] = useState<number | null>(null);
  const [showProvinceDropdown, setShowProvinceDropdown] = useState(false);
  const [showDistrictDropdown, setShowDistrictDropdown] = useState(false);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await getProfile();
      if (response.success && response.data) {
        const profileData = response.data;
        setProfile(profileData);
        
        // Set basic fields
        setFullName(profileData.full_name || "");
        setGender(profileData.gender || "");
                 setDateOfBirth(formatDateForInput(profileData.date_of_birth));
        setPhone(profileData.phone || "");
        setBio(profileData.bio || "");
        setProvince(profileData.province || "");
        setWard(profileData.ward || "");
        setAddressDetail(profileData.address_detail || "");
        setIndustry(profileData.industry || "");
        setGithubUrl(profileData.github_url || "");
        setLinkedinUrl(profileData.linkedin_url || "");
        setWebsite(profileData.website || "");
        setSkills(profileData.skills || "");
        
        // Set experiences and educations
        setExperiences(profileData.experiences || []);
        setEducations(profileData.educations || []);
      } else {
        toast.error(response.message || 'Failed to load profile');
      }
    } catch (error) {
      toast.error('Error loading profile data');
    } finally {
      setLoading(false);
    }
  };

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

  const fetchDistricts = async () => {
    if (!selectedProvinceCode) {
      setDistricts([]);
      return;
    }
    try {
      const response = await getDistrictsByProvince(selectedProvinceCode);
      if (response.success && response.data) {
        setDistricts(response.data);
      }
    } catch (error) {
      console.error('Error fetching districts:', error);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchProvinces();
  }, []);

  useEffect(() => {
    if (selectedProvinceCode) {
      fetchDistricts();
    }
  }, [selectedProvinceCode]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.province-dropdown')) {
        setShowProvinceDropdown(false);
      }
      if (!target.closest('.district-dropdown')) {
        setShowDistrictDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);



  const handleSubmit = async () => {
    try {
      setSaving(true);
      
      if (!profile) {
        toast.error('No profile data available');
        return;
      }

      const updateData: UpdateProfileData = {
        full_name: fullName.trim() || undefined,
        gender: gender.trim() || undefined,
        date_of_birth: dateOfBirth || undefined,
        phone: phone.trim() || undefined,
        bio: bio.trim() || undefined,
        province: province.trim() || undefined,
        ward: ward.trim() || undefined,
        address_detail: addressDetail.trim() || undefined,
        industry: industry.trim() || undefined,
        github_url: githubUrl.trim() || undefined,
        linkedin_url: linkedinUrl.trim() || undefined,
        website: website.trim() || undefined,
        skills: skills.trim() || undefined,
      };

      if (experiences.length > 0) {
        updateData.experiences = experiences.map(exp => ({
          company_name: exp.company_name?.trim() || undefined,
          job_title: exp.job_title?.trim() || undefined,
          description: exp.description?.trim() || undefined,
          location: exp.location?.trim() || undefined,
          start_date: exp.start_date || undefined,
          end_date: exp.end_date || undefined,
          is_current: exp.is_current
        })).filter(exp => 
          exp.company_name || exp.job_title || exp.description || 
          exp.location || exp.start_date || exp.end_date
        );
      }

      if (educations.length > 0) {
        updateData.educations = educations.map(edu => ({
          institution: edu.institution?.trim() || undefined,
          degree: edu.degree?.trim() || undefined,
          field_of_study: edu.field_of_study?.trim() || undefined,
          grade: edu.grade?.trim() || undefined,
          description: edu.description?.trim() || undefined,
          start_date: edu.start_date || undefined,
          end_date: edu.end_date || undefined
        })).filter(edu => 
          edu.institution || edu.degree || edu.field_of_study || 
          edu.grade || edu.description || edu.start_date || edu.end_date
        );
      }

      Object.keys(updateData).forEach(key => {
        if (updateData[key as keyof UpdateProfileData] === undefined) {
          delete updateData[key as keyof UpdateProfileData];
        }
      });

      console.log('Sending update data:', updateData);

      const response = await updateProfile(updateData);
      
      if (response.success) {
        toast.success('Profile updated successfully!');
        router.push('/candidate/profile');
      } else {
        toast.error(response.message || 'Failed to update profile');
        console.log(response);
      }
    } catch (error) {
      toast.error('Error updating profile');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-full bg-neutral-light-60 flex items-center justify-center">
        <div className="text-primary text-xl">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-neutral-light-60">
      <div className="flex flex-col justify-between px-20 py-10 space-y-4">
        <div className="text-accent font-bold text-2xl">
          Edit Personal Information
        </div>
        <div className="flex flex-col gap-4 p-4">
          <div className="flex flex-wrap">
            <div className="flex-1 flex flex-col gap-2 px-4">
              <div className="flex flex-col">
                <label
                  htmlFor="fullName"
                  className="block text-sm font-bold text-primary ml-4"
                >
                  Full Name*:
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary">
                    <User size={18} />
                  </div>
                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full border border-primary-60 pl-12 pr-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-1 focus:primary focus:bg-white transition-all duration-300"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="dateOfBirth"
                  className="block text-sm font-bold text-primary ml-4"
                >
                  Date of Birth:
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary">
                    <Calendar size={18} />
                  </div>
                  <input
                    id="dateOfBirth"
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="w-full border border-primary-60 pl-12 pr-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-1 focus:primary focus:bg-white transition-all duration-300"
                  />
                </div>
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex flex-col px-4">
                <label
                  htmlFor="gender"
                  className="block text-sm font-bold text-primary ml-4"
                >
                  Gender*:
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary">
                    <VenusAndMars size={18} />
                  </div>
                  <input
                    id="gender"
                    type="text"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    placeholder="Enter your gender"
                    className="w-full border border-primary-60 pl-12 pr-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-1 focus:primary focus:bg-white transition-all duration-300"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col px-4">
                <label
                  htmlFor="phone"
                  className="block text-sm font-bold text-primary ml-4"
                >
                  Phone Number*:
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary">
                    <Phone size={18} />
                  </div>
                  <input
                    id="phone"
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone number"
                    className="w-full border border-primary-60 pl-12 pr-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-1 focus:primary focus:bg-white transition-all duration-300"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 px-4">
            <label
              htmlFor="bio"
              className="block text-sm font-bold text-primary ml-4"
            >
              Introduce yourself:
            </label>
            <div className="relative">
              <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Enter your self-introduction"
                className="w-full border border-primary-60 pl-4 pr-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-1 focus:primary focus:bg-white transition-all duration-300 min-h-[80px] resize-none"
                required
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-4 px-4">
            <div className="flex-1 flex flex-col gap-2">
              <label
                htmlFor="province"
                className="block text-sm font-bold text-primary ml-4"
              >
                Province:
              </label>
              <div className="relative province-dropdown">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary">
                  <MapPin size={18} />
                </div>
                <div className="relative">
                  <input
                    id="province"
                    type="text"
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    placeholder="Select province"
                    className="w-full border border-primary-60 pl-12 pr-10 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-1 focus:primary focus:bg-white transition-all duration-300 cursor-pointer"
                    onClick={() => setShowProvinceDropdown(!showProvinceDropdown)}
                    readOnly
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-primary cursor-pointer">
                    <ChevronDown size={18} />
                  </div>
                </div>
                {showProvinceDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-primary-60 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                    {provinces
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((prov) => (
                      <div
                        key={prov.code}
                        className="px-4 py-2 hover:bg-neutral-light-80 cursor-pointer text-primary-80"
                        onClick={() => {
                          setProvince(prov.name);
                          setSelectedProvinceCode(prov.code);
                          setShowProvinceDropdown(false);
                          setWard(""); // Clear district when province changes
                        }}
                      >
                        {prov.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <label
                htmlFor="ward"
                className="block text-sm font-bold text-primary ml-4"
              >
                District:
              </label>
              <div className="relative district-dropdown">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary">
                  <MapPin size={18} />
                </div>
                <div className="relative">
                  <input
                    id="ward"
                    type="text"
                    value={ward}
                    onChange={(e) => setWard(e.target.value)}
                    placeholder="Select district"
                    className="w-full border border-primary-60 pl-12 pr-10 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-1 focus:primary focus:bg-white transition-all duration-300 cursor-pointer"
                    onClick={() => setShowDistrictDropdown(!showDistrictDropdown)}
                    readOnly
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-primary cursor-pointer">
                    <ChevronDown size={18} />
                  </div>
                </div>
                                 {showDistrictDropdown && (
                   <div className="absolute z-10 w-full mt-1 bg-white border border-primary-60 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                     {districts
                       .sort((a, b) => a.name.localeCompare(b.name))
                       .map((district) => (
                       <div
                         key={district.code}
                         className="px-4 py-2 hover:bg-neutral-light-80 cursor-pointer text-primary-80"
                         onClick={() => {
                           setWard(district.name);
                           setShowDistrictDropdown(false);
                         }}
                       >
                         {district.name}
                       </div>
                     ))}
                   </div>
                 )}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 px-4">
            <label
              htmlFor="addressDetail"
              className="block text-sm font-bold text-primary ml-4"
            >
              Address Detail:
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary">
                <MapPin size={18} />
              </div>
              <input
                id="addressDetail"
                type="text"
                value={addressDetail}
                onChange={(e) => setAddressDetail(e.target.value)}
                placeholder="Enter your address detail"
                className="w-full border border-primary-60 pl-12 pr-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-1 focus:primary focus:bg-white transition-all duration-300"
              />
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="flex-1 flex flex-col gap-2 px-4">
              <div className="flex flex-col">
                <label
                  htmlFor="industry"
                  className="block text-sm font-bold text-primary ml-4"
                >
                  Industry:
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary">
                    <Briefcase size={18} />
                  </div>
                  <input
                    id="industry"
                    type="text"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    placeholder="Enter your industry"
                    className="w-full border border-primary-60 pl-12 pr-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-1 focus:primary focus:bg-white transition-all duration-300"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="githubUrl"
                  className="block text-sm font-bold text-primary ml-4"
                >
                  Github:
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary">
                    <CatIcon size={18} />
                  </div>
                  <input
                    id="githubUrl"
                    type="text"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="Enter your Github URL"
                    className="w-full border border-primary-60 pl-12 pr-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-1 focus:primary focus:bg-white transition-all duration-300"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="skills"
                  className="block text-sm font-bold text-primary ml-4"
                >
                  Skills:
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary">
                    <Briefcase size={18} />
                  </div>
                  <input
                    id="skills"
                    type="text"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    placeholder="Enter your skills (comma separated)"
                    className="w-full border border-primary-60 pl-12 pr-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-1 focus:primary focus:bg-white transition-all duration-300"
                  />
                </div>
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-2 px-4">
              <div className="flex flex-col">
                <label
                  htmlFor="linkedinUrl"
                  className="block text-sm font-bold text-primary ml-4"
                >
                  LinkedIn:
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary">
                    <StarHalf size={18} />
                  </div>
                  <input
                    id="linkedinUrl"
                    type="text"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    placeholder="Enter your LinkedIn URL"
                    className="w-full border border-primary-60 pl-12 pr-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-1 focus:primary focus:bg-white transition-all duration-300"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="website"
                  className="block text-sm font-bold text-primary ml-4"
                >
                  Personal website:
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary">
                    <Globe size={18} />
                  </div>
                  <input
                    id="website"
                    type="text"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="Enter your website link"
                    className="w-full border border-primary-60 pl-12 pr-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-1 focus:primary focus:bg-white transition-all duration-300"
                  />
                </div>
              </div>
            </div>
          </div>

                     {/* Work Experience Section */}
           {!loading && (
             <WorkExperience 
               experiences={experiences}
               onExperiencesChange={setExperiences}
             />
           )}

           {/* Education Section */}
           {!loading && (
             <EducationComponent 
               educations={educations}
               onEducationsChange={setEducations}
             />
           )}
        </div>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => router.push('/candidate/profile')}
            className="hover:bg-accent hover:text-neutral-light-60 cursor-pointer text-accent border border-accent font-semibold rounded-2xl px-6 py-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="bg-accent hover:text-accent hover:bg-neutral-light-60 cursor-pointer border border-accent text-neutral-light-20 font-semibold rounded-2xl px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CandidateProfileEditPage() {
  return (
    <ProtectedRoute allowedRoles={['candidate']}>
      <CandidateProfileEditContent />
    </ProtectedRoute>
  );
}
