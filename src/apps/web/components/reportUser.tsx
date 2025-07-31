interface ReportProps {
  report: {
    logo: string;
    companyName: string;
    companyIndustry: string;
    companyLocation: string;
    companyReason: string;
  };
}

export default function ReportUser({ report }: ReportProps) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="text-lg bg-primary text-neutral-light-20 px-4 py-2 rounded-t-lg">
          Reported User
        </div>
        <div className="flex gap-2 bg-highlight-40 rounded-b-lg p-4 relative">
          <img
            src="/avt.jpg"
            alt="logo"
            className="object-contain h-30 w-30 rounded-xl"
          />
          <div className="flex flex-col gap-2">
            <span className="text-primary">{report?.companyName}</span>
            <span className="text-primary-80">{report?.companyIndustry}</span>
            <span className="text-primary-80">{report?.companyLocation}</span>
          </div>
        </div>
      </div>
      <div>
        <div className="text-lg bg-primary text-neutral-light-20 px-4 py-2 rounded-t-lg">
          Report Reason
        </div>
        <div className="bg-highlight-40 rounded-b-lg p-4 text-primary">
          {report?.companyReason}
        </div>
      </div>
    </div>
  );
}
