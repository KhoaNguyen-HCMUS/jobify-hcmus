interface NotiProps {
  title: string;
  notification: string;
  time: string;
}

export default function Noti({ title, notification, time }: NotiProps) {
  return (
    <div className=" flex flex-col rounded-2xl bg-neutral-light-20 px-4 py-2">
      <div className="line-clamp-1 font-semibold text-primary">{title}</div>
      <div className="line-clamp-2 text-primary-80 text-sm">{notification}</div>
      <div className="text-primary-80 text-sm text-right">{time}</div>
    </div>
  );
}
