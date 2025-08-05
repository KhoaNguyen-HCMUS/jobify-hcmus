"use client";
import { useState } from "react";
import KeyWord from "../../../components/keyWord";

interface LogsProps {
  log: {
    action: string;
    actor: string;
    role: string;
    date: string;
    time: string;
  };
}

const actions = [
  "Chuyên Viên Kinh Doanh",
  "Nhân Viên Tư Vấn",
  "Quản Lý Dự Án",
  "Kỹ Sư Phần Mềm",
  "Nhân Sự Tuyển Dụng",
];
const actors = [
  "Nguyen Van A",
  "Tran Thi B",
  "Le Hoang C",
  "Pham Minh D",
  "Doan Bao E",
];
const roles = [
  "Computer Science",
  "Business Administration",
  "Marketing",
  "Finance",
  "Hospitality Management",
];
const dates = ["01/07/2025"];
const times = ["15:11:03"];

const randomItem = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

const apps = Array.from({ length: 30 }, (_, i) => ({
  id: (i + 1).toString(),
  action: randomItem(actions),
  actor: randomItem(actors),
  role: randomItem(roles),
  date: randomItem(dates),
  time: randomItem(times),
}));

export default function OperatorLogsPage() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleFilter = () => {
    console.log("Filter from: ", fromDate, "to: ", toDate);
  };

  return (
    <div className="w-full h-full bg-neutral-light-60">
      <div className="flex flex-col px-6 lg:px-20 py-10 gap-10">
        <div className="flex flex-wrap justify-between">
          <KeyWord />
          <div className="flex gap-2 text-primary">
            <b className="pt-2">Date:</b>
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
        <div>
          <table className="w-full table-fixed">
            <thead>
              <tr className="bg-primary text-neutral-light-20 align-middle">
                <th className="w-5/9 border border-primary-60 p-2">Action</th>
                <th className="w-1/9 border border-primary-60 p-2">Actor</th>
                <th className="w-1/9 border border-primary-60 p-2">Role</th>
                <th className="w-2/9 border border-primary-60 p-2">
                  Created at
                </th>
              </tr>
            </thead>
            <tbody>
              {apps.map((log, index) => (
                <tr
                  key={log.id}
                  className={`py-2 px-4 text-primary-80 hover:bg-highlight transition-colors ${
                    index % 2 === 0 ? "bg-highlight-20" : "bg-highlight-40"
                  }`}
                >
                  <td className="w-5/9 border border-primary-60 p-2">
                    <span className="line-clamp-1">{log.action}</span>
                  </td>
                  <td className="w-1/9 border border-primary-60 p-2">
                    <span className="line-clamp-1">{log.actor}</span>
                  </td>
                  <td className="w-1/9 border border-primary-60 p-2">
                    <span className="line-clamp-1">{log.role}</span>
                  </td>
                  <td className="w-2/9 border border-primary-60 p-2">
                    <span className="flex justify-center items-center line-clamp-1">
                      {log.date} - {log.time}
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
