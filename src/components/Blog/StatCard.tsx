"use client";

import { ReactNode } from "react";
import { Newspaper } from "lucide-react";
import { cn } from "@/lib/utils/classNames";

interface StatCardProps {
  icon?: ReactNode;
  count: number;
  singular: string;
  plural: string;
  className?: string;
}

export function StatCard({
  icon = <Newspaper className="w-5 h-5 text-teal-600" />,
  count,
  singular,
  plural,
  className,
}: StatCardProps) {
  return (
    <div className={cn("flex items-center", className)}>
      <div className="flex-shrink-0 mr-3">{icon}</div>
      <p className="text-lg font-bold text-gray-900">
        {count} {count > 1 ? plural : singular}
      </p>
    </div>
  );
}
