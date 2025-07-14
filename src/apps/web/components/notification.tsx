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
    <div className="flex flex-col">
      {notifications.map((notification, index) => (
        <a
          key={index}
          href={notification.href}
          className={`block py-2 px-4 rounded-2xl ${
            index % 2 === 0 ? "bg-highlight-20" : "bg-highlight-60"
          } text-primary hover:bg-highlight transition-colors`}
        >
          <span className="line-clamp-1">{notification.text}</span>
        </a>
      ))}
    </div>
  );
}
