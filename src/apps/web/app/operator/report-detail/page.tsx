import JobDetail from "../../../components/job/jobDetail";
import GoBack from "../../../components/goBack";
import ReportUser from "../../../components/reportUser";
import Reporter from "../../../components/reporter";
import { Suspense } from "react";

interface ReportProps {
  report: {
    reason: string;
    moderatorNote: string;
    moderator: string;
    reportStatus: string;
    logo: string;
    companyName: string;
    companyIndustry: string;
    companyLocation: string;
    candidateName: string;
    candidateIndustry: string;
    candidateLocation: string;
  };
}

const reportDetail = {
  reason: "Inappropriate content",
  moderatorNote: "This report has been reviewed and requires further action.",
  moderator: "John Doe",
  reportStatus: "Pending",
  logo: "/company-logo.jpg",
  companyName: "Tech Innovations Inc.",
  companyIndustry: "Information Technology",
  companyLocation: "San Francisco, CA",
  candidateName: "Jane Smith",
  candidateIndustry: "Software Development",
  candidateLocation: "New York, NY",
  companyReason: "Inappropriate job posting"
};

function ReportDetailContent() {
  return (
    <div className="flex flex-col gap-4 mx-10 my-6">
      <GoBack />
      <div>
        <div className="bg-primary text-neutral-light-20 px-4 py-2 font-bold rounded-t-lg text-lg">
          Reported Content
        </div>
        <div className="bg-highlight-40 rounded-b-lg p-4">
          <JobDetail />
        </div>
      </div>
      <ReportUser report={reportDetail} />
      <Reporter report={reportDetail} />
      <div>
        <div className="text-lg bg-primary text-neutral-light-20 px-4 py-2 rounded-t-lg">
          Report Reason
        </div>
        <div className="bg-highlight-40 rounded-b-lg p-4">{reportDetail?.reason}</div>
      </div>
      <div>
        <div className="text-lg bg-primary text-neutral-light-20 px-4 py-2 rounded-t-lg">
          Moderator's Notes
        </div>
        <div className="bg-highlight-40 rounded-b-lg p-4">
          {reportDetail?.moderatorNote}
        </div>
      </div>
      <div className="flex gap-2">
        <span className="text-primary-80">Moderator:</span>
        <span className="text-primary">{reportDetail?.moderator}</span>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <span className="text-primary-80">Report Status:</span>
          <span className="text-accent">{reportDetail?.reportStatus}</span>
        </div>
        <div className="flex gap-2">
          <button className="bg-accent text-neutral-light-20 px-4 py-2 cursor-pointer hover:bg-secondary rounded-full">
            Approve
          </button>
          <button className="bg-primary-80 text-neutral-light-20 px-4 py-2 cursor-pointer hover:bg-secondary rounded-full">
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ReportDetailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReportDetailContent />
    </Suspense>
  );
}
