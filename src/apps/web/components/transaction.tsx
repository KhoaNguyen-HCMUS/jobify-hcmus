"use client";
import { useState } from "react";
import LeftArrow from "./arrowLeft";
import RightArrow from "./arrowRight";

interface TransactionProps {
  transaction: {
    date: string;
    type: string;
    description: string;
    amount: string;
  };
}

const transactions = [
  {
    date: "05/07/2025",
    type: "Job post",
    description: "Standard coin pack purchase for job postings.",
    amount: "-10",
  },
  {
    date: "05/07/2025",
    type: "Job post",
    description: "Standard coin pack purchase for job postings.",
    amount: "-10",
  },
  {
    date: "05/07/2025",
    type: "Job post",
    description: "Standard coin pack purchase for job postings.",
    amount: "-10",
  },
  {
    date: "05/07/2025",
    type: "Job post",
    description: "Standard coin pack purchase for job postings.",
    amount: "-10",
  },
  {
    date: "05/07/2025",
    type: "Job post",
    description: "Standard coin pack purchase for job postings.",
    amount: "-10",
  },
  {
    date: "05/07/2025",
    type: "Job post",
    description: "Standard coin pack purchase for job postings.",
    amount: "-10",
  },
  {
    date: "05/07/2025",
    type: "Job post",
    description: "Standard coin pack purchase for job postings.",
    amount: "-10",
  },
  {
    date: "05/07/2025",
    type: "Job post",
    description: "Standard coin pack purchase for job postings.",
    amount: "-10",
  },
  {
    date: "05/07/2025",
    type: "Job post",
    description: "Standard coin pack purchase for job postings.",
    amount: "-10",
  },
  {
    date: "05/07/2025",
    type: "Job post",
    description: "Standard coin pack purchase for job postings.",
    amount: "-10",
  },
  {
    date: "05/07/2025",
    type: "Job post",
    description: "Standard coin pack purchase for job postings.",
    amount: "-10",
  },
  {
    date: "05/07/2025",
    type: "Job post",
    description: "Standard coin pack purchase for job postings.",
    amount: "-10",
  },
];

export default function Transaction() {
  const [currentPage, setCurrentPage] = useState(1);

  const TRANSACTION_PER_PAGE = 9;
  const totalPages = Math.ceil(transactions.length / TRANSACTION_PER_PAGE);

  // Tính toán TRANSACTION hiển thị trên trang hiện tại
  const startIndex = (currentPage - 1) * TRANSACTION_PER_PAGE;
  const endIndex = startIndex + TRANSACTION_PER_PAGE;
  const currentTransaction = transactions.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <div className="flex flex-col">
      {currentTransaction.map((transaction, index) => (
        <div
          key={index}
          className={`block py-2 px-4 ${
            index % 2 === 0 ? "bg-highlight-20" : "bg-highlight-40"
          } text-primary hover:bg-highlight transition-colors`}
        >
          <div className="flex">
            <span className="flex-2">{transaction.date}</span>
            <span className="flex-1">{transaction.type}</span>
            <span className="flex-5">{transaction.description}</span>
            <span className="flex-1">{transaction.amount}</span>
          </div>
        </div>
      ))}
      <div className="w-full mt-4 pb-6 flex justify-center items-center space-x-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`${
            currentPage === 1
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer"
          }`}
        >
          <LeftArrow />
        </button>
        <span className="font-semibold text-lg">
          {currentPage}/{totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`${
            currentPage === totalPages
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
