"use client";
import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import SubCategoryList from "./subCategoryList";
import { getAllIndustries, Industry, getIndustriesByCategory, IndustryCategory } from "../services/industries";

interface MainCategoryItemProps {
  main: {
    category: string;
    id: string;
    isSelected?: boolean;
    onSelect?: (id: string) => void;
  };
}

export default function MainCategoryItem({ main }: MainCategoryItemProps) {
  const [open, setOpen] = useState(false);
  const [subCategories, setSubCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSubCategories = async () => {
      if (!open) return;
      
      try {
        setLoading(true);
        const response = await getAllIndustries();
        if (response.success && response.data) {
          const categories = getIndustriesByCategory(response.data);
          const mainCategory = categories.find(cat => cat.name === main.category);
          if (mainCategory) {
            setSubCategories(mainCategory.children.map(child => child.name));
          }
        }
      } catch (error) {
        console.error('Failed to fetch sub categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubCategories();
  }, [open, main.category]);

  const handleCategoryClick = () => {
    if (main.onSelect) {
      main.onSelect(main.id);
    }
  };

  return (
    <div className="flex flex-col justify-between hover:bg-neutral-light-80">
      <button
        onClick={handleCategoryClick}
        className={`flex justify-between items-center cursor-pointer w-full text-left ${
          main.isSelected ? 'bg-accent text-white' : ''
        }`}
      >
        <span className="px-4 py-2">{main.category}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setOpen(!open);
          }}
          className="p-2"
        >
          {open ? (
            <ChevronUp size={24} />
          ) : (
            <ChevronDown size={24} />
          )}
        </button>
      </button>

      {open && (
        <SubCategoryList 
          subCategories={loading ? ['Loading...'] : subCategories} 
        />
      )}
    </div>
  );
}
