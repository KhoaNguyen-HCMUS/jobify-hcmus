"use client";
import { BookUp } from "lucide-react";
import { useState, useEffect } from "react";
import KeyWord from "@web/components/keyWord";

interface JobPendingProps {
  job: {
    date: string;
    jobTitle: string;
    status: string;
    detail: string;
    time: string;
    note: string;
  };
}

const jobTitles = [
  "Chuyên Viên Kinh Doanh",
  "Nhân Viên Tư Vấn",
  "Quản Lý Dự Án",
  "Kỹ Sư Phần Mềm",
  "Nhân Sự Tuyển Dụng",
];
const statuss = ["Pending"];
const dates = ["01/07/2025"];
const times = ["15:11:03"];
const notes = ["Moderator's Note"];

const randomItem = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

export default function OperatorJobPendingPage({ job }: JobPendingProps) {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleFilter = () => {
    console.log("Filter from: ", fromDate, "to: ", toDate);
  };

  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleRowClick = (id: string) => {
    setSelectedJobId(id);
    setShowModal(true);
  };

  const [apps, setApps] = useState<any[]>([]);

  useEffect(() => {
    const generatedApps = Array.from({ length: 30 }, (_, i) => ({
      id: (i + 1).toString(),
      date: randomItem(dates),
      jobTitle: randomItem(jobTitles),
      status: randomItem(statuss),
      detail: <BookUp />,
      time: randomItem(times),
      note: randomItem(notes),
    }));

    setApps(generatedApps);
  }, []);

  const selectedJob = apps.find((c) => c.id === selectedJobId);

  return (
    <div className="w-full min-h-screen bg-neutral-light-60">
      <div className="flex flex-col px-6 lg:px-20 py-10 gap-10">
        <div className="flex flex-wrap justify-between">
          <KeyWord />
          <div className="flex gap-2 text-primary">
            <b className="pt-2">Request Time:</b>
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
        <div>
          <table className="w-full table-fixed">
            <thead>
              <tr className="bg-primary text-neutral-light-20 align-middle">
                <th className="w-4/13 border border-primary-60 p-2">
                  Job Title
                </th>
                <th className="w-2/13 border border-primary-60 p-2">Status</th>
                <th className="w-1/13 border border-primary-60 p-2">Detail</th>
                <th className="w-3/13 border border-primary-60 p-2">
                  Request Time
                </th>
                <th className="w-3/13 border border-primary-60 p-2">
                  Moderator's Note
                </th>
              </tr>
            </thead>
            <tbody>
              {apps.map((job, index) => (
                <tr
                  key={job.id}
                  onClick={() => handleRowClick(job.id)}
                  className={`py-2 px-4 text-primary-80 hover:bg-highlight transition-colors ${
                    index % 2 === 0 ? "bg-highlight-20" : "bg-highlight-40"
                  }`}
                >
                  <td className="w-4/13 border border-primary-60 p-2">
                    <span className="line-clamp-1">{job?.jobTitle}</span>
                  </td>
                  <td className="w-2/13 border border-primary-60 p-2">
                    <span className="flex justify-center line-clamp-1">
                      {job?.status}
                    </span>
                  </td>
                  <td className="w-1/13 border border-primary-60 p-2">
                    <span className="flex justify-center line-clamp-1">
                      {job?.detail}
                    </span>
                  </td>
                  <td className="w-3/13 border border-primary-60 p-2">
                    <span className="flex justify-center items-center line-clamp-1">
                      {job?.date} - {job?.time}
                    </span>
                  </td>
                  <td className="w-4/13 border border-primary-60 p-2">
                    <span className="line-clamp-1">{job?.note}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {showModal && selectedJob && (
            <div
              onClick={() => {
                setShowModal(false);
                setSelectedJobId(null);
              }}
              className="fixed inset-0 bg-primary-80 z-50 flex items-center justify-center"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="w-3/5 max-h-[90vh] overflow-y-auto bg-neutral-light rounded-md relative"
              ></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
