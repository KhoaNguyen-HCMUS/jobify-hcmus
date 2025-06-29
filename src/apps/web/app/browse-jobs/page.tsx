import KeywordSearch from "../../components/keywordSearch";

export default function BrowseJobsPage() {
  return (
    <div className="bg-neutral-light-40">
      <div className="flex flex-col justify-center items-center space-y-6">
        <div className="text-center">
          <h1 className="font-bold text-3xl text-primary p-2">
            Việc đúng người - Người đúng việc
          </h1>
          <p className="font-semibold text-primary-80">
            Tiếp cận 60,000+ tin tuyển dụng việc làm mỗi ngày từ hàng nghìn
            doanh nghiệp uy tín tại Việt Nam
          </p>
        </div>
        <KeywordSearch />
      </div>
    </div>
  );
}
