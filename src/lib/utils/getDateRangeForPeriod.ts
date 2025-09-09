// Définition des interfaces
export interface DateRange {
  after?: string;
  before?: string;
}

export type StrictPeriod = "today" | "week" | "month" | "year" | string;

export const getDateRangeForStrictPeriod = (
  period: StrictPeriod
): DateRange => {
  // Même implémentation que ci-dessus
  const now = new Date();

  switch (period) {
    case "today": {
      const todayStart = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
      );
      const todayEnd = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1
      );
      return {
        after: todayStart.toISOString(),
        before: todayEnd.toISOString(),
      };
    }

    case "week": {
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay());
      startOfWeek.setHours(0, 0, 0, 0);

      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 7);
      return {
        after: startOfWeek.toISOString(),
        before: endOfWeek.toISOString(),
      };
    }

    case "month": {
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
      return {
        after: startOfMonth.toISOString(),
        before: endOfMonth.toISOString(),
      };
    }

    case "year": {
      const startOfYear = new Date(now.getFullYear(), 0, 1);
      const endOfYear = new Date(now.getFullYear() + 1, 0, 1);
      return {
        after: startOfYear.toISOString(),
        before: endOfYear.toISOString(),
      };
    }

    default: {
      return {};
    }
  }
};
