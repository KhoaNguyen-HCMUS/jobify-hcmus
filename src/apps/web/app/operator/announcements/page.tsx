"use client";
import Noti from "../../../components/noti";
import usePagination from "../../../hooks/usePagination";
import Pagination from "../../../components/pagination";
import { useState, useRef } from "react";
import { Bell, CircleX, FilePenLine, Upload } from "lucide-react";

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

export default function OperatorAnnouncementsPage({ noti }: NotificationProps) {
  const { page, maxPage, current, next, prev } = usePagination(notification, 6);

  const [open, setOpen] = useState(false);
  const [nextOpen, setNextOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState("");
  const [fileSaved, setFileSaved] = useState(false);
  const [fileLabel, setFileLabel] = useState("Add file attachment");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setFileSaved(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-neutral-light-60">
      <div className="flex flex-col justify-between px-20 py-10 space-y-6">
        <div className="flex flex-nowrap justify-between">
          <div className="text-accent font-bold text-3xl">
            Recent Announcements
          </div>
          <button
            onClick={() => setOpen(true)}
            className="text-neutral-light-20 bg-accent px-6 py-2 rounded-full hover:bg-secondary cursor-pointer"
          >
            Add announcement
          </button>
          {open && (
            <div className="fixed inset-0 bg-primary-80 z-50 flex items-center justify-center">
              <div
                onClick={(e) => e.stopPropagation()}
                className="w-2/5 overflow-y-auto bg-neutral-light-20 rounded-lg relative"
              >
                <div className="flex justify-between items-center bg-primary text-neutral-light-20 px-4 text-lg py-2">
                  <div className="flex items-center gap-2">
                    <Bell
                      className="border rounded-full bg-highlight-20 text-primary"
                      size={24}
                    />
                    <span>Announcement</span>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    className="text-secondary-40 cursor-pointer"
                  >
                    <CircleX size={24} />
                  </button>
                </div>
                <div className="flex flex-col gap-2 px-4 py-2">
                  <div className="flex flex-col">
                    <label
                      htmlFor="title"
                      className="block text-sm text-primary font-semibold"
                    >
                      Title*:
                    </label>
                    <div className="relative">
                      <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter Announcement Title"
                        className="w-full pl-4 pr-10 py-2 border border-primary bg-neutral-light-20 shadow-lg rounded-xl text-primary-80 outline-none focus:bg-white transition-all duration-300"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="content"
                      className="block text-sm text-primary font-semibold"
                    >
                      Content*:
                    </label>
                    <div className="relative">
                      <input
                        id="content"
                        type="text"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Enter Announcement Content"
                        className="w-full h-18 pl-4 pr-10 py-2 border border-primary bg-neutral-light-20 shadow-lg rounded-xl text-primary-80 outline-none focus:bg-white transition-all duration-300"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="targetAudience"
                      className="block text-sm text-primary font-semibold"
                    >
                      Target Audience*:
                    </label>
                    <div className="relative">
                      <input
                        id="targetAudience"
                        type="text"
                        value={targetAudience}
                        onChange={(e) => setTargetAudience(e.target.value)}
                        placeholder="Enter Target Audience"
                        className="w-full pl-4 pr-10 py-2 border border-primary bg-neutral-light-20 shadow-lg rounded-xl text-primary-80 outline-none focus:bg-white transition-all duration-300"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap mt-4 gap-4">
                    <div className="flex-1 flex flex-col border border-primary text-primary-80 rounded-xl p-2">
                      <label
                        htmlFor="targetAudience"
                        className="block font-semibold"
                      >
                        Schedule:
                      </label>
                      <div className="flex flex-col gap-2 px-2">
                        <div className="flex gap-2">
                          <span>Date:</span>
                          <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-3/5 bg-neutral-light-20 border border-primary-60 rounded-full px-4"
                          />
                        </div>
                        <div className="flex gap-2">
                          <span>Time:</span>
                          <input
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="w-3/5 bg-neutral-light-20 border border-primary-60 rounded-full px-4"
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setNextOpen(true)}
                      className="text-left h-12 flex-1 flex flex-col border border-primary text-primary-80 rounded-xl p-2 cursor-pointer"
                    >
                      {fileLabel}
                    </button>
                    {nextOpen && (
                      <div className="fixed inset-0 bg-primary-80 z-50 flex items-center justify-center">
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="w-1/5 overflow-y-auto bg-neutral-light-20 rounded-lg relative"
                        >
                          <div className="bg-accent-20 text-primary-80 px-4 py-2 font-semibold">
                            Add file attachment
                          </div>
                          <div>
                            <div className="flex flex-col items-center gap-4 px-20 py-4">
                              {fileName ? (
                                <div className="text-primary-80 font-semibold text-lg flex items-center gap-2">
                                  <FilePenLine
                                    size={32}
                                    className="text-primary-60"
                                  />
                                  <span>{fileName}</span>
                                </div>
                              ) : (
                                <Upload
                                  size={80}
                                  className="text-primary-60 border border-primary-60 rounded-md p-2"
                                />
                              )}
                              {fileName && !fileSaved && (
                                <button
                                  onClick={() => {
                                    setFileName("");
                                    fileInputRef.current &&
                                      (fileInputRef.current.value = "");
                                  }}
                                  className="bg-accent text-background font-semibold rounded-full px-4 py-2 cursor-pointer"
                                >
                                  Remove file
                                </button>
                              )}
                              <div className="relative flex gap-2">
                                <input
                                  ref={fileInputRef}
                                  type="file"
                                  accept=".pdf,.doc,.docx"
                                  onChange={handleFileChange}
                                  className="hidden"
                                />
                                <button
                                  onClick={() => {
                                    if (!fileName) {
                                      fileInputRef.current?.click();
                                    } else if (!fileSaved) {
                                      setFileSaved(true);
                                    } else {
                                      fileInputRef.current?.click();
                                    }
                                  }}
                                  className="cursor-pointer text-neutral-light-20 font-semibold bg-accent rounded-full px-4 py-2"
                                >
                                  {!fileName
                                    ? "Add"
                                    : fileSaved
                                    ? "Edit"
                                    : "Save"}
                                </button>
                                {fileName && fileSaved && (
                                  <button
                                    onClick={() => {
                                      setNextOpen(false);
                                      setFileLabel(fileName);
                                    }}
                                    className="cursor-pointer text-neutral-light-20 font-semibold bg-accent rounded-full px-4 py-2"
                                  >
                                    OK
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="text-neutral-light-20 bg-accent hover:bg-secondary px-4 py-2 rounded-full cursor-pointer m-4"
                >
                  Send
                </button>
              </div>
            </div>
          )}
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
