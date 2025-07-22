import BlockedActive from "../../../components/blockedActive";
import KeyWord from "../../../components/keyWord";

interface UsersProps {
  recruiter: {
    companyName: string;
    industry: string;
    location: string;
    status: string;
    profile: string;
    flag: string;
    activityLog: string;
  };
  candidate: {
    candidateName: string;
    industry: string;
    location: string;
    status: string;
    profile: string;
    flag: string;
    activityLog: string;
  };
  moderator: {
    name: string;
    status: string;
    activityLog: string;
  };
}

const candidateNames = [
  "Chuyên Viên Kinh Doanh",
  "Nhân Viên Tư Vấn",
  "Quản Lý Dự Án",
  "Kỹ Sư Phần Mềm",
  "Nhân Sự Tuyển Dụng",
];
const companyNames = [
  "Chuyên Viên Kinh Doanh",
  "Nhân Viên Tư Vấn",
  "Quản Lý Dự Án",
  "Kỹ Sư Phần Mềm",
  "Nhân Sự Tuyển Dụng",
];
const names = [
  "Chuyên Viên Kinh Doanh",
  "Nhân Viên Tư Vấn",
  "Quản Lý Dự Án",
  "Kỹ Sư Phần Mềm",
  "Nhân Sự Tuyển Dụng",
];
const industrys = [
  "Nguyen Van A",
  "Tran Thi B",
  "Le Hoang C",
  "Pham Minh D",
  "Doan Bao E",
];
const locations = [
  "Computer Science",
  "Business Administration",
  "Marketing",
  "Finance",
  "Hospitality Management",
];
const statuss = ["Active"];
const profiles = ["profile"];
const flags = ["0"];
const activityLogs = ["View Activity Log"];

const randomItem = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

const apps = Array.from({ length: 30 }, (_, i) => ({
  id: (i + 1).toString(),
  candidateName: randomItem(candidateNames),
  companyName: randomItem(companyNames),
  name: randomItem(names),
  industry: randomItem(industrys),
  location: randomItem(locations),
  status: randomItem(statuss),
  profile: randomItem(profiles),
  flag: randomItem(flags),
  activityLog: randomItem(activityLogs),
}));

