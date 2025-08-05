import {
  MonitorCog,
  Megaphone,
  TagIcon,
  Coins,
  Speech,
  CardSim,
  GraduationCap,
  Bandage,
  Bolt,
  Palette,
  Forklift,
  WheatOff,
  Factory,
  Scale,
} from "lucide-react";

export interface Industry {
  id: number;
  icon: string;
  name: string;
}

export const industries: Industry[] = [
  {
    id: 1,
    icon: "MonitorCog",
    name: "Software & IT",
  },
  {
    id: 2,
    icon: "Megaphone",
    name: "Marketing & Advertising",
  },
  {
    id: 3,
    icon: "TagIcon",
    name: "Sales & Business Development",
  },
  {
    id: 4,
    icon: "Coins",
    name: "Accounting & Finance",
  },
  {
    id: 5,
    icon: "Speech",
    name: "Human Resources",
  },
  {
    id: 6,
    icon: "CardSim",
    name: "Customer Support & Service",
  },
  {
    id: 7,
    icon: "GraduationCap",
    name: "Education & Training",
  },
  {
    id: 8,
    icon: "Bandage",
    name: "Healthcare & Medical",
  },
  {
    id: 9,
    icon: "Bolt",
    name: "Engineering & Construction",
  },
  {
    id: 10,
    icon: "Palette",
    name: "Design & Creative Arts",
  },
  {
    id: 11,
    icon: "Forklift",
    name: "Operations & Logistics",
  },
  {
    id: 12,
    icon: "WheatOff",
    name: "Real Estate",
  },
  {
    id: 13,
    icon: "Factory",
    name: "Manufacturing & Labor",
  },
  {
    id: 14,
    icon: "Scale",
    name: "Legal & Compliance",
  },
];