import { ArrowLeft, ArrowRight } from "lucide-react";

export default function BlockedActive() {
  return (
    <div className="flex flex-wrap justify-between">
      <div className="flex flex-wrap justify-between gap-6">
        <button className="bg-neutral-light-20 rounded-full shadow-lg text-primary px-8 py-2 cursor-pointer">
          <ArrowLeft size={24} />
        </button>
        <button className="bg-neutral-light-20 rounded-full shadow-lg text-primary px-8 py-2 cursor-pointer">
          Blocked
        </button>
        <button className="bg-neutral-light-20 rounded-full shadow-lg text-primary px-8 py-2 cursor-pointer">
          Active
        </button>
        <button className="bg-neutral-light-20 rounded-full shadow-lg text-primary px-8 py-2 cursor-pointer">
          <ArrowRight size={24} />
        </button>
      </div>
    </div>
  );
}
