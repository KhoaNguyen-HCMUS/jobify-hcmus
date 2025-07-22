"use client";
import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  DollarSign,
  FilePenLine,
  PlusIcon,
  Trash,
} from "lucide-react";

interface SystemSettings {
  system: {
    defaultCoinRate: string;
    maxJobPostPerDay: string;
    jobPostCost: string;
    announcementBanner: string;
    supportEmail: string;
    passwordResetExpirationMinutes: string;
  };
}

const systems = [
  {
    defaultCoinRate: "10000",
    maxJobPostPerDay: "10",
    jobPostCost: "10",
    announcementBanner: "Find Opportunities that Fit You Best!",
    supportEmail: "support@jobify.com",
    passwordResetExpirationMinutes: "10",
  },
];

const subs: Record<string, string[]> = {
  "Software & IT": [
    "Software Engineer",
    "Data Science & Analytics",
    "Systems & Network Administration",
    "Cybersecurity",
    "Software Quality Assurance",
  ],
  "Marketing & Advertising": [
    "Digital Marketing",
    "Content Marketing",
    "Public Relations (PR)",
    "Brand Development",
    "Market Research",
  ],
  "Sales & Business Development": [
    "Account Management",
    "New Business Development",
    "E-commerce Sales",
    "Sales Support",
    "Regional/Area Sales Management",
  ],
  "Accounting & Finance": [
    "Financial Accounting",
    "Management Accounting",
    "Financial Analysis",
    "Auditing",
    "Corporate Finance",
  ],
  "Human Resources": [
    "Recruitment",
    "Learning & Development (L&D)",
    "Compensation & Benefits (C&B)",
    "Employee Relations",
    "Performance Management",
  ],
  "Customer Support & Service": [
    "Customer Care",
    "Technical Support",
    "Customer Experience (CX Management)",
    "Customer Service Representative",
    "Service Quality Assurance",
  ],
  "Education & Training": [
    "Teaching",
    "Curriculum Development",
    "Educational Counseling",
    "Corporate Training",
    "Educational Administration",
  ],
  "Healthcare & Medical": [
    "Nursing",
    "Physicians & Medical Specialists",
    "Pharmacy",
    "Medical Technologists/Technicians",
    "Hospital Management & Public Health",
  ],
  "Engineering & Construction": [
    "Civil Engineering",
    "Mechanical Engineering",
    "Electrical Engineering",
    "Construction Project Management",
    "Architecture",
  ],
  "Design & Creative Arts": [
    "Graphic Design",
    "User Experience (UX) Design",
    "User Interface (UI) Design",
    "Fashion Design",
    "Multimedia Content Creation",
  ],
  "Operations & Logistics": [
    "Supply Chain Management",
    "Warehouse Management",
    "Transportation Management",
    "Operations Analysis",
    "Operations Support",
  ],
  "Real Estate": [
    "Real Estate Agent/Broker",
    "Real Estate Investment",
    "Property Management",
    "Real Estate Appraisal",
    "Real Estate Development",
  ],
  "Manufacturing & Labor": [
    "Manufacturing Engineering",
    "Quality Control/Assurance",
    "Factory Operations Management",
    "Production Control",
    "Occupational Health & Safety (OH&S)",
  ],
  "Legal & Compliance": [
    "Lawyer/Attorney",
    "Corporate Legal Counsel",
    "Compliance Officer",
    "Paralegal/Legal Assistant",
    "Intellectual Property (IP)",
  ],
};

const mains = [
  {
    id: 1,
    category: "Software & IT",
  },
  {
    id: 2,
    category: "Marketing & Advertising",
  },
  {
    id: 3,
    category: "Sales & Business Development",
  },
  {
    id: 4,
    category: "Accounting & Finance",
  },
  {
    id: 5,
    category: "Human Resources",
  },
  {
    id: 6,
    category: "Customer Support & Service",
  },
  {
    id: 7,
    category: "Education & Training",
  },
  {
    id: 8,
    category: "Healthcare & Medical",
  },
  {
    id: 9,
    category: "Engineering & Construction",
  },
  {
    id: 10,
    category: "Design & Creative Arts",
  },
  {
    id: 11,
    category: "Operations & Logistics",
  },
  {
    id: 12,
    category: "Real Estate",
  },
  {
    id: 13,
    category: "Manufacturing & Labor",
  },
  {
    id: 14,
    category: "Legal & Compliance",
  },
];

