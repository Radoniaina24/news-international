"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FC } from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination: FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
  className = "",
}) => {
  if (totalPages <= 1) return null;

  const renderPageButton = (page: number) => (
    <Button
      key={page}
      variant={page === currentPage ? "default" : "outline"}
      size="sm"
      onClick={() => onPageChange(page)}
      className={`h-9 w-9 rounded-lg  font-medium transition-all ${
        page === currentPage
          ? "bg-blue-600 dark:bg-blue-600 text-white shadow-md hover:bg-blue-700 scale-105"
          : "border-gray-300 dark:bg-white text-gray-700 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700"
      }`}
    >
      {page}
    </Button>
  );

  return (
    <div
      className={`flex items-center justify-center gap-2 mt-12 bg-white p-6 rounded-2xl shadow-lg ${className}`}
    >
      {/* Précédent */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="gap-1 px-3 py-2 h-9 border-gray-300 dark:bg-white text-gray-700 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
        Précédent
      </Button>

      {/* Numéros de page */}
      <div className="flex gap-1">
        {currentPage > 3 && (
          <>
            {renderPageButton(1)}
            {currentPage > 4 && (
              <span className="px-2 py-1 dark:bg-white text-gray-400">...</span>
            )}
          </>
        )}

        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter((page) => Math.abs(page - currentPage) <= 1)
          .map((page) => renderPageButton(page))}

        {currentPage < totalPages - 2 && (
          <>
            {currentPage < totalPages - 3 && (
              <span className="px-2 py-1 dark:bg-white text-gray-400">...</span>
            )}
            {renderPageButton(totalPages)}
          </>
        )}
      </div>

      {/* Suivant */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="gap-1 px-3 py-2 h-9 border-gray-300 dark:bg-white text-gray-700 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 transition-colors"
      >
        Suivant
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Pagination;
