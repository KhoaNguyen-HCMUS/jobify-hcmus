import JobDetail from "../../../components/job/jobDetail";
import GoBack from "../../../components/goBack";
import ReportUser from "../../../components/reportUser";
import Reporter from "../../../components/reporter";

const reportUsers = [
  {
    logo: "/logo1.png",
    companyName: "Công ty ABC",
    companyIndustry: "Công nghệ",
    companyLocation: "Hà Nội",
    companyReason: "Sai su that",
  },
  {
    logo: "/logo2.png",
    companyName: "Công ty XYZ",
    companyIndustry: "Tài chính",
    companyLocation: "TP.HCM",
    companyReason: "Sai su that",
  },
];

const reporters = [
  {
    logo: "/logo1.png",
    candidateName: "Hinh Diem Xuan",
    candidateIndustry: "Công nghệ",
    candidateLocation: "Hà Nội",
    candidateReason:
      "This post advertises an investment program with unrealistic profit promises and requires an upfront payment before any detailed information is provided. These are typical signs of a Ponzi or pyramid scheme, aimed at defrauding users. There's no clear contact information or valid business license provided",
  },
  {
    logo: "/logo2.png",
    candidateName: "Nguyen Thi Nhu Quynh",
    candidateIndustry: "Tài chính",
    candidateLocation: "TP.HCM",
    candidateReason: "Sai su that",
  },
];

interface ReportProps {
  report: {
    reason: string;
    moderatorNote: string;
    moderator: string;
    reportStatus: string;
  };
}

export default function ReportDetailPage({ report }: ReportProps) {
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
      {reportUsers.map((report, index) => (
        <ReportUser key={index} report={report} />
      ))}

      {reporters.map((report, index) => (
        <Reporter key={index} report={report} />
      ))}
      <div>
        <div className="text-lg bg-primary text-neutral-light-20 px-4 py-2 rounded-t-lg">
          Moderator's Notes
        </div>
        <div className="bg-highlight-40 rounded-b-lg p-4">
          {report?.moderatorNote}
        </div>
      </div>
      <div className="flex gap-2">
        <span className="text-primary-80">Moderator:</span>
        <span className="text-primary">{report?.moderator}</span>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <span className="text-primary-80">Report Status:</span>
          <span className="text-accent">{report?.reportStatus}</span>
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
