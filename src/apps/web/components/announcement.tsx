import { Bell } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import SystemAnnouncement from "./systemAnnouncement";

export default function Announcement() {
  const [visible, setVisible] = useState(false);
  const popupRef = useRef(null);
  const buttonRef = useRef(null);

  // Tắt popup khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setVisible(false);
      }
    }

    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="hidden md:flex items-center space-x-6">
      <button
        ref={buttonRef}
        onClick={() => setVisible(!visible)}
        className="relative cursor-pointer px-4 py-2 text-primary border-2 border-primary rounded-3xl font-medium transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/30 transform hover:-translate-y-0.5"
      >
        <Bell size={35} />
      </button>
      <div>
        <div
          ref={popupRef}
          className={`absolute right-0 mt-10 w-1/2 rounded-3xl shadow-xl bg-neutral-light-40 transition-all duration-300  ${
            visible ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <SystemAnnouncement />
        </div>
      </div>
      <div className="flex items-center py-2 px-4 bg-primary rounded-full">
        <span className="text-background font-semibold text-2xl">Profile</span>
      </div>
    </div>
  );
}
