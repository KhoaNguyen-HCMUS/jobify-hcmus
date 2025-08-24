"use client";
import { warn } from "node:console";
import LogoTagline from "../../components/logoTagline";

export default function ForgotPasswordThirdPage() {
  return (
    <div className="flex items-center justify-center w-full min-h-screen p-4 bg-linear-(--gradient-primary)">
      <div className="backdrop-blur-sm rounded-[57px] border border-primary-20 flex flex-col lg:flex-row items-center max-w-5xl w-full p-8 lg:p-12 gap-12 bg-highlight-20 mx-auto">
        <div className="flex-1 w-full max-w-md space-y-8">
          <h1 className="text-4xl font-bold text-center mt-4 text-primary mb-8">
            Your password has been successfully updated.
          </h1>

          <p className="text-primary text-center">
            You can now access your account.
          </p>

          <div className="flex justify-center">
            <a
              href="/"
              className="bg-secondary hover:bg-primary rounded-full text-white py-4 px-8 font-bold transition-colors duration-300 mt-4 cursor-pointer"
            >
              Go to homepage
            </a>
          </div>
        </div>
        <LogoTagline />
      </div>
    </div>
  );
}
