"use client";
import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Education } from "../services/profile";
import { formatDateForInput } from "../utils/dateUtils";

interface EducationProps {
  educations: Partial<Education>[];
  onEducationsChange: (educations: Partial<Education>[]) => void;
}

export default function EducationComponent({ educations, onEducationsChange }: EducationProps) {
     const addEducation = () => {
     onEducationsChange([...(educations || []), {
      institution: "",
      degree: "",
      field_of_study: "",
      grade: "",
      description: "",
      start_date: "",
      end_date: ""
    }]);
  };

     const removeEducation = (index: number) => {
     onEducationsChange((educations || []).filter((_, i) => i !== index));
  };

     const updateEducation = (index: number, field: keyof Education, value: any) => {
     const updatedEducations = [...(educations || [])];
    updatedEducations[index] = { ...updatedEducations[index], [field]: value };
    onEducationsChange(updatedEducations);
  };

  return (
    <div className="flex flex-col gap-4 px-4">
      <div className="flex justify-between items-center">
        <h3 className="text-accent font-bold text-xl">Education</h3>
        <button
          onClick={addEducation}
          className="flex items-center gap-2 bg-accent text-neutral-light-20 px-4 py-2 rounded-lg hover:bg-accent-80 transition-colors"
        >
          <Plus size={16} />
          Add Education
        </button>
      </div>
             {(educations || []).map((edu, index) => (
        <div key={index} className="border border-primary-60 rounded-xl p-4 bg-neutral-light-20">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-primary font-semibold">Education {index + 1}</h4>
            <button
              onClick={() => removeEducation(index)}
              className="text-red-500 hover:text-red-700"
            >
              <X size={20} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="block text-sm font-bold text-primary mb-2">Institution</label>
              <input
                type="text"
                value={edu.institution || ""}
                onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                placeholder="Enter institution name"
                className="w-full border border-primary-60 px-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-1 focus:primary focus:bg-white transition-all duration-300"
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-sm font-bold text-primary mb-2">Degree</label>
              <input
                type="text"
                value={edu.degree || ""}
                onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                placeholder="Enter degree"
                className="w-full border border-primary-60 px-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-1 focus:primary focus:bg-white transition-all duration-300"
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-sm font-bold text-primary mb-2">Field of Study</label>
              <input
                type="text"
                value={edu.field_of_study || ""}
                onChange={(e) => updateEducation(index, 'field_of_study', e.target.value)}
                placeholder="Enter field of study"
                className="w-full border border-primary-60 px-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-1 focus:primary focus:bg-white transition-all duration-300"
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-sm font-bold text-primary mb-2">Grade</label>
              <input
                type="text"
                value={edu.grade || ""}
                onChange={(e) => updateEducation(index, 'grade', e.target.value)}
                placeholder="Enter grade"
                className="w-full border border-primary-60 px-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-1 focus:primary focus:bg-white transition-all duration-300"
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-sm font-bold text-primary mb-2">Start Date</label>
                                   <input
                       type="date"
                       value={formatDateForInput(edu.start_date)}
                       onChange={(e) => updateEducation(index, 'start_date', e.target.value)}
                       className="w-full border border-primary-60 px-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-1 focus:primary focus:bg-white transition-all duration-300"
                     />
            </div>
            <div className="flex flex-col">
              <label className="block text-sm font-bold text-primary mb-2">End Date</label>
                                   <input
                       type="date"
                       value={formatDateForInput(edu.end_date)}
                       onChange={(e) => updateEducation(index, 'end_date', e.target.value)}
                       className="w-full border border-primary-60 px-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-1 focus:primary focus:bg-white transition-all duration-300"
                     />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-bold text-primary mb-2">Description</label>
            <textarea
              value={edu.description || ""}
              onChange={(e) => updateEducation(index, 'description', e.target.value)}
              placeholder="Enter education description"
              className="w-full border border-primary-60 px-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-1 focus:primary focus:bg-white transition-all duration-300 min-h-[80px] resize-none"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
