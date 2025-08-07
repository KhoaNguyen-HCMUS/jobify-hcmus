"use client";
import Noti from "../../../components/noti";
import usePagination from "../../../hooks/usePagination";
import Pagination from "../../../components/pagination";

interface NotificationProps {
  noti: {
    title: string;
    text: string;
    time: string;
  };
}

const notification = [
  {
    title: "Welcome to Jobify!",
    text: "Congratulations on successfully registering your Jobify account! You're now ready to explore thousands of exciting job",
    time: "2 days ago",
  },
  {
    title: "Welcome to Jobify!",
    text: "Congratulations on successfully registering your Jobify account! You're now ready to explore thousands of exciting job",
    time: "2 days ago",
  },
  {
    title: "Welcome to Jobify!",
    text: "Congratulations on successfully registering your Jobify account! You're now ready to explore thousands of exciting job",
    time: "2 days ago",
  },
  {
    title: "Welcome to Jobify!",
    text: "Congratulations on successfully registering your Jobify account! You're now ready to explore thousands of exciting job",
    time: "2 days ago",
  },
  {
    title: "Welcome to Jobify!",
    text: "Congratulations on successfully registering your Jobify account! You're now ready to explore thousands of exciting job",
    time: "2 days ago",
  },
  {
    title: "Welcome to Jobify!",
    text: "Congratulations on successfully registering your Jobify account! You're now ready to explore thousands of exciting job",
    time: "2 days ago",
  },
  {
    title: "Welcome to Jobify!",
    text: "Congratulations on successfully registering your Jobify account! You're now ready to explore thousands of exciting job",
    time: "2 days ago",
  },
  {
    title: "Welcome to Jobify!",
    text: "Congratulations on successfully registering your Jobify account! You're now ready to explore thousands of exciting job",
    time: "2 days ago",
  },
  {
    title: "Welcome to Jobify!",
    text: "Congratulations on successfully registering your Jobify account! You're now ready to explore thousands of exciting job",
    time: "2 days ago",
  },
  {
    title: "Welcome to Jobify!",
    text: "Congratulations on successfully registering your Jobify account! You're now ready to explore thousands of exciting job",
    time: "2 days ago",
  },
  {
    title: "Welcome to Jobify!",
    text: "Congratulations on successfully registering your Jobify account! You're now ready to explore thousands of exciting job",
    time: "2 days ago",
  },
];

export default function OperatorNotificationsPage() {
  const { page, maxPage, current, next, prev } = usePagination(notification, 6);

  return (
    <div className="w-full min-h-screen bg-neutral-light-60">
      <div className="flex flex-col justify-between px-20 py-10 space-y-6">
        <div className="flex flex-nowrap justify-between">
          <div className="text-accent font-bold text-3xl">Notification</div>
          <button className="text-neutral-light-20 bg-accent px-6 py-2 rounded-full hover:bg-secondary cursor-pointer">
            Mark all as read
          </button>
        </div>
        <div className="w-full grid grid-cols-1 gap-2 bg-neutral-light-60 p-4">
          {current.map((noti, idx) => (
            <Noti
              key={idx}
              title={noti.title}
              notification={noti.text}
              time={noti.time}
            />
          ))}
          <div className="py-2">
            <Pagination
              page={page}
              maxPage={maxPage}
              onNext={next}
              onPrev={prev}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
