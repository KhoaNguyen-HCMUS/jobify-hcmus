"use client";
import { useState } from "react";
import { User, Lock, Mail } from "lucide-react";
import LogoTagline from "../../../components/logoTagline";
export default function CandidateRegistrationPage() {
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [check, setCheck] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Full Name:", fullName);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Confirm password: ", confirmPassword);
    console.log("I agree...:", check);
  };
  return (
    <div className="flex items-center justify-center w-full min-h-screen p-4 bg-linear-(--gradient-primary)">
      <div className="backdrop-blur-sm rounded-[57px] shadow-xl flex flex-col lg:flex-row items-center max-w-5xl w-full p-8 lg:p-12 gap-12 bg-highlight-20 mx-auto">
        <div className="flex-1 w-full max-w-md space-y-8">
          <h1 className="text-4xl font-bold text-center mt-4 text-primary mb-8">
            Candidate Registration
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-3">
              <label
                htmlFor="fullName"
                className="block text-sm font-bold text-primary ml-4"
              >
                Full Name
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
                  className="w-full pl-12 pr-4 py-4 bg-highlight-40 rounded-full text-primary-80 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all duration-300"
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <label
                htmlFor="email"
                className="block text-sm font-bold text-primary ml-4"
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary">
                  <Mail size={18} />
                </div>
                <input
                  id="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-4 bg-highlight-40 rounded-full text-primary-80 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all duration-300"
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <label
                htmlFor="password"
                className="block text-sm font-bold text-primary ml-4"
              >
                Password
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
                  className="w-full pl-12 pr-4 py-4 bg-highlight-40 rounded-full not-even:not-odd: text-primary-80 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all duration-300"
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-bold text-primary ml-4"
              >
                Confirm password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary">
                  <Lock size={18} />
                </div>
                <input
                  id="confirmPassword"
                  type="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="w-full pl-12 pr-4 py-4 bg-highlight-40 rounded-full not-even:not-odd: text-primary-80 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all duration-300"
                  required
                />
              </div>
            </div>

            {/* Options */}
            <div className="flex items-center justify-between text-sm pt-4">
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

            {/* Submit Button */}
            <button
              type="submit"
              onClick={() => (window.location.href = "/sign-in")}
              className="w-full bg-secondary hover:bg-primary rounded-full text-white py-4 px-8 font-bold transition-colors duration-300 mt-4 cursor-pointer"
            >
              Sign up
            </button>
          </form>
        </div>

        {/* Logo/Icon Section */}
        <LogoTagline />
      </div>
    </div>
  );
}
