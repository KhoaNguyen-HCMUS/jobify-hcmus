import { Briefcase, MapPin, User, Globe, Barcode } from "lucide-react";

interface InformationProps {
  title: string;
  icon?: React.ReactNode;
  inFor: string;
}

// Hàm chọn icon theo title
function getDefaultIcon(title: string): React.ReactNode {
  const titleLower = title.toLowerCase();
  if (titleLower.includes("companyName"))
    return <User className="w-4 h-4 mr-1" />;
  if (
    titleLower.includes("taxCode") ||
    titleLower.includes("businessLicenseNumber")
  )
    return <Barcode className="w-4 h-4 mr-1" />;
  if (titleLower.includes("address"))
    return <MapPin className="w-4 h-4 mr-1" />;
  if (titleLower.includes("industry") || titleLower.includes("profession"))
    return <Briefcase className="w-4 h-4 mr-1" />;
  if (titleLower.includes("profession"))
    return <Briefcase className="w-4 h-4 mr-1" />;
  if (titleLower.includes("website")) return <Globe className="w-4 h-4 mr-1" />;
  return <User className="w-4 h-4 mr-1" />; // fallback
}

export default function CompanyInformation({
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