export default function OperatorSystemSettingsPage({ system }: SystemSettings) {
  const [open, setOpen] = useState(false);
  const [nextOpen, setNextOpen] = useState<number | null>(null);

  const [settingOpen, setSettingOpen] = useState(false);
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="w-full min-h-screen bg-neutral-light-60">
      <div className="flex flex-col px-6 lg:px-20 py-10 gap-4">
        <button
          onClick={() => setOpen(!open)}
          className="flex justify-between bg-neutral-light-20 hover:bg-neutral-light font-semibold text-primary px-4 py-1 cursor-pointer rounded-md shadow-md"
        >
          <span className="text-xl px-4 py-2">Industries</span>
          {open ? (
            <ChevronUp className="text-primary" size={24} />
          ) : (
            <ChevronDown className="text-primary" size={24} />
          )}
        </button>
        {open && (
          <div>
            {mains.map((main) => {
              const isOpen = nextOpen === main.id;
              const subCategories = subs[main.category] || [];

              return (
                <div key={main.id} className="flex">
                  <div className="flex-1 flex flex-col justify-between bg-primary my-2 rounded-md mx-4">
                    <button
                      onClick={() => setNextOpen(isOpen ? null : main.id)}
                      className="flex justify-between items-center cursor-pointer"
                    >
                      <span className="text-neutral-light-20 px-4 py-2">
                        {main.category}
                      </span>
                      <div className="flex gap-2 px-4">
                        {isOpen ? (
                          <ChevronUp
                            className="text-neutral-light-20 cursor-pointer"
                            size={24}
                          />
                        ) : (
                          <ChevronDown
                            className="text-neutral-light-20 cursor-pointer"
                            size={24}
                          />
                        )}
                        <FilePenLine
                          size={24}
                          className="text-neutral-light-20 cursor-pointer"
                        />
                        <Trash
                          size={24}
                          className="text-neutral-light-20 cursor-pointer"
                        />
                      </div>
                    </button>

                    {isOpen && (
                      <div>
                        {subCategories.length > 0 ? (
                          subCategories.map((item, index) => (
                            <button
                              key={`${item}-${index}`}
                              className="w-full text-left font-semibold text-primary bg-neutral-light-60 hover:bg-neutral-light cursor-pointer px-8 py-1"
                            >
                              <span>{item}</span>
                            </button>
                          ))
                        ) : (
                          <p className="px-4 py-2 text-sm text-neutral-60">
                            No subcategories available.
                          </p>
                        )}
                        <button className="w-full flex text-left font-semibold text-primary bg-neutral-light-60 hover:bg-neutral-light cursor-pointer px-8 py-1">
                          <PlusIcon size={24} />
                          <span>Add</span>
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="flex-1"></div>
                </div>
              );
            })}
            <button className="flex items-center px-4 mx-4 rounded-md py-2 mt-2 text-neutral-light-20 bg-primary cursor-pointer">
              <PlusIcon size={24} />
              <span>Add new</span>
            </button>
          </div>
        )}
        <div className="flex flex-col gap-4 bg-neutral-light-40 shadow-md rounded-md">
          <button
            onClick={() => setSettingOpen(!settingOpen)}
            className="w-full flex justify-between bg-neutral-light-20 rounded-t-md hover:bg-neutral-light cursor-pointer px-4 py-1"
          >
            <span className="text-primary font-semibold text-lg px-4 py-2">
              System Settings
            </span>
            {settingOpen ? (
              <ChevronUp className="text-primary-80" size={24} />
            ) : (
              <ChevronDown className="text-primary-80" size={24} />
            )}
          </button>
          {settingOpen && (
            <div className="flex flex-col space-y-4 font-semibold bg-neutral-light-40 text-primary px-4 pb-4 rounded-b-md">
              <div className="flex justify-between text-center items-center border bg-neutral-light-20 border-primary-40 px-4 py-4">
                <span>Maintenance Mode</span>
                <button
                  onClick={() => setEnabled(!enabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                            ${enabled ? "bg-accent" : "bg-primary-40"}`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-neutral-light-20 transition-transform
                              ${enabled ? "translate-x-5" : "translate-x-1"}`}
                  />
                </button>
              </div>
              <div className="flex justify-between text-center items-center border bg-neutral-light-20 border-primary-40 px-4 py-3">
                <span>Default Coin Rate</span>
                <div className="flex items-center gap-2">
                  <b className="text-primary-60">VNĐ</b>
                  <span className="w-30 overflow-x-auto whitespace-nowrap border border-primary-40 px-4 py-1">
                    {systems[0]?.defaultCoinRate}
                  </span>
                </div>
              </div>
              <div className="flex justify-between text-center items-center border bg-neutral-light-20 border-primary-40 px-4 py-3">
                <span>Max Job Post Per Day</span>
                <span className="w-30 overflow-x-auto whitespace-nowrap border border-primary-40 px-4 py-1">
                  {systems[0]?.maxJobPostPerDay}
                </span>
              </div>
              <div className="flex justify-between text-center items-center border bg-neutral-light-20 border-primary-40 px-4 py-3">
                <span>Job Post Cost</span>
                <div className="flex items-center gap-2">
                  <DollarSign className="border border-primary-80 text-primary-80 rounded-full bg-[#FCCA00]" />
                  <span className="w-30 overflow-x-auto whitespace-nowrap border border-primary-40 px-4 py-1">
                    {systems[0]?.jobPostCost}
                  </span>
                </div>
              </div>
              <div className="flex justify-between text-center items-center border bg-neutral-light-20 border-primary-40 px-4 py-3">
                <span>Announcement Banner</span>
                <span className="w-100 overflow-x-auto whitespace-nowrap border border-primary-40 px-4 py-1">
                  {systems[0]?.announcementBanner}
                </span>
              </div>
              <div className="flex justify-between text-center items-center border bg-neutral-light-20 border-primary-40 px-4 py-3">
                <span>Support Email</span>
                <span className="w-60 overflow-x-auto whitespace-nowrap border border-primary-40 px-4 py-1">
                  {systems[0]?.supportEmail}
                </span>
              </div>
              <div className="flex justify-between text-center items-center border bg-neutral-light-20 border-primary-40 px-4 py-3">
                <span>Password Reset Expiration Minutes</span>
                <span className="w-30 overflow-x-auto whitespace-nowrap border border-primary-40 px-4 py-1">
                  {systems[0]?.passwordResetExpirationMinutes}
                </span>
              </div>
              <div className="flex gap-4">
                <button className="rounded-full text-primary bg-secondary-40 hover:bg-accent hover:text-neutral-light-20 px-6 py-2 cursor-pointer">
                  Cancel
                </button>
                <button className="rounded-full text-neutral-light-20 bg-accent hover:bg-secondary-40 hover:text-primary px-6 py-2 cursor-pointer">
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
