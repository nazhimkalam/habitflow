export function getBadge(streak) {
    if (streak >= 30) {
      return { label: "Gold", icon: "🥇" };
    } else if (streak >= 14) {
      return { label: "Silver", icon: "🥈" };
    } else if (streak >= 7) {
      return { label: "Bronze", icon: "🥉" };
    }
    return null;
  }
  