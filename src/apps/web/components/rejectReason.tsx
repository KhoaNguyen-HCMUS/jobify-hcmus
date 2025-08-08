import { useState } from "react";

interface RejectReasonProps {
  value: string;
  onChange: (value: string) => void;
}

export default function RejectReason({ value, onChange }: RejectReasonProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-primary text-xl font-bold">Rejection Reason:</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        placeholder="Enter moderator feedback"
        className="px-4 py-2 text-primary-80 border border-primary-60 rounded-md h-24 bg-neutral-light-20 resize-none"
      />
    </div>
  );
}
