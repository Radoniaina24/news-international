// Interfaces
export interface DateRange {
  after?: string;
  before?: string;
}

export type StrictPeriod = "today" | "week" | "month" | "year" | "all";

// Fonction utilitaire pour formater en ISO
const toISO = (date: Date): string => date.toISOString();

/**
 * Retourne un intervalle de dates correspondant à une période donnée.
 * @param period - Période stricte ("today" | "week" | "month" | "year" | "all")
 */
export const getDateRangeForStrictPeriod = (period: string): DateRange => {
  const now = new Date();

  switch (period) {
    case "today": {
      const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const end = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1
      );

      return { after: toISO(start), before: toISO(end) };
    }

    case "week": {
      const start = new Date(now);
      start.setDate(now.getDate() - now.getDay());
      start.setHours(0, 0, 0, 0);

      const end = new Date(start);
      end.setDate(start.getDate() + 7);

      return { after: toISO(start), before: toISO(end) };
    }

    case "month": {
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 1);

      return { after: toISO(start), before: toISO(end) };
    }

    case "year": {
      const start = new Date(now.getFullYear(), 0, 1);
      const end = new Date(now.getFullYear() + 1, 0, 1);

      return { after: toISO(start), before: toISO(end) };
    }

    case "all": {
      // Aucun filtre, couvre toutes les dates
      return {};
    }

    default: {
      // Sécurité si quelqu’un ajoute un mauvais paramètre
      throw new Error(`Période non reconnue : ${period}`);
    }
  }
};
