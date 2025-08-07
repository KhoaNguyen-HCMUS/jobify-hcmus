import React from "react";

const statusLabelMap: Record<string, string> = {
  pending: "Pending",
  shortlist: "Shortlist",
  interview_request: "Interview request",
  hired: "Hired",
  reject: "Reject",
  cancel: "Cancel",
  flagged: "1 Flag",
};

const statusStyleMap: Record<string, string> = {
  pending: "bg-accent-40 text-primary",
  shortlist: "bg-accent-60 text-primary",
  interview_request: "bg-accent-80 text-primary",
  hired: "bg-accent text-neutral-light-20",
  reject: "bg-primary-80 text-neutral-light-20",
  cancel: "bg-primary-60 text-neutral-light-20",
  flagged: "bg-red-500 text-white",
};

export default function JobStatusBadge({ status }: { status?: string }) {
  if (!status) return null;

  const label = statusLabelMap[status] || status;
  const style = statusStyleMap[status] || "bg-accent-20 text-text-80";

  return (
    <span className={`text-sm font-semibold px-4 py-1 rounded-full ${style}`}>
      {label}
    </span>
  );
}
