/**
 * Food categories used by the "Food Data" form and by every chart.
 * Add or rename entries here and the whole app follows.
 */
export const FOOD_CATEGORIES = [
  "Fast Food",
  "Pizza",
  "Burgers",
  "Indian Food",
  "Chinese Food",
  "Desserts",
  "Beverages",
  "Other",
] as const;

export type FoodCategory = (typeof FOOD_CATEGORIES)[number];

/**
 * One warm, food-inspired colour per category so a category always keeps the
 * same colour in every chart of the app.
 */
export const CATEGORY_COLORS: Record<string, string> = {
  "Fast Food": "#E4762B",
  Pizza: "#C1440E",
  Burgers: "#A8522A",
  "Indian Food": "#D98324",
  "South Indian": "#D98324",
  "North Indian": "#C1440E",
  Biryani: "#E85D04",
  "Chinese Food": "#8C5A3C",
  Chinese: "#8C5A3C",
  Desserts: "#E0A458",
  Beverages: "#4F8A5B",
  Other: "#9C7B5F",
};

/** Colour used for a category that is not in CATEGORY_COLORS. */
export const DEFAULT_CATEGORY_COLOR = "#C1440E";

export function getCategoryColor(category: string): string {
  return CATEGORY_COLORS[category] ?? DEFAULT_CATEGORY_COLOR;
}
