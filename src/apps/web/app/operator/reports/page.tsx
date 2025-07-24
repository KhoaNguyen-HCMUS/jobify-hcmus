"use client";
import { useState } from "react";
import KeyWord from "../../../components/keyWord";
import { useRouter } from "next/navigation";
import { CircleX } from "lucide-react";

interface ReportsProps {
  reports: {
    content: string;
    dateReport: string;
    timeReport: string;
    status: string;
    user: string;
    dateModeration: string;
    timeModeration: string;
  };
}

const content = [
  "Tuyen dung nhan vien",
  "Tuyen dung nhan vien",
  "Tuyen dung nhan vien",
  "Tuyen dung nhan vien",
  "Tuyen dung nhan vien",
];
const datesReport = ["2023-10-01", "2023-10-02", "2023-10-03"];
const timesReport = ["10:00", "11:00", "12:00"];
const datesModer = ["2023-10-01", "2023-10-02", "2023-10-03"];
const timesModer = ["10:00", "11:00", "12:00"];
const statuses = ["Pending", "Approved", "Rejected"];
const users = ["Diem Xuan"];

const randomItem = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

const apps = Array.from({ length: 30 }, (_, i) => ({
  id: (i + 1).toString(),
  content: randomItem(content),
  dateReport: randomItem(datesReport),
  timeReport: randomItem(timesReport),
  dateModeration: randomItem(datesModer),
  timeModeration: randomItem(timesModer),
  status: randomItem(statuses),
  user: randomItem(users),
}));

export default function OperatorReportsPage({ reports }: ReportsProps) {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleFilter = () => {
    console.log("Filter from: ", fromDate, "to: ", toDate);
  };

  const router = useRouter();

  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleRowClick = (id: string) => {
    setSelectedReportId(id);
    setShowModal(true);
  };

  const selectedReport = apps.find((c) => c.id === selectedReportId);

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
              />
              <span className="text-primary-80 pt-2">to</span>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="bg-neutral-light-20 border border-primary-60 rounded-full px-4"
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
              />
              <span className="text-primary-80 pt-2">to</span>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="bg-neutral-light-20 border border-primary-60 rounded-full px-4"
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
              {apps.map((report, index) => (
                <tr
                  key={report.id}
                  onClick={() => handleRowClick(report.id)}
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
          {showModal && selectedReport && (
            <div
              onClick={() => {
                setShowModal(false);
                setSelectedReportId(null);
              }}
              className="fixed inset-0 bg-primary-80 z-50 flex items-center justify-center"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="w-3/5 max-h-[90vh] overflow-y-auto bg-neutral-light rounded-xl relative"
              >
                <div className="flex flex-col">
                  <div className="flex flex-col gap-2 mx-10 my-4">
                    <div className="flex justify-between">
                      <span className="text-primary text-2xl font-bold">
                        Profile:
                      </span>
                      <CircleX
                        size={24}
                        className="text-primary-80 cursor-pointer"
                        onClick={() => setShowModal(false)}
                      />
                    </div>
                    <div className="bg-neutral-light-40 shadow-md rounded-3xl">
                      <div className="flex flex-col gap-y-4 mx-10 my-4"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
