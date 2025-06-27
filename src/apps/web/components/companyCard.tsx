interface CompanyCardProps {
  company: {
    companyName: string;
    province: string;
    major: string;
    image: string;
    name: string;
    totalJob: string;
  };
}

export default function companyCard({ company }: CompanyCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg cursor-pointer">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-16 h-16 rounded-xl overflow-hidden">
          <img
            src={company.image}
            alt={company.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="font-bold text-lg text-text line-clamp-1">
            {company.companyName}
          </h3>
          <p className="text-text-80">{company.major}</p>
        </div>
      </div>
      <div className="flex justify-between items-center text-sm">
        <span className="text-primary-80 font-semibold px-4 py-2 bg-accent-20 rounded-full">
          {company.totalJob}
        </span>
        <span className="text-primary-80 font-semibold px-4 py-2 bg-accent-20 rounded-full">
          {company.province}
        </span>
      </div>
    </div>
  );
}
