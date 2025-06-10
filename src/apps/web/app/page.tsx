"use client";
import { useState, useEffect } from "react";
import { User, Lock, Search } from "lucide-react";

function App() {
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  //LIGHT THEME
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Full Name:", fullName);
    console.log("Password:", password);
    console.log("Remember Me:", rememberMe);
  };

  return (
    <div className="flex items-center w-full h-screen bg-[var(--bg--primary)]">
      <div className="backdrop-blur-sm rounded-[57px] shadow-md flex items-center w-[1299px] h-[724px] p-10 gap-22 bg-[rgba(241,244,250,1)] mx-auto">
        {/* Form Section */}
        <div className="flex-1 space-y-6">
          <h1 className="h1 text-center">SIGN IN</h1>

          <div className="space-y-6">
            {/* Full Name Input */}
            <div className="relative">
              <label
                htmlFor="fullName"
                className="absolute left-12 top-1/2 transform -translate-y-1/2 text-[var(--text-primary)] pointer-events-none transition-all duration-300"
              >
                Full Name
              </label>
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--text-primary)]">
                <User size={24} />
              </div>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-5 py-4 bg-[rgba(226,234,245,1)] rounded-full text-black text-center"
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative mt-4">
              <label
                htmlFor="password"
                className="absolute left-12 top-1/2 transform -translate-y-1/2 text-[var(--text-primary)] pointer-events-none transition-all duration-300"
              >
                Password
              </label>
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--text-primary)]">
                <Lock size={24} />
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-5 py-4 bg-[rgba(226,234,245,1)] rounded-full text-black text-center ${
                  password ? "pt-6" : ""
                }`}
                required
              />
            </div>

            {/* Options */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4"
                />
                REMEMBER ME
              </label>
              <a href="#" className="font-semibold a:hover">
                FORGOT PASSWORD
              </a>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-[var(--color-primary)] rounded-[50px] text-white py-[16px] px-[32px] font-semibold cursor-pointer"
            >
              Sign in
            </button>

            {/* Sign Up */}
            <p className="text-center text-[var(--text-secondary)] text-sm">
              Don't have account?{" "}
              <a
                href="#"
                className="font-semibold text-[var(--color-secondary]"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>

        {/* Logo Section */}
        <div className="hidden md:block text-center w-[fixed(459px)] h-[hug(462.57px)]">
          <div className="w-[306.57px] h-[306.57px] ">
            <img
              src="/logo.png"
              alt="JOBIFY Logo"
              className="w-full h-full object-contain"
            />
          </div>

          <h1 className="display-5 text-4xl">JOBIFY</h1>
          <p className="w-[459px] h-[38px] font-sans text-[var(--color-secondary] font-medium">
            Your next opportunity starts here.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