export default function OperatorUsersPage({
  recruiter,
  candidate,
  moderator,
}: UsersProps) {
  return (
    <div className="w-full min-h-screen bg-neutral-light-60">
      <div className="flex flex-col justify-between px-20 py-10 space-y-6">
        <div className="text-primary font-bold text-3xl">Candidate</div>
        <div className="flex justify-between gap-4">
          <BlockedActive />
          <KeyWord />
        </div>
        <div>
          <table className="w-full table-fixed">
            <thead>
              <tr className="bg-primary text-neutral-light-20 align-middle">
                <th className="w-3/9 border border-primary-60 p-2">
                  Candidate Name
                </th>
                <th className="w-3/9 border border-primary-60 p-2">Industry</th>
                <th className="w-3/9 border border-primary-60 p-2">Location</th>
                <th className="w-2/9 border border-primary-60 p-2">Status</th>
                <th className="w-1/9 border border-primary-60 p-2">Profile</th>
                <th className="w-1/9 border border-primary-60 p-2">Flag</th>
                <th className="w-3/9 border border-primary-60 p-2">
                  Activity Log
                </th>
              </tr>
            </thead>
            <tbody>
              {apps.map((user, index) => (
                <tr
                  key={user.id}
                  className={`py-2 px-4 text-primary-80 hover:bg-highlight transition-colors ${
                    index % 2 === 0 ? "bg-highlight-20" : "bg-highlight-40"
                  }`}
                >
                  <td className="w-3/9 border border-primary-60 p-2">
                    <span className="line-clamp-1">{user.candidateName}</span>
                  </td>
                  <td className="w-3/9 border border-primary-60 p-2">
                    <span className="line-clamp-1">{user.industry}</span>
                  </td>
                  <td className="w-3/9 border border-primary-60 p-2">
                    <span className="line-clamp-1">{user.location}</span>
                  </td>
                  <td className="w-2/9 border border-primary-60 p-2">
                    <span className="line-clamp-1">{user.status}</span>
                  </td>
                  <td className="w-2/9 border border-primary-60 p-2">
                    <span className="line-clamp-1">{user.profile}</span>
                  </td>
                  <td className="w-1/9 border border-primary-60 p-2">
                    <span className="line-clamp-1">{user.flag}</span>
                  </td>
                  <td className="w-3/9 border border-primary-60 p-2">
                    <span className="line-clamp-1 text-accent cursor-pointer">
                      {user.activityLog}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex flex-col justify-between px-20 py-10 space-y-6">
        <div className="text-primary font-bold text-3xl">Recruiter</div>
        <div className="flex justify-between gap-4">
          <BlockedActive />
          <KeyWord />
        </div>
        <div>
          <table className="w-full table-fixed">
            <thead>
              <tr className="bg-primary text-neutral-light-20 align-middle">
                <th className="w-3/9 border border-primary-60 p-2">
                  Company Name
                </th>
                <th className="w-3/9 border border-primary-60 p-2">Industry</th>
                <th className="w-3/9 border border-primary-60 p-2">Location</th>
                <th className="w-2/9 border border-primary-60 p-2">Status</th>
                <th className="w-1/9 border border-primary-60 p-2">Profile</th>
                <th className="w-1/9 border border-primary-60 p-2">Flag</th>
                <th className="w-3/9 border border-primary-60 p-2">
                  Activity Log
                </th>
              </tr>
            </thead>
            <tbody>
              {apps.map((user, index) => (
                <tr
                  key={user.id}
                  className={`py-2 px-4 text-primary-80 hover:bg-highlight transition-colors ${
                    index % 2 === 0 ? "bg-highlight-20" : "bg-highlight-40"
                  }`}
                >
                  <td className="w-3/9 border border-primary-60 p-2">
                    <span className="line-clamp-1">{user.companyName}</span>
                  </td>
                  <td className="w-3/9 border border-primary-60 p-2">
                    <span className="line-clamp-1">{user.industry}</span>
                  </td>
                  <td className="w-3/9 border border-primary-60 p-2">
                    <span className="line-clamp-1">{user.location}</span>
                  </td>
                  <td className="w-2/9 border border-primary-60 p-2">
                    <span className="line-clamp-1">{user.status}</span>
                  </td>
                  <td className="w-2/9 border border-primary-60 p-2">
                    <span className="line-clamp-1">{user.profile}</span>
                  </td>
                  <td className="w-1/9 border border-primary-60 p-2">
                    <span className="line-clamp-1">{user.flag}</span>
                  </td>
                  <td className="w-3/9 border border-primary-60 p-2">
                    <span className="line-clamp-1 text-accent cursor-pointer">
                      {user.activityLog}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex flex-col justify-between px-20 py-10 space-y-6">
        <div className="text-primary font-bold text-3xl">Moderator</div>
        <div className="flex justify-between gap-4">
          <BlockedActive />
          <KeyWord />
        </div>
        <div>
          <table className="w-full table-fixed">
            <thead>
              <tr className="bg-primary text-neutral-light-20 align-middle">
                <th className="w-2/5 border border-primary-60 p-2">Name</th>
                <th className="w-1/5 border border-primary-60 p-2">Status</th>
                <th className="w-2/5 border border-primary-60 p-2">
                  Activity Log
                </th>
              </tr>
            </thead>
            <tbody>
              {apps.map((user, index) => (
                <tr
                  key={user.id}
                  className={`py-2 px-4 text-primary-80 hover:bg-highlight transition-colors ${
                    index % 2 === 0 ? "bg-highlight-20" : "bg-highlight-40"
                  }`}
                >
                  <td className="w-3/9 border border-primary-60 p-2">
                    <span className="line-clamp-1">{user.name}</span>
                  </td>
                  <td className="w-3/9 border border-primary-60 p-2">
                    <span className="line-clamp-1">{user.status}</span>
                  </td>
                  <td className="w-3/9 border border-primary-60 p-2">
                    <span className="line-clamp-1 text-accent cursor-pointer">
                      {user.activityLog}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
