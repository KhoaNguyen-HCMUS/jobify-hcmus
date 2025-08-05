"use client";
import ReportHistory from "../../../components/reportHistory";
import usePagination from "../../../hooks/usePagination";
import Pagination from "../../../components/pagination";

interface ReportProps {
  report: { title: string; text: string; time: string };
}

const reports = [
  {
    title: "Your Report (#21232) has been successfully sent!",
    text: "You sent a report to the company Jobify on May 28, 2025. Your report is now being handled. Please wait for a few hours for a response.",
    time: "2 days ago",
  },
  {
    title: "Your Report (#21232) has been successfully sent!",
    text: "You sent a report to the company Jobify on May 28, 2025. Your report is now being handled. Please wait for a few hours for a response.",
    time: "2 days ago",
  },
  {
    title: "Your Report (#21232) has been successfully sent!",
    text: "You sent a report to the company Jobify on May 28, 2025. Your report is now being handled. Please wait for a few hours for a response.",
    time: "2 days ago",
  },
  {
    title: "Your Report (#21232) has been successfully sent!",
    text: "You sent a report to the company Jobify on May 28, 2025. Your report is now being handled. Please wait for a few hours for a response.",
    time: "2 days ago",
  },
  {
    title: "Your Report (#21232) has been successfully sent!",
    text: "You sent a report to the company Jobify on May 28, 2025. Your report is now being handled. Please wait for a few hours for a response.",
    time: "2 days ago",
  },
  {
    title: "Your Report (#21232) has been successfully sent!",
    text: "You sent a report to the company Jobify on May 28, 2025. Your report is now being handled. Please wait for a few hours for a response.",
    time: "2 days ago",
  },
];

export default function RecruiterReportsPage() {
  const { page, maxPage, current, next, prev } = usePagination(reports, 5);

  return (
    <div className="w-full h-screen bg-neutral-light-60">
      <div className="flex flex-col justify-between px-20 py-10 space-y-6">
        <div className="flex justify-between">
          <div className="text-accent font-bold text-3xl">Report History</div>
        </div>
        <div className="w-full grid grid-cols-1 gap-2 bg-highlight-40 shadow-2xl p-4">
          {current.map((report, idx) => (
            <ReportHistory
              key={idx}
              title={report.title}
              report={report.text}
              time={report.time}
            />
          ))}
          <Pagination
            page={page}
            maxPage={maxPage}
            onNext={next}
            onPrev={prev}
          />
        </div>
      </div>
    </div>
  );
}
