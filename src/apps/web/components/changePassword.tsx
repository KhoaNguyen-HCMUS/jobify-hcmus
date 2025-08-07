"use client";
import { useState } from "react";
import { EyeOff, Eye } from "lucide-react";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="w-full h-screen bg-neutral-light-60">
      <div className="bg-[url(/logo-light.png)] h-screen bg-[length:300px_300px] bg-center bg-no-repeat">
        <div className="flex flex-col justify-between px-20 py-10 space-y-6">
          <div className="text-accent font-bold text-3xl">Change Password</div>
          <div className="flex flex-col gap-4">
            <span className="text-primary font-bold text-base">
              Change your login password
            </span>
            <div className="flex flex-col">
              <label
                htmlFor="currentPassword"
                className="block text-sm text-primary ml-2"
              >
                Current Password
              </label>
              <div className="relative w-1/2">
                <input
                  id="currentPassword"
                  type={showCurrent ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter your current password"
                  className="w-full pl-4 pr-10 py-2 bg-neutral-light-20 shadow-lg rounded-xl text-primary outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all duration-300"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-80 cursor-pointer"
                  onClick={() => setShowCurrent(!showCurrent)}
                >
                  {!showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="newPassword"
                className="block text-sm text-primary ml-2"
              >
                New Password
              </label>
              <div className="relative w-1/2">
                <input
                  id="newPassword"
                  type={showNew ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter a new password"
                  className="w-full pl-4 pr-10 py-2 bg-neutral-light-20 shadow-lg rounded-xl text-primary-80 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all duration-300"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-80 cursor-pointer"
                  onClick={() => setShowNew(!showNew)}
                >
                  {!showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div className="flex flex-col px-2">
              <li className="text-primary-80 text-sm">
                New passwords consist of 6 to 25 characters
              </li>
              <li className="text-primary-80 text-sm">
                Include lowercase letters and at least one digit
              </li>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="confirmPassword"
                className="block text-sm text-primary ml-2"
              >
                Confirm Password
              </label>
              <div className="relative w-1/2">
                <input
                  id="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  className="w-full pl-4 pr-10 py-2 bg-neutral-light-20 shadow-lg rounded-xl text-primary-80 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all duration-300"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-80 cursor-pointer"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {!showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="bg-accent hover:text-accent hover:bg-neutral-light-60 cursor-pointer border-2 border-accent text-neutral-light-20 font-semibold rounded-2xl px-6 py-2">
              <a href="/candidate/dashboard">Update</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
