"use client";
import { useState } from "react";
import KeyWord from "../../../components/keyWord";
import { useRouter } from "next/navigation";
import { fakeReport } from "../../../components/fakeReport";

interface ReportsProps {
  reports: {
    id: number;
    content: string;
    dateReport: string;
    timeReport: string;
    status: string;
    user: string;
    dateModeration: string;
    timeModeration: string;
  };
}
export default function OperatorReportsPage() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const router = useRouter();

  return (
    <div className="w-full min-h-screen bg-neutral-light-60">
      <div className="flex flex-col px-6 lg:px-20 py-10 gap-10">
        <div className="flex flex-wrap justify-between">
          <KeyWord />
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 text-primary">
              <b className="pt-2">Report Time:</b>
              <span className="text-primary-80 pt-2">from</span>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="bg-neutral-light-20 border border-primary-60 rounded-full px-4"
                placeholder="Select Date"
              />
              <span className="text-primary-80 pt-2">to</span>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="bg-neutral-light-20 border border-primary-60 rounded-full px-4"
                placeholder="Select Date"
              />
              <button className="bg-accent hover:bg-secondary cursor-pointer text-neutral-light-20 px-4 py-1 rounded-full">
                Filter
              </button>
            </div>
            <div className="flex gap-2 text-primary">
              <b className="pt-2">Moderation Time:</b>
              <span className="text-primary-80 pt-2">from</span>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="bg-neutral-light-20 border border-primary-60 rounded-full px-4"
                placeholder="Select Date"
              />
              <span className="text-primary-80 pt-2">to</span>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="bg-neutral-light-20 border border-primary-60 rounded-full px-4"
                placeholder="Select Date"
              />
              <button className="bg-accent hover:bg-secondary cursor-pointer text-neutral-light-20 px-4 py-1 rounded-full">
                Filter
              </button>
            </div>
          </div>
        </div>

        <div>
          <table className="w-full table-fixed">
            <thead>
              <tr className="bg-primary text-neutral-light-20 align-middle">
                <th className="w-5/15 border border-primary-60 p-2">Content</th>
                <th className="w-3/15 border border-primary-60 p-2">
                  Report Time
                </th>
                <th className="w-1/15 border border-primary-60 p-2">Status</th>
                <th className="w-3/15 border border-primary-60 p-2">User</th>
                <th className="w-3/15 border border-primary-60 p-2">
                  Moderation Time
                </th>
              </tr>
            </thead>
            <tbody>
              {fakeReport.map((report, index) => (
                <tr
                  key={report.id}
                  onClick={() => router.push(`/reports/${report.id}`)}
                  className={`py-2 px-4 text-primary-80 hover:bg-highlight transition-colors cursor-pointer ${
                    index % 2 === 0 ? "bg-highlight-20" : "bg-highlight-40"
                  }`}
                >
                  <td className="w-5/15 border border-primary-60 p-2">
                    <span className="line-clamp-1">{report.content}</span>
                  </td>
                  <td className="w-3/15 border border-primary-60 p-2">
                    <span className="flex justify-center items-center line-clamp-1">
                      {report.dateReport} - {report.timeReport}
                    </span>
                  </td>
                  <td className="w-1/15 border border-primary-60 p-2">
                    <span className="line-clamp-1">{report.status}</span>
                  </td>
                  <td className="w-3/15 border border-primary-60 p-2">
                    <span className="line-clamp-1">{report.user}</span>
                  </td>
                  <td className="w-3/15 border border-primary-60 p-2">
                    <span className="flex justify-center items-center line-clamp-1">
                      {report.dateModeration} - {report.timeModeration}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
