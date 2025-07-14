"use client";
import { useState } from "react";
import LeftArrow from "../../../components/arrowLeft";
import RightArrow from "../../../components/arrowRight";
import ReportHistory from "@web/components/reportHistory";

const reports = [
  {
    title: "Your Report (#21232) has been successfully sent!",
    report:
      "You sent a report to the company Jobify on May 28, 2025. Your report is now being handled. Please wait for a few hours for a response.",
    time: "2 days ago",
  },
  {
    title: "Your Report (#21232) has been successfully sent!",
    report:
      "You sent a report to the company Jobify on May 28, 2025. Your report is now being handled. Please wait for a few hours for a response.",
    time: "2 days ago",
  },
  {
    title: "Your Report (#21232) has been successfully sent!",
    report:
      "You sent a report to the company Jobify on May 28, 2025. Your report is now being handled. Please wait for a few hours for a response.",
    time: "2 days ago",
  },
  {
    title: "Your Report (#21232) has been successfully sent!",
    report:
      "You sent a report to the company Jobify on May 28, 2025. Your report is now being handled. Please wait for a few hours for a response.",
    time: "2 days ago",
  },
  {
    title: "Your Report (#21232) has been successfully sent!",
    report:
      "You sent a report to the company Jobify on May 28, 2025. Your report is now being handled. Please wait for a few hours for a response.",
    time: "2 days ago",
  },
  {
    title: "Your Report (#21232) has been successfully sent!",
    report:
      "You sent a report to the company Jobify on May 28, 2025. Your report is now being handled. Please wait for a few hours for a response.",
    time: "2 days ago",
  },
];

export default function RecruiterReportsPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const REPORT_PER_PAGE = 5; // 4x3
  const totalPages = Math.ceil(reports.length / REPORT_PER_PAGE);

  // Tính toán report hiển thị trên trang hiện tại
  const startIndex = (currentPage - 1) * REPORT_PER_PAGE;
  const endIndex = startIndex + REPORT_PER_PAGE;
  const currentReport = reports.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="w-full h-screen bg-neutral-light-60">
      <div className="flex flex-col justify-between px-20 py-10 space-y-6">
        <div className="text-accent font-bold text-3xl">Report history</div>
        <div className="w-full grid grid-cols-1 gap-2 bg-highlight-40 shadow-2xl p-4">
          {currentReport?.map((report, idx) => (
            <ReportHistory
              key={idx}
              title={report.title}
              report={report.report}
              time={report.time}
            />
          ))}
          <div className="w-full mt-4 flex justify-center items-center space-x-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              <LeftArrow />
            </button>
            <span className="font-semibold text-lg">
              {currentPage}/{totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              <RightArrow />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
