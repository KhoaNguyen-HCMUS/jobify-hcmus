"use client";
import { useState } from "react";
import Noti from "../../../components/noti";
import LeftArrow from "../../../components/arrowLeft";
import RightArrow from "../../../components/arrowRight";

const notification = [
  {
    title: "Welcome to Jobify!",
    notification:
      "Congratulations on successfully registering your Jobify account! You're now ready to explore thousands of exciting job",
    time: "2 days ago",
  },
  {
    title: "Welcome to Jobify!",
    notification:
      "Congratulations on successfully registering your Jobify account! You're now ready to explore thousands of exciting job",
    time: "2 days ago",
  },
  {
    title: "Welcome to Jobify!",
    notification:
      "Congratulations on successfully registering your Jobify account! You're now ready to explore thousands of exciting job",
    time: "2 days ago",
  },
  {
    title: "Welcome to Jobify!",
    notification:
      "Congratulations on successfully registering your Jobify account! You're now ready to explore thousands of exciting job",
    time: "2 days ago",
  },
  {
    title: "Welcome to Jobify!",
    notification:
      "Congratulations on successfully registering your Jobify account! You're now ready to explore thousands of exciting job",
    time: "2 days ago",
  },
  {
    title: "Welcome to Jobify!",
    notification:
      "Congratulations on successfully registering your Jobify account! You're now ready to explore thousands of exciting job",
    time: "2 days ago",
  },
  {
    title: "Welcome to Jobify!",
    notification:
      "Congratulations on successfully registering your Jobify account! You're now ready to explore thousands of exciting job",
    time: "2 days ago",
  },
  {
    title: "Welcome to Jobify!",
    notification:
      "Congratulations on successfully registering your Jobify account! You're now ready to explore thousands of exciting job",
    time: "2 days ago",
  },
  {
    title: "Welcome to Jobify!",
    notification:
      "Congratulations on successfully registering your Jobify account! You're now ready to explore thousands of exciting job",
    time: "2 days ago",
  },
  {
    title: "Welcome to Jobify!",
    notification:
      "Congratulations on successfully registering your Jobify account! You're now ready to explore thousands of exciting job",
    time: "2 days ago",
  },
  {
    title: "Welcome to Jobify!",
    notification:
      "Congratulations on successfully registering your Jobify account! You're now ready to explore thousands of exciting job",
    time: "2 days ago",
  },
];

export default function NotificationsPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const NOTIFICATION_PER_PAGE = 5; // 4x3
  const totalPages = Math.ceil(notification.length / NOTIFICATION_PER_PAGE);

  // Tính toán NOTIFICATION hiển thị trên trang hiện tại
  const startIndex = (currentPage - 1) * NOTIFICATION_PER_PAGE;
  const endIndex = startIndex + NOTIFICATION_PER_PAGE;
  const currentNotification = notification.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="w-full h-screen bg-neutral-light-60">
      <div className="flex flex-col justify-between px-20 py-10 space-y-6">
        <div className="text-accent font-bold text-3xl">Notification</div>
        <div className="w-full grid grid-cols-1 gap-2 bg-highlight-40 shadow-2xl p-4">
          {currentNotification?.map((noti, idx) => (
            <Noti
              key={idx}
              title={noti.title}
              notification={noti.notification}
              time={noti.time}
            />
          ))}
          <div className="w-full mt-4 flex justify-center items-center space-x-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              <LeftArrow />
            </button>
            <span className="font-semibold text-lg">
              {currentPage}/{totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              <RightArrow />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
