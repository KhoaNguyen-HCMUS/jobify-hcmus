"use client";
import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Experience } from "../services/candidateProfile";
import { formatDateForInput } from "../utils/dateUtils";

interface WorkExperienceProps {
  experiences: Partial<Experience>[];
  onExperiencesChange: (experiences: Partial<Experience>[]) => void;
}

export default function WorkExperience({ experiences, onExperiencesChange }: WorkExperienceProps) {
     const addExperience = () => {
     onExperiencesChange([...(experiences || []), {
      company_name: "",
      job_title: "",
      description: "",
      location: "",
      start_date: "",
      end_date: "",
      is_current: false
    }]);
  };

     const removeExperience = (index: number) => {
     onExperiencesChange((experiences || []).filter((_, i) => i !== index));
  };

     const updateExperience = (index: number, field: keyof Experience, value: any) => {
     const updatedExperiences = [...(experiences || [])];
    updatedExperiences[index] = { ...updatedExperiences[index], [field]: value };
    onExperiencesChange(updatedExperiences);
  };


  return (
    <div className="flex flex-col gap-4 px-4">
      <div className="flex justify-between items-center">
        <h3 className="text-accent font-bold text-xl">Work Experience</h3>
        <button
          onClick={addExperience}
          className="flex items-center gap-2 bg-accent text-neutral-light-20 px-4 py-2 rounded-lg hover:bg-accent-80 transition-colors"
        >
          <Plus size={16} />
          Add Experience
        </button>
      </div>
             {(experiences || []).map((exp, index) => (
        <div key={index} className="border border-primary-60 rounded-xl p-4 bg-neutral-light-20">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-primary font-semibold">Experience {index + 1}</h4>
            <button
              onClick={() => removeExperience(index)}
              className="text-red-500 hover:text-red-700"
            >
              <X size={20} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="block text-sm font-bold text-primary mb-2">Company Name</label>
              <input
                type="text"
                value={exp.company_name || ""}
                onChange={(e) => updateExperience(index, 'company_name', e.target.value)}
                placeholder="Enter company name"
                className="w-full border border-primary-60 px-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-1 focus:primary focus:bg-white transition-all duration-300"
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-sm font-bold text-primary mb-2">Job Title</label>
              <input
                type="text"
                value={exp.job_title || ""}
                onChange={(e) => updateExperience(index, 'job_title', e.target.value)}
                placeholder="Enter job title"
                className="w-full border border-primary-60 px-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-1 focus:primary focus:bg-white transition-all duration-300"
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-sm font-bold text-primary mb-2">Location</label>
              <input
                type="text"
                value={exp.location || ""}
                onChange={(e) => updateExperience(index, 'location', e.target.value)}
                placeholder="Enter location detail"
                className="w-full border border-primary-60 px-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-1 focus:primary focus:bg-white transition-all duration-300"
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-sm font-bold text-primary mb-2">Start Date</label>
                                   <input
                       type="date"
                       value={formatDateForInput(exp.start_date)}
                       onChange={(e) => updateExperience(index, 'start_date', e.target.value)}
                       className="w-full border border-primary-60 px-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-1 focus:primary focus:bg-white transition-all duration-300"
                     />
            </div>
            <div className="flex flex-col">
              <label className="block text-sm font-bold text-primary mb-2">End Date</label>
                                   <input
                       type="date"
                       value={formatDateForInput(exp.end_date)}
                       onChange={(e) => updateExperience(index, 'end_date', e.target.value)}
                       className="w-full border border-primary-60 px-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-1 focus:primary focus:bg-white transition-all duration-300"
                     />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`current-${index}`}
                checked={exp.is_current || false}
                onChange={(e) => updateExperience(index, 'is_current', e.target.checked)}
                className="w-4 h-4 text-accent bg-neutral-light-20 border-primary-60 rounded focus:ring-accent"
              />
              <label htmlFor={`current-${index}`} className="text-sm font-bold text-primary">
                Currently working here
              </label>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-bold text-primary mb-2">Description</label>
            <textarea
              value={exp.description || ""}
              onChange={(e) => updateExperience(index, 'description', e.target.value)}
              placeholder="Enter job description"
              className="w-full border border-primary-60 px-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-1 focus:primary focus:bg-white transition-all duration-300 min-h-[80px] resize-none"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
