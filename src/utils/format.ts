export function formatNumber(value: number, showPlus: boolean = true): string {
  if (value >= 1000000) {
    return `${showPlus && value > 0 ? "+" : ""} ${(value / 1000000).toFixed(
      1
    )}M`;
  }
  if (value >= 1000) {
    return `${showPlus && value > 0 ? "+" : ""} ${(value / 1000).toFixed(1)}K`;
  }
  return value.toString();
}

export function formatPercentage(
  value: number,
  showPlus: boolean = true
): string {
  return `${showPlus && value >= 0 ? "+" : ""}${value.toFixed(1)}%`;
}
