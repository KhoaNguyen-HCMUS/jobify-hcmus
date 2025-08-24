"use client";
import { CircleX, Info, Phone, SquarePlus } from "lucide-react";
import { PendingCompany } from "../services/admin";
import ModeratorNote from "./moderatorNote";
import RejectReason from "./rejectReason";

interface CompanyDetailModalProps {
  company: PendingCompany | undefined;
  isOpen: boolean;
  onClose: () => void;
  onApprove: () => void;
  onReject: (reason: string) => void;
  rejectReason: string;
  setRejectReason: (reason: string) => void;
  showRejectModal: boolean;
  setShowRejectModal: (show: boolean) => void;
}

export default function CompanyDetailModal({
  company,
  isOpen,
  onClose,
  onApprove,
  onReject,
  rejectReason,
  setRejectReason,
  showRejectModal,
  setShowRejectModal,
}: CompanyDetailModalProps) {
  if (!isOpen || !company) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-primary-80 z-50 flex items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-3/5 max-h-[90vh] overflow-y-auto bg-neutral-light rounded-md relative"
      >
        <div className="flex flex-col">
          <div className="flex flex-col gap-2 mx-10 my-4">
            <div className="flex justify-between">
              <span className="text-primary text-2xl font-bold">Profile:</span>
              <CircleX
                size={24}
                className="text-primary-80 cursor-pointer"
                onClick={onClose}
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
                            // Handle file upload
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
                      {company?.company_name}
                    </span>
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2">
                        <span className="font-semibold">Tax Code:</span>
                        <span>{company?.tax_code}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="font-semibold">
                          Business License Number:
                        </span>
                        <span>{company?.license_number}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="font-semibold">Company Size:</span>
                        <span>{company?.size}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="font-semibold">Company Website:</span>
                        <a
                          href={company?.website}
                          className="text-accent hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {company?.website}
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
                    {company?.description}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2 text-accent font-semibold">
                    <Info size={24} />
                    <span>INDUSTRIES</span>
                  </div>
                  <span className="text-primary-80 font-semibold">
                    {company?.industry}
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
                      <span>{company?.phone_number}</span>
                    </div>
                    <div className="flex gap-2 text-primary-80">
                      <span className="font-semibold">Address:</span>
                      <span>{company?.address}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {/* <ModeratorNote /> */}
              <div className="flex gap-2">
                <button
                  className="bg-accent hover:bg-secondary text-neutral-light-20 px-6 py-2 rounded-full cursor-pointer"
                  onClick={onApprove}
                >
                  Approve
                </button>
                <button
                  className="bg-accent hover:bg-secondary text-neutral-light-20 px-6 py-2 rounded-full cursor-pointer"
                  onClick={() => setShowRejectModal(true)}
                >
                  Reject
                </button>
              </div>
              {showRejectModal && (
                <div className="flex flex-col gap-2 w-full mt-4">
                  <label
                    className="text-xl font-bold text-primary mb-1"
                    htmlFor="reject-note"
                  >
                    Moderator's Note:
                  </label>
                  <textarea
                    id="reject-note"
                    className="w-full min-h-[100px] border border-primary-60 rounded-lg px-4 py-3 text-primary-80 focus:outline-none focus:ring-1 focus:ring-primary bg-white"
                    placeholder="Enter moderator's note for rejection"
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                  />
                  <div className="flex gap-4 mt-2">
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-full cursor-pointer font-semibold transition"
                      onClick={() => onReject(rejectReason)}
                    >
                      Confirm Reject
                    </button>
                    <button
                      className="bg-gray-400 hover:bg-gray-500 text-white px-8 py-2 rounded-full cursor-pointer font-semibold transition"
                      onClick={() => setShowRejectModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
