import { DATABASE_CONFIGURED } from "./config";
import { DataSourceError, type DataSource } from "./dataSource.types";
import type { FoodRecord } from "@/types/records";

/**
 * Firebase / Supabase adapter - the integration point for a real database.
 *
 * Nothing here runs while `DATA_SOURCE_MODE` in `src/services/config.ts` is
 * "demo". When you are ready to connect a real backend:
 *
 *   1. Follow "Connecting Firebase or Supabase" in README.md.
 *   2. Install the client (`npm install @supabase/supabase-js` or `firebase`).
 *   3. Fill in the three TODO methods below (they all use the same pattern).
 *   4. Set `DATABASE_CONFIGURED = true` in `src/services/config.ts`
 *      and `DATA_SOURCE_MODE = "database"`.
 *
 * The rest of the app does not change: the pages only use the `DataSource`
 * interface, so the charts and tables start showing database records
 * automatically.
 *
 * The stored record schema matches `FoodRecord`:
 *   id, foodItem, category, orderValue, deliveryTime, customerRating, createdAt
 */

/** Replaces this with a real client instance after installing the SDK. */
const databaseClient: null = null;

/** Throws a clear, actionable error instead of silently returning sample data. */
function assertDatabaseReady(): void {
  if (!DATABASE_CONFIGURED || databaseClient === null) {
    throw new DataSourceError(
      "The database is not connected yet. Add your Firebase or Supabase project, " +
        "fill in src/services/databaseDataSource.ts and set DATABASE_CONFIGURED = true " +
        "(see README.md -> Connecting Firebase or Supabase).",
    );
  }
}

/* ---------------------------------------------------------------------
 * Example implementation with Supabase
 * ---------------------------------------------------------------------
 * import { createClient } from "@supabase/supabase-js";
 *
 * const supabase = createClient(
 *   process.env.NEXT_PUBLIC_SUPABASE_URL!,
 *   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
 * );
 *
 * // getRecords()
 * const { data, error } = await supabase.from("food_records").select("*");
 * if (error) throw new DataSourceError(error.message);
 * return data.map(toFoodRecord);
 *
 * // addRecord()
 * const { data, error } = await supabase.from("food_records").insert(toRow(record)).select().single();
 * if (error) throw new DataSourceError(error.message);
 * return toFoodRecord(data);
 *
 * // removeSampleData(): the sample dataset is never inserted into the table,
 * // so there is nothing to delete - database records are always database-only.
 * ------------------------------------------------------------------- */

export const databaseDataSource: DataSource = {
  getDataSourceStatus() {
    return {
      mode: "database",
      label: "Live Database Data",
      description: DATABASE_CONFIGURED
        ? "Showing records retrieved from the connected database."
        : "The database is selected but not connected yet - no records can be shown.",
      isLive: DATABASE_CONFIGURED,
    };
  },

  async getRecords(): Promise<FoodRecord[]> {
    assertDatabaseReady();
    // TODO: replace with the real SELECT query shown in the example above.
    throw new DataSourceError("getRecords() is not implemented yet.");
  },

  async refreshRecords(): Promise<FoodRecord[]> {
    assertDatabaseReady();
    // TODO: replace with the real SELECT query shown in the example above.
    throw new DataSourceError("refreshRecords() is not implemented yet.");
  },

  // The parameter is omitted on purpose: this method throws until the real
  // INSERT query is added, so it never needs the record it was given.
  async addRecord(): Promise<FoodRecord> {
    assertDatabaseReady();
    // TODO: replace with the real INSERT query shown in the example above.
    throw new DataSourceError("addRecord() is not implemented yet.");
  },
};
