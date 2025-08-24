"use client";
import Noti from "../../../components/noti";
import usePagination from "../../../hooks/usePagination";
import Pagination from "../../../components/pagination";
import ProtectedRoute from "../../../components/ProtectedRoute";

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

function RecruiterNotificationsContent() {
  const { page, maxPage, current, next, prev } = usePagination(notification, 5);

  return (
    <div className="w-full h-screen bg-neutral-light-60">
      <div className="flex flex-col justify-between px-20 py-10 space-y-6">
        <div className="flex flex-nowrap justify-between">
          <div className="text-accent font-bold text-3xl">Notification</div>
          <button className="text-neutral-light-20 bg-accent px-6 py-2 rounded-full hover:bg-secondary cursor-pointer">
            Mark all as read
          </button>
        </div>
        <div className="w-full grid grid-cols-1 gap-2 bg-highlight-40 border border-primary-20 rounded-2xl p-4">
          {current.map((noti, idx) => (
            <Noti
              key={idx}
              title={noti.title}
              notification={noti.text}
              time={noti.time}
            />
          ))}
          <Pagination
            page={page}
            maxPage={maxPage}
            onNext={next}
            onPrev={prev}
          />
        </div>
      </div>
    </div>
  );
}

export default function RecruiterNotificationsPage() {
  return (
    <ProtectedRoute allowedRoles={['company']}>
      <RecruiterNotificationsContent />
    </ProtectedRoute>
  );
}
