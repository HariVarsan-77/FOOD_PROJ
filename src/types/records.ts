/**
 * The record schema used everywhere in the app.
 *
 * It is intentionally small and flat so the same shape can be stored in
 * localStorage today and in Firebase / Supabase later without changes.
 */
export interface FoodRecord {
  /** Unique id, e.g. "sample-012" or "user-1729099123456". */
  id: string;
  /** Name of the ordered food item, e.g. "Chicken Biryani". */
  foodItem: string;
  /** Food category, must be one of FOOD_CATEGORIES. */
  category: string;
  /** Bill amount of the order. */
  orderValue: number;
  /** Delivery time in minutes. */
  deliveryTime: number;
  /** Customer rating on a 1-5 scale. */
  customerRating: number;
  /** When the record was created (ISO date string). */
  createdAt: string;
  /** Where the record comes from. Used to keep sample and live data apart. */
  source?: RecordSource;
}

/** A record exactly as the user types it in the form (id + timestamp are generated). */
export type NewFoodRecord = Omit<FoodRecord, "id" | "createdAt" | "source">;

/**
 * sample  -> the built-in read-only demo dataset
 * user    -> a record the user added, kept in this browser (demo mode)
 * database-> a record retrieved from Firebase / Supabase
 */
export type RecordSource = "sample" | "user" | "database";

/** The two modes the app can run in. */
export type DataSourceMode = "demo" | "database";

/** Small object used by the UI to show which data is currently displayed. */
export interface DataSourceStatus {
  mode: DataSourceMode;
  /** Short label, e.g. "Demo Data". */
  label: string;
  /** One sentence explaining what the user is looking at. */
  description: string;
  /** true when the database adapter is configured and selected. */
  isLive: boolean;
}
