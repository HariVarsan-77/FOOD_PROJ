import { DEMO_STORAGE_KEY } from "./config";
import type { FoodRecord, RecordSource } from "@/types/records";

/**
 * Safe helpers for reading and writing the records the user adds in demo mode.
 *
 * All user records live in one localStorage key and are only ever APPENDED to.
 * Nothing in this file can erase or overwrite the existing records.
 */

/** localStorage is not available while rendering on the server. */
export function isStorageAvailable(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

/** Checks that a value read back from storage still looks like a FoodRecord. */
function isStoredRecord(value: unknown): value is FoodRecord {
  if (typeof value !== "object" || value === null) return false;
  const record = value as Partial<FoodRecord>;
  return (
    typeof record.id === "string" &&
    typeof record.foodItem === "string" &&
    typeof record.category === "string" &&
    typeof record.orderValue === "number" &&
    typeof record.deliveryTime === "number" &&
    typeof record.customerRating === "number" &&
    typeof record.createdAt === "string"
  );
}

/** Reads every user record. Returns an empty list when nothing is stored. */
export function readUserRecords(): FoodRecord[] {
  if (!isStorageAvailable()) return [];

  try {
    const raw = window.localStorage.getItem(DEMO_STORAGE_KEY);
    if (!raw) return [];

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    // Keep only records that still have the expected shape.
    return parsed.filter(isStoredRecord).map((record) => ({
      ...record,
      source: (record.source ?? "user") as RecordSource,
    }));
  } catch {
    // Broken or unreadable storage should never crash the page.
    return [];
  }
}

/**
 * Appends one record to the stored list.
 * Existing records are read first and written back together with the new one,
 * so nothing that was saved earlier is lost.
 */
export function appendUserRecord(record: FoodRecord): void {
  if (!isStorageAvailable()) return;

  const existing = readUserRecords();
  const updated = [...existing, record];
  window.localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(updated));
}

/** Number of user records currently stored in this browser. */
export function countUserRecords(): number {
  return readUserRecords().length;
}
