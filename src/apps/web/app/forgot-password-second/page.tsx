"use client";
import { useState } from "react";
import { Lock } from "lucide-react";
import LogoTagline from "../../components/logoTagline";
export default function ForgotPasswordSecondPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Password: ", password);
    console.log("Confirm password: ", confirmPassword);
  };
  return (
    <div className="flex items-center justify-center w-full min-h-screen p-4 bg-linear-(--gradient-primary)">
      <div className="backdrop-blur-sm rounded-[57px] shadow-xl flex flex-col lg:flex-row items-center max-w-5xl w-full p-8 lg:p-12 gap-12 bg-highlight-20 mx-auto">
        <div className="flex-1 w-full max-w-md space-y-8">
          <h1 className="text-4xl font-bold text-center mt-4 text-primary mb-8">
            Forgot Password
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-3">
              <label
                htmlFor="password"
                className="block text-sm font-bold text-primary ml-4"
              >
                New Password:
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary">
                  <Lock size={18} />
                </div>
                <input
                  id="password"
                  type="text"
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
                htmlFor="password"
                className="block text-sm font-bold text-primary ml-4"
              >
                Confirm Password:
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary">
                  <Lock size={18} />
                </div>
                <input
                  id="confirmPassword"
                  type="text"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-4 py-4 bg-highlight-40 rounded-full text-primary-80 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all duration-300"
                  required
                />
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-secondary hover:bg-primary rounded-full text-white py-4 px-8 font-bold transition-colors duration-300 mt-4 cursor-pointer"
              >
                <a href="/forgot-password-third">Update password</a>
              </button>
            </div>
          </form>
        </div>

        <LogoTagline />
      </div>
    </div>
  );
}
