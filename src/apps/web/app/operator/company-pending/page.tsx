"use client";
import { BookUp, CircleX, Info, Phone, SquarePlus } from "lucide-react";
import { useState } from "react";
import KeyWord from "../../../components/keyWord";
import ModeratorNote from "@web/components/moderatorNote";
import RejectReason from "@web/components/rejectReason";

interface CompanyPendingProps {
  company: {
    date: string;
    companyName: string;
    status: string;
    flag: string;
    profile: string;
    time: string;
    note: string;
    taxCode: string;
    businessLicenseNumber: string;
    companySize: string;
    companyWebsite: string;
    description: string;
    industry: string;
    companyPhoneNumber: string;
    companyEmail: string;
    personEmail: string;
    address: string;
    moderatorNote: string;
  };
}

const companyNames = [
  "Chuyên Viên Kinh Doanh",
  "Nhân Viên Tư Vấn",
  "Quản Lý Dự Án",
  "Kỹ Sư Phần Mềm",
  "Nhân Sự Tuyển Dụng",
];
const statuss = ["Pending"];
const flags = ["1"];
const dates = ["01/07/2025"];
const times = ["15:11:03"];
const notes = ["Moderator's Note"];
const taxCodes = ["01011234567"];
const businessLicenseNumber = ["0101234567"];
const companySize = ["400"];
const companyWebsite = ["https://www.unilever.com"];
const description = [
  "Unilever Pureit – the world's No. 1 best-selling home water purifier brand belonging to Unilever Group.Unilever is one of the world's leading multinational corporations specializing in personal care and family care products. Unilever currently operates in more than 190 countries and territories with a commitment to improving the quality of life of people around the world through its products and services.",
];
const industry = ["Marketing & Advertising"];
const companyPhoneNumber = ["0102030405"];
const companyEmail = ["unilevervn@gmail.com"];
const personEmail = ["unilevervn@gmail.com"];
const address = ["156 Nguyễn Lương Bằng, Tân Phú, Hồ Chí Minh"];
const moderatorNote = [""];

const randomItem = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

const apps = Array.from({ length: 30 }, (_, i) => ({
  id: (i + 1).toString(),
  date: randomItem(dates),
  companyName: randomItem(companyNames),
  status: randomItem(statuss),
  flag: randomItem(flags),
  profile: <BookUp />,
  time: randomItem(times),
  note: randomItem(notes),
  taxCode: randomItem(taxCodes),
  businessLicenseNumber: randomItem(businessLicenseNumber),
  companySize: randomItem(companySize),
  companyWebsite: randomItem(companyWebsite),
  description: randomItem(description),
  industry: randomItem(industry),
  companyPhoneNumber: randomItem(companyPhoneNumber),
  companyEmail: randomItem(companyEmail),
  personEmail: randomItem(personEmail),
  address: randomItem(address),
  moderatorNote: randomItem(moderatorNote),
}));

