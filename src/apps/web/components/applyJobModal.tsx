"use client";
import { useState, useEffect, useRef } from "react";
import {
  CircleX,
  NotebookTabs,
  Upload,
  User,
  Mail,
  Phone,
  TriangleAlert,
  FilePenLine,
} from "lucide-react";

export default function ApplyJobModal() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState("");
  const [fileSaved, setFileSaved] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setFileSaved(false);
    }
  };
  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="relative cursor-pointer px-6 py-2 bg-accent rounded-full text-background font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 transform hover:-translate-y-0.5"
      >
        Apply now
      </button>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-gray-700 z-50 flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-3/5 max-h-[90vh] overflow-y-auto bg-neutral-light-60 rounded-2xl relative"
          >
            <div className="flex flex-col gap-2">
              <div className="flex justify-between bg-highlight-40 rounded-t-2xl gap-4 pl-10 pr-4 py-4">
                <span className="text-primary text-2xl font-bold">
                  Apply for Apartment Real Estate Sales Officer – Income 18-60
                  million/month + HH up to 60%/transaction
                </span>
                <div className="px-4">
                  <CircleX
                    size={34}
                    onClick={() => setIsOpen(false)}
                    className="absolute right-1 text-secondary-40 cursor-pointer"
                  />
                </div>
              </div>
              <div className="flex gap-2 text-accent font-semibold text-xl px-10">
                <NotebookTabs size={24} />
                <span>Choose a CV to apply for</span>
              </div>
              <div className="flex flex-col rounded-2xl px-10">
                <div className="bg-neutral-light-20 p-4 rounded-2xl border-2 border-accent border-dashed">
                  <div className="flex justify-center">
                    <div className="flex flex-wrap justify-between gap-4 px-20">
                      {fileName ? (
                        <div className="text-primary-80 font-semibold text-lg flex items-center gap-2">
                          <FilePenLine size={32} className="text-primary-80" />
                          <span>{fileName}</span>
                        </div>
                      ) : (
                        <Upload size={80} className="text-primary-60" />
                      )}
                      {fileName && !fileSaved && (
                        <button
                          onClick={() => {
                            setFileName("");
                            fileInputRef.current &&
                              (fileInputRef.current.value = "");
                          }}
                          className="bg-accent text-background font-semibold rounded-full px-4 py-2 cursor-pointer"
                        >
                          Remove file
                        </button>
                      )}
                      <div className="flex flex-col justify-between text-center items-center gap-2">
                        <div className="flex flex-col">
                          <span className="text-primary text-lg">
                            Upload your CV from your computer, select or drag
                            and drop
                          </span>
                          <span className="text-primary-60 text-sm">
                            Upload your CV from your computer, select or drag
                            and drop
                          </span>
                        </div>
                        <div className="flex relative">
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                          <button
                            onClick={() => {
                              if (!fileName) {
                                fileInputRef.current?.click();
                              } else if (!fileSaved) {
                                setFileSaved(true);
                              } else {
                                fileInputRef.current?.click();
                              }
                            }}
                            className="cursor-pointer text-background font-semibold bg-accent rounded-full px-4 py-2"
                          >
                            {!fileName ? "Upload" : fileSaved ? "Edit" : "Save"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-0 border-primary-40 space-y-4 mt-4 py-2">
                    <div className="flex justify-between">
                      <span className="text-primary text-sm">
                        Please enter full details:
                      </span>
                      <span className="text-[#F52121] text-sm">
                        (*) Required Information.
                      </span>
                    </div>
                    <div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="fullName"
                          className="block text-sm text-primary"
                        >
                          Full Name*
                        </label>
                        <div className="relative">
                          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary-80">
                            <User size={18} />
                          </div>
                          <input
                            id="fullName"
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Enter your full name"
                            className="w-full pl-10 pr-4 py-2 bg-highlight-20 rounded-xl shadow-2xl text-primary-80 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all duration-300"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap justify-between gap-10">
                      <div className="flex-1 flex flex-col">
                        <label
                          htmlFor="fullName"
                          className="block text-sm text-primary"
                        >
                          Email*
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
                            className="w-full pl-10 pr-4 py-2 bg-highlight-20 rounded-xl shadow-2xl text-primary-80 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all duration-300"
                            required
                          />
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col">
                        <label
                          htmlFor="phone"
                          className="block text-sm text-primary"
                        >
                          Phone Number*
                        </label>
                        <div className="relative">
                          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary">
                            <Phone size={18} />
                          </div>
                          <input
                            id="phone"
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Enter your phone number"
                            className="w-full pl-10 pr-4 py-2 bg-highlight-20 rounded-xl shadow-2xl text-primary-80 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all duration-300"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col px-10 mt-4">
                <div className="flex gap-2 text-accent font-semibold text-xl">
                  <Mail size={24} />
                  <span>Letters of recommendation</span>
                </div>
                <span className="text-primary-80 mb-4">
                  A short, well-thought-out cover letter will help you become
                  more professional and impress the recruiter employ.
                </span>
                <div className="relative border border-primary-60 bg-neutral-light-20 mb-4 rounded-xl">
                  <textarea
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full h-32 px-4 py-3 pr-12 text-primary-60 placeholder-primary-60 focus:outline-none resize-none"
                    placeholder="Write a brief introduction about yourself (strengths, weaknesses) and clearly state your desire and reason for applying for this position."
                  ></textarea>
                  <FilePenLine
                    size={24}
                    className="absolute top-3 right-4 text-secondary-40 cursor-pointer"
                  />
                </div>
                <div className="w-full flex flex-col px-4 mb-4 border-1 border-primary-60 bg-neutral-light-20 rounded-xl shadow-2xl text-primary-60 focus:ring-2 focus:bg-white transition-all duration-300">
                  <div className="py-4">
                    <div className="flex gap-1 font-semibold text-xl text-[#FF5E5E]">
                      <TriangleAlert size={24} />
                      <span>Note:</span>
                    </div>
                    <div className="text-primary text-sm">
                      <b className="text-accent">Jobify</b> advises all of you
                      to always be careful in the job search process and
                      actively research information believe company, job
                      position before applying. <br />
                      Candidates need to be responsible for their application
                      behavior body. If you encounter if you believe in
                      recruitment or receive suspicious communications from
                      employers, please immediately report to Jobify via
                      Email hotro@jobify.vn for timely support.
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-10 mb-4">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="flex-1 rounded-full bg-primary-40 text-neutral-light-20 px-6 py-2 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button className="flex-6 rounded-full bg-accent text-neutral-light-20 px-6 py-2 cursor-pointer">
                    Submission of application choose
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
