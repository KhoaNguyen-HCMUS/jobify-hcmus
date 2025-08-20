import LeftArrow from "./arrowLeft";
import RightArrow from "./arrowRight";

interface PaginationComponentProps {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  onPageChange: (page: number) => void;
  loading?: boolean;
  className?: string;
}

export default function PaginationComponent({
  currentPage,
  totalPages,
  hasNextPage,
  onPageChange,
  loading = false,
  className = ''
}: PaginationComponentProps) {
  const handlePrev = () => {
    if (!loading && currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (!loading && hasNextPage) {
      onPageChange(currentPage + 1);
    }
  };

  if (totalPages <= 1) {
    return null;
  }

  console.log(currentPage, totalPages, hasNextPage);

  return (
    <div className={`w-full flex justify-center ${className}`}>
      <div className="flex items-center space-x-4">
        <button
          onClick={handlePrev}
          disabled={loading || currentPage === 1}
          className={`transition ${
            currentPage === 1 || loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          <LeftArrow />
        </button>

        <span className="font-semibold text-lg">
          {currentPage}/{totalPages}
        </span>

                 <button
           onClick={handleNext}
           disabled={loading || !hasNextPage}
           className={`transition ${
             !hasNextPage || loading
               ? "opacity-50 cursor-not-allowed"
               : "cursor-pointer"
           }`}
         >
          <RightArrow />
        </button>
      </div>
    </div>
  );
}