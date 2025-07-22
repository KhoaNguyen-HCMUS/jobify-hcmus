"use client";
import { useState } from "react";
import { User, Lock } from "lucide-react";
import LogoTagline from "../../components/logoTagline";

export default function SignInPage() {
  // test navBar
  localStorage.setItem("user", JSON.stringify({ role: "moderator" }));
  window.location.href = "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email: ", email);
    console.log("Password: ", password);
    console.log("Remember: ", rememberMe);
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen p-4 bg-linear-(--gradient-primary)">
      <div className="backdrop-blur-sm rounded-[57px] shadow-xl flex flex-col lg:flex-row items-center max-w-5xl w-full p-8 lg:p-12 gap-12 bg-highlight-20 mx-auto">
        {/* Form Section */}
        <div className="flex-1 w-full max-w-md space-y-8">
          <h1 className="text-4xl font-bold text-center mt-10 text-primary mb-8">
            SIGN IN
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name Input */}
            <div className="space-y-3">
              <label
                htmlFor="email"
                className="block text-sm font-bold text-primary ml-4"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary">
                  <User size={18} />
                </div>
                <input
                  id="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full pl-12 pr-4 py-4 bg-highlight-40 rounded-full text-primary-80 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all duration-300"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
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

            {/* Options */}
            <div className="flex items-center justify-between text-sm pt-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded"
                />
                <span className="text-primary font-medium">REMEMBER ME</span>
              </label>
              <a
                href="/forgot-password-first"
                className="custom-link transition-colors"
              >
                FORGOT PASSWORD?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-secondary hover:bg-primary rounded-full text-white py-4 px-8 font-bold transition-colors duration-300 mt-8 cursor-pointer"
            >
              Sign in
            </button>
            <p className="text-accent text-center">Or continue with</p>
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 rounded-full text-white py-4 px-8 font-bold transition-colors duration-300 cursor-pointer"
            >
              Sign in with Google
            </button>

            {/* Sign Up */}
            <p className="text-center text-text-80 text-sm pt-4">
              Don't have account?{" "}
              <a href="/sign-up-with-role" className="custom-link">
                Sign up
              </a>
            </p>
          </form>
        </div>

        {/* Logo/Icon Section */}
        <LogoTagline />
      </div>
    </div>
  );
}
