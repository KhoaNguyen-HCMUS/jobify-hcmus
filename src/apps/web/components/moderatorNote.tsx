import { useState } from "react";

export default function ModeratorNote() {
  const [note, setNote] = useState("");

  return (
    <div className="flex flex-col gap-2">
      <span className="text-primary font-bold text-lg">Moderator's Note:</span>
      <input
        type="text"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        required
        placeholder="Enter moderator's note"
        className="border border-primary-60 bg-neutral-light-20 h-24 rounded-md px-4 focus:outline-none resize-none"
      ></input>
    </div>
  );
}
