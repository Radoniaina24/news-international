// hooks/usePostsByPeriod.ts
import { useState, useCallback } from "react";

export interface Period {
  value: string;
  label: string;
}
export const periods: Period[] = [
  { value: "today", label: "Aujourd'hui" },
  { value: "week", label: "Cette semaine" },
  { value: "month", label: "Ce mois" },
  { value: "year", label: "Cette année" },
  { value: "all", label: "Tous" },
];

export const usePostsByPeriod = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>("all");

  const handlePeriodChange = useCallback((period: string) => {
    setSelectedPeriod(period);
  }, []);

  return {
    selectedPeriod,
    handlePeriodChange,
    periods,
  };
};
