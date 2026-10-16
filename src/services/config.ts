import type { DataSourceMode } from "@/types/records";

/* ==================================================================
 * THE ONE PLACE TO SWITCH THE DATA SOURCE
 * ==================================================================
 *
 *  "demo"     (default) - the built-in sample dataset plus the records the
 *                         user adds in this browser (localStorage).
 *
 *  "database" - records are read from Firebase / Supabase through
 *               `src/services/databaseDataSource.ts`.
 *
 * To switch to a database, change the two values below:
 *
 *     export const DATA_SOURCE_MODE: DataSourceMode = "database";
 *     export const DATABASE_CONFIGURED = true;   // after filling in databaseDataSource.ts
 *
 * Nothing else in the app needs to change.
 */
export const DATA_SOURCE_MODE: DataSourceMode = "demo";

/** localStorage key holding the records the user added while in demo mode. */
export const DEMO_STORAGE_KEY = "food-delivery-analysis:user-records:v1";

/** Set to true once a Firebase / Supabase project has been configured. */
export const DATABASE_CONFIGURED = false;
