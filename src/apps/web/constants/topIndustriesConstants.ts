import { getIndustryIcon } from '../utils/industryIcon';

export interface Industry {
  id: number;
  name: string;
}

export const industries: Industry[] = [
  {
    id: 1,
    name: "Software & IT",
  },
  {
    id: 2,
    name: "Marketing & Advertising",
  },
  {
    id: 3,
    name: "Sales & Business Development",
  },
  {
    id: 4,
    name: "Accounting & Finance",
  },
  {
    id: 5,
    name: "Human Resources",
  },
  {
    id: 6,
    name: "Customer Support & Service",
  },
  {
    id: 7,
    name: "Education & Training",
  },
  {
    id: 8,
    name: "Healthcare & Medical",
  },
  {
    id: 9,
    name: "Engineering & Construction",
  },
  {
    id: 10,
    name: "Design & Creative Arts",
  },
  {
    id: 11,
    name: "Operations & Logistics",
  },
  {
    id: 12,
    name: "Real Estate",
  },
  {
    id: 13,
    name: "Manufacturing & Labor",
  },
  {
    id: 14,
    name: "Legal & Compliance",
  },
];

// Helper function to get icon component for an industry
export function getIndustryIconComponent(industryName: string) {
  return getIndustryIcon(industryName);
}