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

export function formatNumberWithComma(number: number): string {
  return number.toLocaleString("en-US");
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "2-digit",
  };
  return date.toLocaleDateString("en-US", options).replace(",", "");
}
