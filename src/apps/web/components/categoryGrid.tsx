"use client";
import CategoryCard from "./categoryCard";
import {
  Bandage,
  Bolt,
  CardSim,
  Coins,
  Factory,
  Forklift,
  GraduationCap,
  Megaphone,
  MonitorCog,
  Palette,
  Speech,
  TagIcon,
  WheatOff,
  Scale,
} from "lucide-react";
import usePagination from "../hooks/usePagination";
import Pagination from "./pagination";

const categories = [
  {
    id: 1,
    icon: <MonitorCog size={70} />,
    name: "Software & IT",
  },
  {
    id: 2,
    icon: <Megaphone size={70} />,
    name: "Marketing & Advertising",
  },
  {
    id: 3,
    icon: <TagIcon size={70} />,
    name: "Sales & Business Development",
  },
  {
    id: 4,
    icon: <Coins size={70} />,
    name: "Accounting & Finance",
  },
  {
    id: 5,
    icon: <Speech size={70} />,
    name: "Human Resources",
  },
  {
    id: 6,
    icon: <CardSim size={70} />,
    name: "Customer Support & Service",
  },
  {
    id: 7,
    icon: <GraduationCap size={70} />,
    name: "Education & Training",
  },
  {
    id: 8,
    icon: <Bandage size={70} />,
    name: "Healthcare & Medical",
  },
  {
    id: 9,
    icon: <Bolt size={70} />,
    name: "Engineering & Construction",
  },
  {
    id: 10,
    icon: <Palette size={70} />,
    name: "Design & Creative Arts",
  },
  {
    id: 11,
    icon: <Forklift size={70} />,
    name: "Operations & Logistics",
  },
  {
    id: 12,
    icon: <WheatOff size={70} />,
    name: "Real Estate",
  },
  {
    id: 13,
    icon: <Factory size={70} />,
    name: "Manufacturing & Labor",
  },
  {
    id: 14,
    icon: <Scale size={70} />,
    name: "Legal & Compliance",
  },
];
export default function CategoryGrid() {
  const { page, maxPage, current, next, prev } = usePagination(categories, 8);

  return (
    <div>
      <div className="mx-7">
        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          {/* {current.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))} */}
        </div>
        <div className="py-4">
          <Pagination
            page={page}
            maxPage={maxPage}
            onNext={next}
            onPrev={prev}
          />
        </div>
      </div>
    </div>
  );
}
