"use client";
import Image from "next/image";
import { useState } from "react";
import {
  User,
  Lock,
  Mail,
  RectangleEllipsis,
  PhoneCall,
  Mailbox,
  Container,
  MapPin,
} from "lucide-react";
export default function CompanyRegistrationPage() {
  const [companyName, setCompanyName] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [taxCode, setTaxCode] = useState("");
  const [companyNumber, setCompanyNumber] = useState("");
  const [password, setPassword] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [businessLicenseNumber, setBusinessLicenseNumber] = useState("");
  const [address, setAddress] = useState("");
  const [check, setCheck] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Company Name:", companyName);
    console.log("Company Email:", companyEmail);
    console.log("Tax Code:", taxCode);
    console.log("Company Number:", companyNumber);
    console.log("Password:", password);
    console.log("Contact person's name:", contactEmail);
    console.log("Business License number:", businessLicenseNumber);
    console.log("Company Address:", address);
    console.log("I agree...:", check);
  };
  return (
    <div className="flex items-center justify-center w-full min-h-screen p-4 bg-linear-(--gradient-primary)">
      <div className="backdrop-blur-sm rounded-[57px] shadow-xl lg:flex-row max-w-5xl w-full p-8 lg:p-12 gap-12 bg-highlight-20">
        <div className="flex justify-center">
          <h1 className="text-4xl font-bold mt-4 text-primary mb-8">
            Company Registration
          </h1>
          <Image
            src="/logo.png"
            alt="JOBIFY Logo"
            width={70}
            height={70}
            className="mb-6"
          />
        </div>
        <div className="flex-3 space-y-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-between gap-10">
              <div className="flex-1 space-y-4">
                <div className="space-y-3">
                  <label
                    htmlFor="companyName"
                    className="block text-sm font-bold text-primary ml-4"
                  >
                    Company Name:
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary">
                      <User size={18} />
                    </div>
                    <input
                      id="companyName"
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Enter your company name"
                      className="w-full pl-12 pr-4 py-4 bg-highlight-40 rounded-full text-primary-80 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label
                    htmlFor="companyEmail"
                    className="block text-sm font-bold text-primary ml-4"
                  >
                    Company Email:
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary">
                      <Mail size={18} />
                    </div>
                    <input
                      id="companyEmail"
                      type="text"
                      value={companyEmail}
                      onChange={(e) => setCompanyEmail(e.target.value)}
                      placeholder="Enter your company email"
                      className="w-full pl-12 pr-4 py-4 bg-highlight-40 rounded-full text-primary-80 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label
                    htmlFor="taxCode"
                    className="block text-sm font-bold text-primary ml-4"
                  >
                    Tax Code:
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary">
                      <RectangleEllipsis size={18} />
                    </div>
                    <input
                      id="taxCode"
                      type="text"
                      value={taxCode}
                      onChange={(e) => setTaxCode(e.target.value)}
                      placeholder="Enter your tax code"
                      className="w-full pl-12 pr-4 py-4 bg-highlight-40 rounded-full not-even:not-odd: text-primary-80 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label
                    htmlFor="companyNumber"
                    className="block text-sm font-bold text-primary ml-4"
                  >
                    Company Number:
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary">
                      <PhoneCall size={18} />
                    </div>
                    <input
                      id="companyNumber"
                      type="text"
                      value={companyNumber}
                      onChange={(e) => setCompanyNumber(e.target.value)}
                      placeholder="Enter your company number"
                      className="w-full pl-12 pr-4 py-4 bg-highlight-40 rounded-full not-even:not-odd: text-primary-80 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all duration-300"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <div className="space-y-3">
                  <label
                    htmlFor="password"
                    className="block text-sm font-bold text-primary ml-4"
                  >
                    Password:
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary">
                      <Lock size={18} />
                    </div>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full pl-12 pr-4 py-4 bg-highlight-40 rounded-full text-primary-80 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label
                    htmlFor="contactEmail"
                    className="block text-sm font-bold text-primary ml-4"
                  >
                    Contact person's name:
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary">
                      <Mailbox size={18} />
                    </div>
                    <input
                      id="contactEmail"
                      type="text"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="Enter email"
                      className="w-full pl-12 pr-4 py-4 bg-highlight-40 rounded-full text-primary-80 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label
                    htmlFor="businessLicenseNumber"
                    className="block text-sm font-bold text-primary ml-4"
                  >
                    Business License Number:
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary">
                      <Container size={18} />
                    </div>
                    <input
                      id="businessLicenseNumber"
                      type="businessLicenseNumber"
                      value={businessLicenseNumber}
                      onChange={(e) => setBusinessLicenseNumber(e.target.value)}
                      placeholder="Enter business license number:"
                      className="w-full pl-12 pr-4 py-4 bg-highlight-40 rounded-full not-even:not-odd: text-primary-80 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label
                    htmlFor="address"
                    className="block text-sm font-bold text-primary ml-4"
                  >
                    Company Address:
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
                      className="w-full pl-12 pr-4 py-4 bg-highlight-40 rounded-full not-even:not-odd: text-primary-80 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all duration-300"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="flex justify-center">
          <div className="flex text-sm pt-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={check}
                onChange={(e) => setCheck(e.target.checked)}
                className="w-4 h-4 rounded"
              />
              <span className="text-primary font-medium">
                I agree to the Terms of Service and Privacy Policy of Jobify
              </span>
            </label>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            onClick={() => (window.location.href = "/pending-approval")}
            className="bg-secondary hover:bg-primary rounded-full text-white py-4 px-8 font-bold transition-colors duration-300 mt-4 cursor-pointer"
          >
            Sign now
          </button>
        </div>
      </div>
    </div>
  );
}
