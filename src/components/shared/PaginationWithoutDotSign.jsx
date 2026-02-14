"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
//   if (totalPages <= 1) return null; // hide if only one page

  const pages = [];

  // Show max 5 pages at a time
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, currentPage + 2);

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
  
      {/* Prev Button */}
      <button
        className={`p-2 border rounded-md hover:bg-gray-100 transition ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Page Numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 border rounded-md text-sm transition ${
            page === currentPage
              ? "bg-[#3A9E75] text-white border-[#3A9E75]"
              : "hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        className={`p-2 border rounded-md hover:bg-gray-100 transition ${
          currentPage === totalPages
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer"
        }`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
