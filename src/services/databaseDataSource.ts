import { collection, getDocs, addDoc } from "firebase/firestore";
import { getDb, isFirebaseConfigured } from "./firebase";
import { DATABASE_CONFIGURED } from "./config";
import { DataSourceError, type DataSource } from "./dataSource.types";
import type { FoodRecord, NewFoodRecord } from "@/types/records";

/**
 * Firebase Firestore adapter for live database integration.
 *
 * All food records are saved in the "food_records" collection in Firestore.
 */

function assertDatabaseReady() {
  if (!DATABASE_CONFIGURED) {
    throw new DataSourceError(
      "Database mode is enabled in config.ts, but DATABASE_CONFIGURED is false."
    );
  }
  if (!isFirebaseConfigured()) {
    throw new DataSourceError(
      "Firebase credentials are missing or incomplete in .env.local. " +
      "Please set NEXT_PUBLIC_FIREBASE_API_KEY and NEXT_PUBLIC_FIREBASE_PROJECT_ID."
    );
  }
}

export const databaseDataSource: DataSource = {
  getDataSourceStatus() {
    const configured = DATABASE_CONFIGURED && isFirebaseConfigured();
    return {
      mode: "database",
      label: "Firebase Cloud Firestore",
      description: configured
        ? "Showing live records synchronized with Firebase Firestore."
        : "Firebase project is connected in code, but environment variables are missing in .env.local.",
      isLive: configured,
    };
  },

  async getRecords(): Promise<FoodRecord[]> {
    assertDatabaseReady();
    const db = getDb();
    if (!db) {
      throw new DataSourceError("Could not initialize Firebase Firestore.");
    }

    try {
      const recordsCol = collection(db, "food_records");
      const snapshot = await getDocs(recordsCol);

      const records: FoodRecord[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        records.push({
          id: docSnap.id,
          foodItem: String(data.foodItem ?? "Unknown Item"),
          category: String(data.category ?? "Other"),
          orderValue: Number(data.orderValue) || 0,
          deliveryTime: Number(data.deliveryTime) || 0,
          customerRating: Number(data.customerRating) || 0,
          createdAt: String(data.createdAt ?? new Date().toISOString()),
          source: "database",
        });
      });

      return records.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to load records from Firestore.";
      throw new DataSourceError(msg);
    }
  },

  async refreshRecords(): Promise<FoodRecord[]> {
    return this.getRecords();
  },

  async addRecord(record: NewFoodRecord): Promise<FoodRecord> {
    assertDatabaseReady();
    const db = getDb();
    if (!db) {
      throw new DataSourceError("Could not initialize Firebase Firestore.");
    }

    try {
      const recordsCol = collection(db, "food_records");
      const createdAt = new Date().toISOString();
      const docData = {
        foodItem: record.foodItem.trim(),
        category: record.category.trim(),
        orderValue: Number(record.orderValue),
        deliveryTime: Number(record.deliveryTime),
        customerRating: Number(record.customerRating),
        createdAt,
        source: "database",
      };

      const docRef = await addDoc(recordsCol, docData);

      return {
        id: docRef.id,
        ...docData,
        source: "database",
      };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to save record to Firestore.";
      throw new DataSourceError(msg);
    }
  },
};
