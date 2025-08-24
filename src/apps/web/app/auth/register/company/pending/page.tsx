"use client";
import { useRouter } from 'next/navigation';
import Image from "next/image";

export default function CompanyPendingPage() {
  const router = useRouter();

  const handleSignIn = () => {
    router.push('/auth/sign-in');
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen p-4 bg-background">
      <div className="bg-neutral-light-20 rounded-3xl border border-primary-20 max-w-4xl w-full p-12 flex flex-col lg:flex-row items-center gap-12">
        
        <div className="flex-1 space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-primary">
              Company Registration
            </h1>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-primary">
                Pending approval
              </h2>
              
              <p className="text-text-80 text-lg">
                Please sign in and update company profile for verification.
              </p>
            </div>
          </div>
          
          <button
            onClick={handleSignIn}
            className="bg-secondary hover:bg-secondary-80 text-neutral-light-20 px-8 py-4 rounded-xl font-bold transition-colors duration-300"
          >
            Sign in
          </button>
        </div>
        
                  <div className="flex-1 flex flex-col items-center justify-center space-y-4">
            <Image 
              src="/logo.png" 
              alt="JOBIFY" 
              width={120} 
              height={120}
              className="object-contain"
            />
          </div>
          
          <div className="text-center space-y-2">
            <h3 className="text-3xl font-bold text-primary">
              JOBIFY
            </h3>
            <p className="text-text-80 text-lg">
              Your next opportunity starts here.
            </p>
          </div>
        </div>
      </div>
  );
}
