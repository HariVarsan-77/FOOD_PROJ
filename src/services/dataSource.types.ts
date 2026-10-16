import type { DataSourceStatus, FoodRecord, NewFoodRecord } from "@/types/records";

/**
 * A data source is the single place the app reads and writes records.
 * The UI never talks to Firebase or Supabase directly - it only talks to this
 * interface, so the backend can be swapped without touching the pages.
 */
export interface DataSource {
  /** Where the currently displayed records come from. */
  getDataSourceStatus(): DataSourceStatus;
  /** Reads the records of this source. */
  getRecords(): Promise<FoodRecord[]>;
  /** Forces a fresh read (used by the "Refresh" button). */
  refreshRecords(): Promise<FoodRecord[]>;
  /** Adds one record without touching the records that already exist. */
  addRecord(record: NewFoodRecord): Promise<FoodRecord>;
}

/** Error type the UI can show as a friendly message. */
export class DataSourceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DataSourceError";
  }
}

/** Turns any thrown value into a readable message. */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return "Something went wrong while talking to the data source.";
}
