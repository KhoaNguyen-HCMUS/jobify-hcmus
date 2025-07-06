"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import SubCategoryList from "./subCategoryList";

interface MainCategoryItemProps {
  main: {
    category: string;
  };
}

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

export default function MainCategoryItem({ main }: MainCategoryItemProps) {
  const [open, setOpen] = useState(false);
  const subCategories = subs[main.category] || [];

  return (
    <div className="flex flex-col justify-between hover:bg-neutral-light-80">
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center cursor-pointer"
      >
        <span className="text-primary px-4 py-2">{main.category}</span>
        {open ? (
          <ChevronUp className="text-primary" size={24} />
        ) : (
          <ChevronDown className="text-primary" size={24} />
        )}
      </button>

      {open && <SubCategoryList subCategories={subCategories} />}
    </div>
  );
}
