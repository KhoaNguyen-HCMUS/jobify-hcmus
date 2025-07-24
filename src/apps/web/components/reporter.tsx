interface ReportProps {
  report: {
    logo: string;
    candidateName: string;
    candidateIndustry: string;
    candidateLocation: string;
  };
}

export default function Reporter({ report }: ReportProps) {
  return (
    <div>
      <div className="text-lg bg-primary text-neutral-light-20 px-4 py-2 rounded-t-lg">
        Reporter
      </div>
      <div className="flex gap-2 bg-highlight-40 rounded-b-lg p-4 relative">
        <img
          src="/avt.jpg"
          alt="logo"
          className="object-contain h-30 w-30 rounded-xl"
        />
        <div className="flex flex-col gap-2">
          <span className="text-primary">{report?.candidateName}</span>
          <span className="text-primary-80">{report?.candidateIndustry}</span>
          <span className="text-primary-80">{report?.candidateLocation}</span>
        </div>
      </div>
    </div>
  );
}
