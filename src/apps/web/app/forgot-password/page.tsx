"use client";
import { useState } from "react";
import { Mail } from "lucide-react";
import LogoTagline from "../../components/logoTagline";
export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email: ", email);
  };
  return (
    <div className="flex items-center justify-center w-full min-h-screen p-4 bg-linear-(--gradient-primary)">
      <div className="backdrop-blur-sm rounded-[57px] border border-primary-20 flex flex-col lg:flex-row items-center max-w-5xl w-full p-8 lg:p-12 gap-12 bg-highlight-20 mx-auto">
        <div className="flex-1 w-full max-w-md space-y-8">
          <h1 className="text-4xl font-bold text-center mt-4 text-primary mb-8">
            Forgot Password
          </h1>

          <p className="text-primary">
            Please enter the email address associated with your account. <br />{" "}
            We'll send you a link reset your password.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
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

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-secondary hover:bg-primary rounded-full text-white py-4 px-8 font-bold transition-colors duration-300 mt-4 cursor-pointer"
              >
                Verification
              </button>
            </div>
          </form>
        </div>

        <LogoTagline />
      </div>
    </div>
  );
}
