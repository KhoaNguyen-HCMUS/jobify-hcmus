const content = ["Tuyen dung nhan vien"];
const datesReport = ["2023-10-01", "2023-10-02", "2023-10-03"];
const timesReport = ["10:00", "11:00", "12:00"];
const datesModer = ["2023-10-01", "2023-10-02", "2023-10-03"];
const timesModer = ["10:00", "11:00", "12:00"];
const statuses = ["Pending", "Approved", "Rejected"];
const users = ["Diem Xuan"];

export const fakeReport = Array.from({ length: 30 }, (_, i) => ({
  id: (i + 1).toString(),
  content: content[i % content.length],
  dateReport: datesReport[i % datesReport.length],
  timeReport: timesReport[i % timesReport.length],
  dateModeration: datesModer[i % datesModer.length],
  timeModeration: timesModer[i % timesModer.length],
  status: statuses[i % statuses.length],
  user: users[i % users.length],
}));
