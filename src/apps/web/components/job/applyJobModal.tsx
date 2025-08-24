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
import { applyJob, ApplyJobData } from "../../services/jobs";
import { toast } from "react-toastify";

interface ApplyJobModalProps {
  jobId: string;
  jobTitle: string;
  isOpen: boolean;
  onClose: () => void;
  onApplySuccess?: (applicationId: string) => void;
}

export default function ApplyJobModal({ jobId, jobTitle, isOpen, onClose, onApplySuccess }: ApplyJobModalProps) {
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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
      setSelectedFile(file);
      setFileSaved(false);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      toast.error("Please upload your resume");
      return;
    }

    setIsLoading(true);
    try {
      const data: ApplyJobData = {
        resume: selectedFile,
        cover_letter: description.trim()
      };

      const response = await applyJob(jobId, data);
      
      if (response.success) {
        toast.success("Application submitted successfully!");
        onClose();
        // Reset form
        setDescription("");
        setFileName("");
        setSelectedFile(null);
        setFileSaved(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        
        // Call callback to update parent component
        if (onApplySuccess && response.data?.application_id) {
          onApplySuccess(response.data.application_id);
        }
      } else {
        toast.error(response.message || "Failed to submit application");
      }
    } catch (error) {
      toast.error("Network error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-primary-80/70 z-50 flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-3/5 max-h-[90vh] overflow-y-auto bg-neutral-light-60 rounded-2xl relative"
          >
            <div className="flex flex-col gap-2">
              <div className="flex justify-between bg-highlight-40 rounded-t-2xl gap-4 pl-10 pr-4 py-4">
                <span className="text-primary text-2xl font-bold">
                  Apply for {jobTitle}
                </span>
                <div className="px-4">
                  <CircleX
                    size={34}
                    onClick={onClose}
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
                            setSelectedFile(null);
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
                            title="Upload your CV"
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
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full h-32 px-4 py-3 pr-12 text-primary-60 placeholder-primary-60 focus:outline-none resize-none"
                    placeholder="Write a brief introduction about yourself (strengths, weaknesses) and clearly state your desire and reason for applying for this position. (Optional)"
                  ></textarea>
                  <FilePenLine
                    size={24}
                    className="absolute top-3 right-4 text-secondary-40 cursor-pointer"
                  />
                </div>
                <div className="w-full flex flex-col px-4 mb-4 border-1 border-primary-60 bg-neutral-light-20 rounded-xl text-primary-60 focus:ring-2 focus:bg-white transition-all duration-300">
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
                      Email hotro@jobify.vn for timely support.
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-10 mb-4">
                  <button
                    onClick={onClose}
                    disabled={isLoading}
                    className="flex-1 rounded-full bg-primary-40 text-neutral-light-20 px-6 py-2 cursor-pointer disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSubmit}
                    disabled={isLoading || !selectedFile}
                    className="flex-6 rounded-full bg-accent text-neutral-light-20 px-6 py-2 cursor-pointer disabled:opacity-50"
                  >
                    {isLoading ? "Submitting..." : "Submit Application"}
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
