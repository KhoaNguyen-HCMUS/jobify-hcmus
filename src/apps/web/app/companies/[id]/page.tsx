import GoBack from "../../../components/goBack";
import CompanyDetail from "../../../components/company/companyDetail";

export default function JobDetailPage() {
  return (
    <div className="flex flex-col mx-20 my-10 gap-4">
      <GoBack />
      <CompanyDetail />
    </div>
  );
}
