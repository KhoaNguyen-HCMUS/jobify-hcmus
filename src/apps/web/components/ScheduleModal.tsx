"use client";
import { CircleX } from "lucide-react";
import { getTimezoneInfo } from "../utils/timezoneUtils";

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  scheduledAt: string;
  onScheduledAtChange: (value: string) => void;
  onSchedule: () => void;
  isLoading: boolean;
  title?: string;
}

export default function ScheduleModal({
  isOpen,
  onClose,
  scheduledAt,
  onScheduledAtChange,
  onSchedule,
  isLoading,
  title = "Schedule Job Post"
}: ScheduleModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-primary-80/70 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-96 max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-primary">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <CircleX size={24} />
          </button>
        </div>
        
        <div className="mb-4">
          <label
            htmlFor="scheduledAt"
            className="block text-sm font-bold text-primary mb-2"
          >
            Schedule Time:
          </label>
          <input
            id="scheduledAt"
            type="datetime-local"
            value={scheduledAt}
            onChange={(e) => onScheduledAtChange(e.target.value)}
            className="w-full border border-primary-80 pl-4 pr-4 py-2 bg-neutral-light-20 rounded-xl text-primary-80 outline-none focus:ring-1 focus:bg-white transition-all duration-300"
          />
          <p className="text-xs text-gray-500 mt-1">
            Your timezone: {getTimezoneInfo()}
          </p>
        </div>

        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={onSchedule}
            disabled={isLoading}
            className="bg-secondary text-neutral-light-20 hover:bg-secondary-60 px-6 py-2 rounded-full font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Scheduling..." : "Schedule"}
          </button>
        </div>
      </div>
    </div>
  );
}