export default function OperatorCompanyPendingPage({
  company,
}: CompanyPendingProps) {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);

  const handleRowClick = (id: string) => {
    setSelectedCompanyId(id);
    setShowModal(true);
  };

  const selectedCompany = apps.find((c) => c.id === selectedCompanyId);

  const [isOpen, setIsOpen] = useState(false);

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
                <th className="w-4/15 border border-primary-60 p-2">
                  Company Name
                </th>
                <th className="w-2/15 border border-primary-60 p-2">Status</th>
                <th className="w-1/15 border border-primary-60 p-2">Flag</th>
                <th className="w-1/15 border border-primary-60 p-2">Profile</th>
                <th className="w-3/15 border border-primary-60 p-2">
                  Request Time
                </th>
                <th className="w-4/15 border border-primary-60 p-2">
                  Moderator's Note
                </th>
              </tr>
            </thead>
            <tbody>
              {apps.map((companies, index) => (
                <tr
                  key={companies.id}
                  onClick={() => handleRowClick(companies.id)}
                  className={`py-2 px-4 text-primary-80 hover:bg-highlight transition-colors cursor-pointer ${
                    index % 2 === 0 ? "bg-highlight-20" : "bg-highlight-40"
                  }`}
                >
                  <td className="w-4/15 border border-primary-60 p-2">
                    <span className="line-clamp-1">
                      {companies.companyName}
                    </span>
                  </td>
                  <td className="w-2/15 border border-primary-60 p-2">
                    <span className="line-clamp-1">{companies.status}</span>
                  </td>
                  <td className="w-1/15 border border-primary-60 p-2">
                    <span className="line-clamp-1">{companies.flag}</span>
                  </td>
                  <td className="w-1/15 border border-primary-60 p-2">
                    <span className="line-clamp-1">{companies.profile}</span>
                  </td>
                  <td className="w-3/15 border border-primary-60 p-2">
                    <span className="flex justify-center items-center line-clamp-1">
                      {companies.date} - {companies.time}
                    </span>
                  </td>
                  <td className="w-4/15 border border-primary-60 p-2">
                    <span className="line-clamp-1">{companies.note}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {showModal && selectedCompanyId && (
            <div
              onClick={() => {
                setShowModal(false);
                setSelectedCompanyId(null);
              }}
              className="fixed inset-0 bg-primary-80 z-50 flex items-center justify-center"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="w-3/5 max-h-[90vh] overflow-y-auto bg-neutral-light rounded-md relative"
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
                      <div className="flex flex-col gap-y-4 mx-10 my-4">
                        <div className="flex flex-wrap gap-4">
                          <div className="flex-1 flex justify-center items-center">
                            <label className="relative w-40 h-40 border border-primary-60 rounded-lg flex items-center justify-center cursor-pointer hover:bg-highlight-20">
                              <input
                                type="file"
                                accept="image/*"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                  }
                                }}
                              />
                              <img
                                src="/logo-light.png"
                                alt="upload icon"
                                className="w-40 h-40 opacity-40"
                              />
                            </label>
                          </div>
                          <div className="flex-2 flex flex-col gap-2 text-primary-80">
                            <span className="text-secondary font-bold text-lg">
                              {selectedCompany?.companyName}
                            </span>
                            <div className="flex flex-col gap-2">
                              <div className="flex gap-2">
                                <span className="font-semibold">Tax Code:</span>
                                <span>{selectedCompany?.taxCode}</span>
                              </div>
                              <div className="flex gap-2">
                                <span className="font-semibold">
                                  Business License Number:
                                </span>
                                <span>
                                  {selectedCompany?.businessLicenseNumber}
                                </span>
                              </div>
                              <div className="flex gap-2">
                                <span className="font-semibold">
                                  Commpany Size:
                                </span>
                                <span>{selectedCompany?.companySize}</span>
                              </div>
                              <div className="flex gap-2">
                                <span className="font-semibold">
                                  Company Website:
                                </span>
                                <a
                                  href={selectedCompany?.companyWebsite}
                                  className="text-accent hover:underline"
                                >
                                  {selectedCompany?.companyWebsite}
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <div className="flex gap-2 text-accent font-semibold">
                            <SquarePlus size={24} />
                            <span>DESCRIPTION</span>
                          </div>
                          <span className="text-primary-80">
                            {selectedCompany?.description}
                          </span>
                        </div>
                        <div className="flex flex-col gap-2">
                          <div className="flex gap-2 text-accent font-semibold">
                            <Info size={24} />
                            <span>INDUSTRIES</span>
                          </div>
                          <span className="text-primary-80 font-semibold">
                            {selectedCompany?.industry}
                          </span>
                        </div>
                        <div className="flex flex-col gap-2">
                          <div className="flex gap-2 text-accent font-semibold">
                            <Phone size={24} />
                            <span>CONTACT</span>
                          </div>
                          <div className="flex flex-col gap-2">
                            <div className="flex gap-2 text-primary-80">
                              <span className="font-semibold">
                                Company Phone Number:
                              </span>
                              <span>{selectedCompany?.companyPhoneNumber}</span>
                            </div>
                            <div className="flex gap-2 text-primary-80">
                              <span className="font-semibold">
                                Company Email:
                              </span>
                              <span>{selectedCompany?.companyEmail}</span>
                            </div>
                            <div className="flex gap-2 text-primary-80">
                              <span className="font-semibold">
                                Person's Email:
                              </span>
                              <span>{selectedCompany?.personEmail}</span>
                            </div>
                            <div className="flex gap-2 text-primary-80">
                              <span className="font-semibold">Address:</span>
                              <span>{selectedCompany?.address}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <ModeratorNote />
                      <div className="flex flex-wrap gap-2">
                        <button className="font-semibold bg-accent hover:bg-secondary cursor-pointer text-neutral-light-20 px-4 py-2 rounded-full">
                          Approval
                        </button>
                        <button
                          onClick={() => setIsOpen(true)}
                          className="font-semibold bg-[#F52121] hover:bg-red-800 cursor-pointer text-neutral-light-20 px-4 py-2 rounded-full"
                        >
                          Reject
                        </button>
                        {isOpen && (
                          <div className="fixed inset-0  bg-primary/80 z-50 flex items-center justify-center">
                            <div className="w-2/5 bg-neutral-light rounded-md">
                              <div className="flex flex-col gap-2 mx-20 my-10 space-y-4">
                                <RejectReason />
                                <div className="flex flex-wrap gap-2">
                                  <button
                                    onClick={() => {
                                      setIsOpen(false);
                                      setShowModal(false);
                                    }}
                                    className="bg-accent rounded-full hover:bg-secondary cursor-pointer text-neutral-light-20 px-4 py-2 font-semibold"
                                  >
                                    Send
                                  </button>
                                  <button
                                    onClick={() => setIsOpen(false)}
                                    className="font-semibold rounded-full hover:bg-primary cursor-pointer bg-primary-60 text-neutral-light-20 px-4 py-2"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
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
