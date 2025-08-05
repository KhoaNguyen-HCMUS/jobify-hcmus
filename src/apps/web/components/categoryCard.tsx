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

interface CategoryCardProps {
  category: {
    icon: string;
    name: string;
  };
}

const iconMap: { [key: string]: React.ComponentType<any> } = {
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
};

export default function CategoryCard({ category }: CategoryCardProps) {
  const IconComponent = iconMap[category.icon];

  return (
    <div className="flex flex-col bg-neutral-light-20 rounded-2xl shadow-2xs border border-gray-200 transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg justify-center items-center py-10 m-6 cursor-pointer">
      {IconComponent && <IconComponent size={70} />}
      <h2 className="text-primary font-semibold">{category.name}</h2>
    </div>
  );
}
