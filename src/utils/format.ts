/**
 * Small formatting helpers so every page shows numbers in the same way.
 * The calculations themselves always keep raw numbers; only the UI rounds them.
 */

/** "₹1,23,456.78" (Indian grouping). */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);
}

/** "1,23,456" */
export function formatNumber(value: number, maximumFractionDigits = 0): string {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits }).format(value);
}

/** "34.4 min" */
export function formatMinutes(value: number): string {
  return `${value.toFixed(1)} min`;
}

/** "4.35" - ratings always use two decimals. */
export function formatRating(value: number): string {
  return value.toFixed(2);
}

/** "27.96%" */
export function formatPercent(value: number, maximumFractionDigits = 2): string {
  return `${value.toFixed(maximumFractionDigits)}%`;
}

/** Signed difference, e.g. "+4.28 min" / "-9.94 min". */
export function formatSignedMinutes(value: number): string {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2)} min`;
}

/** "05 Jan 2025" */
export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
