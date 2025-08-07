import { useState } from "react";

export default function RejectReason() {
  const [reason, setReason] = useState("");
  return (
    <div className="flex flex-col gap-2">
      <span className="text-primary text-xl font-bold">Rejection Reason:</span>
      <input
        type="text"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        required
        placeholder="Enter moderator feedback"
        className="px-4 text-primary-80 border border-primary-60 rounded-md h-24 bg-neutral-light-20"
      />
    </div>
  );
}
