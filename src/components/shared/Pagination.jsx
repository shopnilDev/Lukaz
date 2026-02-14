"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Icon } from "@iconify/react";



export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  if (totalPages <= 1) return null; // Hide if only one page

  const pages= [];

  // Always include the first page
  pages.push(1);

  // Add ellipsis after first page if needed
  if (currentPage > 4) {
    pages.push("...");
  }

  // Calculate middle pages dynamically
  const startPage = Math.max(2, currentPage - 2);
  const endPage = Math.min(totalPages - 1, currentPage + 2);

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  // Add ellipsis before last page if needed
  if (currentPage < totalPages - 3) {
    pages.push("...");
  }

  // Always include the last page
  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {/* Prev Button */}
      <button
        className={`p-1 border rounded-md hover:bg-gray-100 transition ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <Icon icon="tdesign:arrow-left" width="24" height="24" />
        {/* <ChevronLeft className="w-4 h-4" /> */}
      </button>

      {/* Page Numbers */}
      {pages.map((page, index) =>
        typeof page === "number" ? (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 border rounded-md text-sm transition ${
              page === currentPage
                ? "bg-[#3A9E75] text-white border-[#3A9E75]"
                : "hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        ) : (
          <span key={index} className="px-2">
            {page}
          </span>
        )
      )}

      {/* Next Button */}
      <button
        className={`p-1 border rounded-md hover:bg-gray-100 transition ${
          currentPage === totalPages
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer"
        }`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <Icon icon="tdesign:arrow-right" width="24" height="24" />
        {/* <ChevronRight className="w-4 h-4" /> */}
      </button>
    </div>
  );
}
