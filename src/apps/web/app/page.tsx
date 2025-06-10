"use client";
import { useState, useEffect } from "react";
import { User, Lock, Search, UserCheck } from "lucide-react";
import Image from "next/image";

function App() {
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Full Name:", fullName);
    console.log("Password:", password);
    console.log("Remember Me:", rememberMe);
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="backdrop-blur-sm rounded-[57px] shadow-xl flex flex-col lg:flex-row items-center max-w-5xl w-full min-h-[600px] p-8 lg:p-12 gap-12 bg-highlight-20 mx-auto">
        
        {/* Form Section */}
        <div className="flex-1 w-full max-w-md space-y-8">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
            SIGN IN
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name Input */}
            <div className="space-y-3">
              <label 
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 ml-4"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <User size={18} />
                </div>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full pl-12 pr-4 py-4 bg-gray-100 rounded-full text-gray-800 outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-300"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-3">
              <label 
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 ml-4"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <Lock size={18} />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-4 py-4 bg-gray-100 rounded-full text-gray-800 outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-300"
                  required
                />
              </div>
            </div>

            {/* Options */}
            <div className="flex items-center justify-between text-sm pt-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 focus:ring-2 focus:ring-blue-500 text-blue-600"
                />
                <span className="text-gray-700 font-medium">REMEMBER ME</span>
              </label>
              <a 
                href="#" 
                className="font-semibold text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              >
                FORGET PASSWORD?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gray-800 hover:bg-gray-900 rounded-full text-white py-4 px-8 font-semibold transition-colors duration-300 mt-8"
            >
              Sign in
            </button>

            {/* Sign Up */}
            <p className="text-center text-gray-600 text-sm pt-4">
              Don't have account?{" "}
              <a
                href="#"
                className="font-semibold text-blue-600 hover:text-blue-800 hover:underline"
              >
                Sign up
              </a>
            </p>
          </form>
        </div>

        {/* Logo/Icon Section */}
        <div className="flex-1 flex flex-col items-center justify-center text-center max-w-md">
          {/* Custom Icon - Magnifying glass with profile */}
          <Image  src="/logo.png"
              alt="JOBIFY Logo" width={200} height={200} className="mb-6" />

          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            JOBIFY
          </h1>
          <p className="text-gray-600 font-medium text-lg leading-relaxed">
            Your next opportunity starts here.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;