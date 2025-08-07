import {
  Briefcase,
  CatIcon,
  Mail,
  MapPin,
  Phone,
  StarHalf,
  User,
  VenusAndMars,
  Globe,
} from "lucide-react";

interface InformationProps {
  title: string;
  icon?: React.ReactNode;
  inFor: string;
}

// Hàm chọn icon theo title
function getDefaultIcon(title: string): React.ReactNode {
  const titleLower = title.toLowerCase();
  if (titleLower.includes("fullName")) return <User className="w-4 h-4 mr-1" />;
  if (titleLower.includes("gender"))
    return <VenusAndMars className="w-4 h-4 mr-1" />;
  if (titleLower.includes("email")) return <Mail className="w-4 h-4 mr-1" />;
  if (titleLower.includes("phone")) return <Phone className="w-4 h-4 mr-1" />;
  if (titleLower.includes("location"))
    return <MapPin className="w-4 h-4 mr-1" />;
  if (titleLower.includes("industry") || titleLower.includes("profession"))
    return <Briefcase className="w-4 h-4 mr-1" />;
  if (titleLower.includes("github"))
    return <CatIcon className="w-4 h-4 mr-1" />;
  if (titleLower.includes("linkedIn"))
    return <StarHalf className="w-4 h-4 mr-1" />;
  if (titleLower.includes("website")) return <Globe className="w-4 h-4 mr-1" />;
  return <User className="w-4 h-4 mr-1" />; // fallback
}

export default function PersonalInformation({
  title,
  inFor,
  icon,
}: InformationProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-primary text-lg">
        <b>{title}:</b>
      </span>
      <div className="flex flex-wrap gap-2 items-center text-primary-80 font-semibold">
        {icon ?? getDefaultIcon(title)}
        <span>{inFor}</span>
      </div>
    </div>
  );
}
