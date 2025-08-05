"use client";
import { getIndustryIcon } from "../utils/industryIcon";
import { useRouter } from "next/navigation";
import { Industry } from "../services/industries";

interface CategoryCardProps {
  category: Industry;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const router = useRouter();
  const IconComponent = getIndustryIcon(category.name);

  const handleClick = () => {
    router.push(`/jobs?industry=${category.id}`);
  };

  return (
    <div 
      onClick={handleClick}
      className="flex flex-col rounded-2xl shadow-2xs border border-gray-200 transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg justify-center items-center py-10 m-6 cursor-pointer bg-white"
    >
      <IconComponent size={70} className="text-primary" />
      <h2 className="text-primary font-semibold mt-2">{category.name}</h2>
    </div>
  );
}
