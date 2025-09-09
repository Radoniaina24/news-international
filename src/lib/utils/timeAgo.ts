// utils/timeAgo.ts
export function timeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return `${seconds} seconde${seconds > 1 ? "s" : ""}`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""}`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} heure${hours > 1 ? "s" : ""}`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} jour${days > 1 ? "s" : ""}`;

  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks} semaine${weeks > 1 ? "s" : ""}`;

  const months = Math.floor(days / 30);
  // Vérification pour éviter "0 mois"
  if (months < 12 && months > 0) return `${months} mois`;

  // Si months est 0, on continue vers les années
  const years = Math.floor(days / 365);

  // Gestion spéciale pour les périodes entre 4 semaines et 1 mois
  if (years === 0) {
    // Si on a moins d'un an mais plus de 4 semaines, on affiche en semaines
    const remainingWeeks = Math.floor(days / 7);
    if (remainingWeeks >= 4) {
      return `${remainingWeeks} semaine${remainingWeeks > 1 ? "s" : ""}`;
    }
    return "moins d'un mois";
  }

  return `${years} an${years > 1 ? "s" : ""}`;
}
