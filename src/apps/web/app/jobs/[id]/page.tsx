import GoBack from "@web/components/goBack";
import JobDetail from "../../../components/job/jobDetail";

export default function JobDetailPage() {
  return (
    <div className="flex flex-col mx-20 my-10 gap-4">
      <GoBack />
      <JobDetail />
    </div>
  );
}
