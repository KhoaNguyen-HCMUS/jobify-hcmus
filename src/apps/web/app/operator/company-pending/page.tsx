"use client";
import { FilePenLine, Mail, Phone, MapPin } from "lucide-react";
import Notification from "../../../components/notification";
import JobCard from "../../../components/job/jobCard";
import usePagination from "../../../hooks/usePagination";
import Pagination from "../../../components/pagination";
import KeyWord from "@web/components/keyWord";

interface CompanyPendingProps {
  company: {
    date: string;
    companyName: string;
    status: string;
    flag: string;
    profile: string;
    time: string;
    note: string;
  };
}

export default function OperatorCompanyPendingPage({
  company,
}: CompanyPendingProps) {
  return (
    <div className="w-full h-full bg-neutral-light-60">
      <div className="flex flex-col px-20 py-10 gap-10">
        <div className="flex justify-between">
          <KeyWord />
          <div className="flex gap-2">
            <b className="text-primary">Request Time:</b>
            <span className="text-primary-80">form</span>
            <span className="bg-neutral-light text-primary px-6 rounded-full"></span>
            <span className="text-primary-80">to</span>
            <span className="bg-neutral-light text-primary px-6 rounded-full"></span>
            <span className="bg-accent text-neutral-light-20 px-6 rounded-full">
              Filter
            </span>
          </div>
        </div>

        <div></div>
      </div>
    </div>
  );
}
