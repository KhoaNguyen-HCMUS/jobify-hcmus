"use client";
import { useState } from "react";
import { MapPin, Briefcase, Globe, Building, Barcode } from "lucide-react";

export default function RecruiterProfileEditPage() {
  const [companyName, setCompanyName] = useState("");
  const [website, setWebsite] = useState("");
  const [taxCode, setTaxCode] = useState("");
  const [businessLicenseNumber, setBusinessLicenseNumber] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [industry, setIndustry] = useState("");
  const [profession, setProfession] = useState("");

  return (
    <div className="w-full h-full bg-neutral-light-60">
      <div className="flex flex-col justify-between px-20 py-10 space-y-4">
        <div className="text-accent font-bold text-2xl">
          Company Information
        </div>
        <div className="flex flex-col gap-4 p-4">
          <div className="flex flex-wrap">
            <div className="flex-1 flex flex-col gap-2 px-4">
              <div className="flex flex-col">
                <label
                  htmlFor="companyName"
                  className="block text-sm font-bold text-primary ml-4"
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
                    placeholder="Enter name"
                    className="w-full border border-primary-60 pl-12 pr-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-1 focus:bg-white transition-all duration-300"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="taxCodeName"
                  className="block text-sm font-bold text-primary ml-4"
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
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex flex-col px-4">
                <label
                  htmlFor="website"
                  className="block text-sm font-bold text-primary ml-4"
                >
                  Company WebSite*:
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
                    placeholder="Enter website link"
                    className="w-full border border-primary-60 pl-12 pr-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-1 focus:bg-white transition-all duration-300"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col px-4">
                <label
                  htmlFor="businessLicenseNumber"
                  className="block text-sm font-bold text-primary ml-4"
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
            </div>
          </div>
          <div className="flex flex-col gap-2 px-4">
            <label
              htmlFor="description"
              className="block text-sm font-bold text-primary ml-4"
            >
              Description:
            </label>
            <div className="relative">
              <input
                id="description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
                className="w-full border border-primary-60 pl-4 pr-4 py-2 h-16 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-1 focus:bg-white transition-all duration-300"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 px-4">
            <label
              htmlFor="address"
              className="block text-sm font-bold text-primary ml-4"
            >
              Address*:
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
                placeholder="Enter address"
                className="w-full border border-primary-60 pl-12 pr-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-1 focus:bg-white transition-all duration-300"
                required
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
                  Industry*:
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
                    placeholder="Add industries"
                    className="w-full border border-primary-60 pl-12 pr-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-1 focus:bg-white transition-all duration-300"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="profession"
                  className="block text-sm font-bold text-primary ml-4"
                >
                  Profession*:
                </label>
                <div className="border-x-1 border-b-1 border-primary-60 rounded-2xl">
                  <div className="relative ">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary">
                      <Briefcase size={18} />
                    </div>
                    <input
                      id="profession"
                      type="text"
                      value={profession}
                      onChange={(e) => setProfession(e.target.value)}
                      placeholder="Add profession"
                      className="w-full border border-primary-60 pl-12 pr-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-1 focus:bg-white transition-all duration-300"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2  bg-neutral-medium-20 my-2">
                    <div className="flex flex-wrap gap-2 px-4">
                      <span className="text-primary">Industry: </span>
                      <input
                        id="profession"
                        type="text"
                        value={profession}
                        onChange={(e) => setProfession(e.target.value)}
                        placeholder="Add profession"
                        className="w-96 border border-primary-60-60 pl-4 pr-4 py-2 bg-neutral-light-20 rounded-full text-primary-80 outline-none focus:ring-1 focus:bg-white transition-all duration-300"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 px-4 pb-2">
                    <div className="hover:bg-accent bg-primary-60 hover:text-neutral-light-60 cursor-pointer text-neutral-light-20 font-semibold rounded-full px-8 py-2">
                      <span>Cancel</span>
                    </div>
                    <div className="bg-accent hover:text-accent hover:bg-neutral-light-60 cursor-pointer border border-accent text-neutral-light-20 font-semibold rounded-full px-8 py-2">
                      <span>Add</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <b className="text-primary">Update your logo*:</b>

              <label className="relative w-60 h-60 border border-primary-60 rounded-lg flex items-center justify-center cursor-pointer hover:bg-highlight-20">
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                    }
                  }}
                />
                <img
                  src="/logo-light.png"
                  alt="upload icon"
                  className="w-60 h-60 opacity-40"
                />
              </label>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="hover:bg-accent hover:text-neutral-light-60 cursor-pointer text-accent border border-accent font-semibold rounded-2xl px-6 py-2">
            <a href="/recruiter/profile">Cancel</a>
          </div>
          <div className="bg-accent hover:text-accent hover:bg-neutral-light-60 cursor-pointer border border-accent text-neutral-light-20 font-semibold rounded-2xl px-6 py-2">
            <a href="/recruiter/profile">Save</a>
          </div>
        </div>
      </div>
    </div>
  );
}
