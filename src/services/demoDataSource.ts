import { SAMPLE_RECORDS } from "@/data/sampleRecords";
import type { DataSource } from "./dataSource.types";
import { appendUserRecord, readUserRecords } from "./storage";
import type { FoodRecord, NewFoodRecord } from "@/types/records";

/**
 * Demo data source.
 *
 * It combines two clearly separated groups of records:
 *   1. the built-in sample dataset (`SAMPLE_RECORDS`) - read only,
 *   2. the records the user added in this browser (localStorage).
 *
 * The sample records are never written to storage and the user records are
 * never mixed into the sample array, so sample data can be removed later
 * without touching anything the user saved.
 */

/** Copies so a page can never accidentally modify the read-only sample data. */
function getSampleRecords(): FoodRecord[] {
  return SAMPLE_RECORDS.map((record) => ({ ...record, source: "sample" as const }));
}

/** All records shown while the app runs in demo mode. */
function loadDemoRecords(): FoodRecord[] {
  const userRecords = readUserRecords().map((record) => ({ ...record, source: "user" as const }));
  return [...userRecords, ...getSampleRecords()];
}

/** Small delay so the loading state is visible instead of flashing. */
function wait(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export const demoDataSource: DataSource = {
  getDataSourceStatus() {
    return {
      mode: "demo",
      label: "Demo Data",
      description: "Showing the built-in sample dataset plus the records saved in this browser.",
      isLive: false,
    };
  },

  async getRecords() {
    return loadDemoRecords();
  },

  async refreshRecords() {
    await wait(250);
    return loadDemoRecords();
  },

  async addRecord(input: NewFoodRecord) {
    await wait(250);

    const record: FoodRecord = {
      ...input,
      id: `user-${Date.now()}`,
      createdAt: new Date().toISOString(),
      source: "user",
    };

    // Append only: previously saved records stay exactly where they are.
    appendUserRecord(record);
    return record;
  },
};
