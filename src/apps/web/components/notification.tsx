interface NotificationProps {
  notification: {
    text: string;
    href: string;
  };
}

const notifications = [
  {
    text: "Bạn có thông báo mới",
    href: "/notification",
  },
  { text: "Tin tuyển dụng vừa đăng", href: "/notification" },
  { text: "Cập nhật hồ sơ", href: "/notification" },
  { text: "Nhà tuyển dụng đã xem CV", href: "/notification" },
];
export default function Notification() {
  return (
    <div className="flex flex-col overflow-hidden">
      {notifications.map((notification, index) => {
        const isLast = index === notifications.length - 1;
        return (
          <a
            key={index}
            href={notification.href}
            className={`block py-2 px-4 text-primary hover:bg-highlight transition-colors
              ${index % 2 === 0 ? "bg-highlight-20" : "bg-highlight-60"}
              ${isLast ? "rounded-b-2xl" : ""}
            `}
          >
            <span className="line-clamp-1">{notification.text}</span>
          </a>
        );
      })}
    </div>
  );
}
