// categoryMeta.ts
export const categoryMeta: Record<
  string,
  { color: string; icon: string; description: string }
> = {
  politique: {
    color: "#DC2626",
    icon: "Building2",
    description: "Actualités politiques nationales et internationales",
  },
  economie: {
    color: "#059669",
    icon: "TrendingUp",
    description: "Marchés financiers, entreprises et analyses économiques",
  },
  sport: {
    color: "#EA580C",
    icon: "Trophy",
    description: "Actualités sportives du monde entier",
  },
  technologie: {
    color: "#7C3AED",
    icon: "Smartphone",
    description: "Innovation, startups et nouvelles technologies",
  },
  culture: {
    color: "#DB2777",
    icon: "Palette",
    description: "Arts, spectacles et patrimoine culturel",
  },
};
