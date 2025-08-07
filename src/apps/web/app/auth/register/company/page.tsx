"use client";
import { useState } from "react";
import { User, Lock, Mail, FileText, BarChart3, Eye, EyeOff } from "lucide-react";
import { registerCompany } from "../../../../services/auth";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function CompanyRegistrationPage() {
  const router = useRouter();
  const [companyName, setCompanyName] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [taxCode, setTaxCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [businessLicenseNumber, setBusinessLicenseNumber] = useState("");
  const [check, setCheck] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }
    
    if (!/\d/.test(password)) {
      toast.error("Password must contain at least one number");
      return;
    }
    
    if (!check) {
      toast.error("Please agree to the Terms of Service");
      return;
    }
    
    const res = await registerCompany({
      email: companyEmail,
      password: password,
      company_name: companyName,
      phone_number: "",
      tax_code: taxCode,
      license_number: businessLicenseNumber,
      contact_email: companyEmail,
      address: "",
      role: "company",
    });
    
    if (res.success) {
      toast.success("Registration successful");
      router.push("/company/dashboard");
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen p-4 bg-linear-(--gradient-primary)">
      <div className="backdrop-blur-sm rounded-[57px] shadow-xl max-w-4xl w-full p-8 lg:p-12 gap-12 bg-highlight-20 mx-auto">
        <div className="flex justify-center mb-8">
          <h1 className="text-4xl font-bold text-primary">
            Company Registration
          </h1>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-primary ml-4">
                  Company Name:
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Enter name"
                    className="w-full pl-12 pr-4 py-4 bg-highlight-40 rounded-full not-even:not-odd: text-primary-80 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all duration-300"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-primary ml-4">
                  Tax Code:
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary">
                    <FileText size={18} />
                  </div>
                  <input
                    type="text"
                    value={taxCode}
                    onChange={(e) => setTaxCode(e.target.value)}
                    placeholder="Enter tax code"
                    className="w-full pl-12 pr-4 py-4 bg-highlight-40 rounded-full not-even:not-odd: text-primary-80 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all duration-300"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-primary ml-4">
                  Password:
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full pl-12 pr-4 py-4 bg-highlight-40 rounded-full not-even:not-odd: text-primary-80 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all duration-300"
                    required
                  />
                
                </div>
                <p className="text-xs text-gray-500 ml-4">
                  Password must be at least 8 characters long, contains numbers.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-primary ml-4">
                  Company Email:
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    value={companyEmail}
                    onChange={(e) => setCompanyEmail(e.target.value)}
                    placeholder="Enter email"
                    className="w-full pl-12 pr-4 py-4 bg-highlight-40 rounded-full not-even:not-odd: text-primary-80 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all duration-300"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-primary ml-4">
                  Business License Number:
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary">
                    <BarChart3 size={18} />
                  </div>
                  <input
                    type="text"
                    value={businessLicenseNumber}
                    onChange={(e) => setBusinessLicenseNumber(e.target.value)}
                    placeholder="Enter business license number"
                    className="w-full pl-12 pr-4 py-4 bg-highlight-40 rounded-full not-even:not-odd: text-primary-80 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all duration-300"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-primary ml-4">
                  Confirm Password:
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full pl-12 pr-4 py-4 bg-highlight-40 rounded-full not-even:not-odd: text-primary-80 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all duration-300"
                    required
                  />
                
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-4">
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

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-secondary hover:bg-primary rounded-lg text-white py-3 px-8 font-bold transition-colors duration-300 cursor-pointer"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
