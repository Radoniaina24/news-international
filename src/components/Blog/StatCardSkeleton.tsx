"use client";

import { cn } from "@/lib/utils/classNames";

interface StatCardSkeletonProps {
  className?: string;
}

export function StatCardSkeleton({ className }: StatCardSkeletonProps) {
  return (
    <div
      className={cn(
        "flex items-center p-3 bg-white rounded-xl shadow-sm",
        "animate-pulse",
        className
      )}
    >
      {/* Icône skeleton */}
      <div className="flex-shrink-0 mr-3">
        <div className="w-5 h-5 rounded-full bg-gray-300" />
      </div>

      {/* Texte skeleton */}
      <div className="flex-1">
        <div className="h-5 w-32 bg-gray-300 rounded-md" />
      </div>
    </div>
  );
}
