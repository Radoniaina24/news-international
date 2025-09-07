"use client";

import React from "react";

interface SkeletonProps {
  variant?: "default" | "featured" | "compact";
}

const BlogCardSkeleton: React.FC<SkeletonProps> = ({ variant = "default" }) => {
  if (variant === "featured") {
    return (
      <article className="relative animate-pulse">
        <div className="relative h-96 lg:h-[500px] overflow-hidden rounded-xl bg-gray-300 dark:bg-gray-700" />
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 text-white">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="h-6 w-20 rounded-full bg-gray-400 dark:bg-gray-600" />
            <span className="h-6 w-16 rounded-full bg-gray-400 dark:bg-gray-600" />
          </div>
          <div className="h-8 w-3/4 rounded bg-gray-400 dark:bg-gray-600 mb-3" />
          <div className="h-6 w-full rounded bg-gray-400 dark:bg-gray-600 mb-2" />
          <div className="h-6 w-5/6 rounded bg-gray-400 dark:bg-gray-600 mb-4" />
          <div className="flex items-center space-x-4 text-sm">
            <span className="h-4 w-20 rounded bg-gray-400 dark:bg-gray-600" />
            <span className="h-4 w-16 rounded bg-gray-400 dark:bg-gray-600" />
            <span className="h-4 w-24 rounded bg-gray-400 dark:bg-gray-600" />
          </div>
        </div>
      </article>
    );
  }

  if (variant === "compact") {
    return (
      <article className="flex space-x-4 animate-pulse">
        <div className="w-24 h-24 flex-shrink-0 rounded-lg bg-gray-300 dark:bg-gray-700" />
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="h-4 w-12 rounded bg-gray-300 dark:bg-gray-600" />
            <span className="h-4 w-10 rounded bg-gray-300 dark:bg-gray-600" />
          </div>
          <div className="h-5 w-3/4 rounded bg-gray-300 dark:bg-gray-600 mb-2" />
          <div className="h-4 w-1/2 rounded bg-gray-300 dark:bg-gray-600" />
        </div>
      </article>
    );
  }

  // Default
  return (
    <article className="bg-white dark:bg-gray-800 rounded-xl shadow-sm animate-pulse">
      <div className="relative overflow-hidden rounded-t-xl">
        <div className="w-full h-48 bg-gray-300 dark:bg-gray-700" />
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
          <span className="h-5 w-20 rounded-full bg-gray-400 dark:bg-gray-600" />
        </div>
      </div>

      <div className="p-6">
        <div className="h-6 w-3/4 rounded bg-gray-300 dark:bg-gray-600 mb-3" />
        <div className="h-4 w-full rounded bg-gray-300 dark:bg-gray-600 mb-2" />
        <div className="h-4 w-5/6 rounded bg-gray-300 dark:bg-gray-600 mb-4" />

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gray-400 dark:bg-gray-600" />
            <div>
              <div className="h-4 w-20 rounded bg-gray-300 dark:bg-gray-600 mb-1" />
              <div className="h-3 w-16 rounded bg-gray-300 dark:bg-gray-600" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="h-4 w-10 rounded bg-gray-300 dark:bg-gray-600" />
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogCardSkeleton;
