import LeftArrow from "./arrowLeft";
import RightArrow from "./arrowRight";

interface PaginationProps {
  page: number;
  maxPage: number;
  onNext: () => void;
  onPrev: () => void;
}

export default function Pagination({
  page,
  maxPage,
  onNext,
  onPrev,
}: PaginationProps) {
  return (
    <div className="w-full flex justify-center">
      <div className="flex items-center space-x-4">
        <button
          onClick={onPrev}
          disabled={page === 1}
          className={`transition ${
            page === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          <LeftArrow />
        </button>

        <span className="font-semibold text-lg">
          {page}/{maxPage}
        </span>

        <button
          onClick={onNext}
          disabled={page === maxPage}
          className={`transition ${
            page === maxPage
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
