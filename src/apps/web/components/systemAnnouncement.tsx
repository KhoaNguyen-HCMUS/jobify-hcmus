import { Bell } from "lucide-react";

export default function SystemAnnouncement() {
  return (
    <div>
      <div className="flex flex-col items-center py-10 rounded-t-3xl bg-primary space-y-2">
        <Bell
          size={50}
          className="text-primary b-0 bg-highlight-20 rounded-full p-2"
        />
        <span className="flex flex-col text-center text-highlight-20 font-bold text-3xl">
          SYSTEM ANNOUNCEMENT
        </span>
        <p className="text-highlight-60">Important update from system</p>
      </div>
      <div className="flex flex-col items-center text-center px-20 py-10 space-y-6">
        <span className="text-primary font-semibold text-2xl">
          New Recruitment Policy Update
        </span>
        <p className="text-primary">
          JOBIFY will implement a new recruitment process starting from July 15,
          2025. All recruiters need to understand the changes and update
          candidate profiles according to the new template.
        </p>
      </div>
      <div className="bg-highlight-20 rounded-2xl p-4 mx-20 mb-10">
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between">
            <span className="text-primary font-semibold">Target Audience:</span>
            <span className="text-primary">Recruiter, Candidates</span>
          </div>
          <div className="flex justify-between">
            <span className="text-primary font-semibold">Created By:</span>
            <span className="text-primary">Recruiter, Candidates</span>
          </div>
          <div className="flex justify-between">
            <span className="text-primary font-semibold">Scheduled time:</span>
            <span className="text-primary">Recruiter, Candidates</span>
          </div>
          <div className="flex justify-between">
            <span className="text-primary font-semibold">Attachment:</span>
            <a href="" download className="text-accent">
              file
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
