import { BriefcaseBusiness, Building } from "lucide-react";
import LogoTagline from "../../../components/logoTagline";

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center w-full min-h-screen p-4 bg-linear-(--gradient-primary)">
      <div className="backdrop-blur-sm rounded-[57px] shadow-xl flex flex-col lg:flex-row items-center max-w-5xl w-full p-8 lg:p-12 gap-12 bg-highlight-20 mx-auto">
        <div className="flex-1 w-full max-w-md space-y-8">
          <h1 className="text-4xl font-bold text-center mt-4 text-primary mb-8">
            Register as a
          </h1>
          <div className="w-full flex gap-10">
            <div className="backdrop-blur-sm flex flex-col justify-between items-center bg-highlight-40 shadow-xl rounded-3xl px-4 py-8">
              <BriefcaseBusiness size={70} />
              <h2 className="text-primary font-semibold text-2xl my-2">
                Candidate
              </h2>
              <p className="text-primary text-center">
                Find and apply for jobs that match your skills
              </p>
              <div className="flex justify-center">
                <a
                  href="/auth/register/candidate"
                  className="bg-secondary hover:bg-primary rounded-full text-white py-4 px-8 font-bold transition-colors duration-300 mt-4 cursor-pointer"
                >
                  Continue
                </a>
              </div>
            </div>
            <div className="backdrop-blur-sm flex flex-col justify-between items-center bg-highlight-40 shadow-xl rounded-3xl px-4 py-8">
              <Building size={70} />
              <h2 className="text-primary font-semibold text-2xl my-2">
                Company
              </h2>
              <p className="text-primary text-center">
                Post job openings and manage applications
              </p>
              <div className="flex justify-center">
                <a
                  href="/auth/register/company"
                  className="bg-secondary hover:bg-primary rounded-full text-white py-4 px-8 font-bold transition-colors duration-300 mt-4 cursor-pointer"
                >
                  Continue
                </a>
              </div>
            </div>
          </div>
        </div>
        <LogoTagline />
      </div>
    </div>
  );
}
