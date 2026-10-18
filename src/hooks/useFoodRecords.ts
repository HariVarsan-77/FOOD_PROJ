"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { getDataSource, getErrorMessage } from "@/services";
import type {
  CategoryRatingsAnalysis,
  DeliveryAnalysis,
  PopularityAnalysis,
  RevenueAnalysis,
  SatisfactionAnalysis,
  SummaryStats,
} from "@/types/analysis";
import type { DataSourceStatus, FoodRecord, NewFoodRecord } from "@/types/records";
import {
  analyzeCategoryRatings,
  analyzeDelivery,
  analyzePopularity,
  analyzeRevenue,
  analyzeSatisfaction,
  getSummaryStats,
} from "@/utils/analysis";

export interface UseFoodRecordsResult {
  /** Records of the currently active data source. */
  records: FoodRecord[];
  status: DataSourceStatus;
  isLoading: boolean;
  isRefreshing: boolean;
  /** Message to show when the data source failed. */
  error: string | null;
  /** Re-reads the records (used by the "Refresh" button). */
  refresh: () => Promise<void>;
  /** Saves one new record and re-reads the dataset. */
  addRecord: (record: NewFoodRecord) => Promise<FoodRecord>;
  /** All four analyses, recalculated whenever the dataset changes. */
  revenue: RevenueAnalysis;
  popularity: PopularityAnalysis;
  delivery: DeliveryAnalysis;
  satisfaction: SatisfactionAnalysis;
  categoryRatings: CategoryRatingsAnalysis;
  summary: SummaryStats;
  sampleCount: number;
  userCount: number;
}

/**
 * The single hook every page uses to get data.
 *
 * It loads the records from the active data source, keeps loading / error state
 * and recalculates all four analyses with `useMemo` whenever the records change.
 */
export function useFoodRecords(): UseFoodRecordsResult {
  const dataSource = useMemo(() => getDataSource(), []);
  const status = useMemo(() => dataSource.getDataSourceStatus(), [dataSource]);

  const [records, setRecords] = useState<FoodRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initial load. Every state update happens after an `await`, so the effect
  // never triggers a synchronous re-render.
  useEffect(() => {
    let isCancelled = false;

    void (async () => {
      try {
        const nextRecords = await dataSource.getRecords();
        if (isCancelled) return;
        setRecords(nextRecords);
        setError(null);
      } catch (loadError) {
        if (isCancelled) return;
        // A failed request must never silently fall back to sample data.
        setRecords([]);
        setError(getErrorMessage(loadError));
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    })();

    return () => {
      isCancelled = true;
    };
  }, [dataSource]);

  const refresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      setRecords(await dataSource.refreshRecords());
      setError(null);
    } catch (loadError) {
      setRecords([]);
      setError(getErrorMessage(loadError));
    } finally {
      setIsRefreshing(false);
    }
  }, [dataSource]);

  const addRecord = useCallback(
    async (record: NewFoodRecord) => {
      const created = await dataSource.addRecord(record);
      // Re-read the source so the new record is included and nothing is lost.
      setRecords(await dataSource.getRecords());
      setError(null);
      return created;
    },
    [dataSource],
  );

  // Calculations run only when the dataset changes, never on every render.
  const revenue = useMemo(() => analyzeRevenue(records), [records]);
  const popularity = useMemo(() => analyzePopularity(records), [records]);
  const delivery = useMemo(() => analyzeDelivery(records), [records]);
  const satisfaction = useMemo(() => analyzeSatisfaction(records), [records]);
  const categoryRatings = useMemo(() => analyzeCategoryRatings(records), [records]);
  const summary = useMemo(() => getSummaryStats(records), [records]);

  const sampleCount = useMemo(
    () => records.filter((record) => record.source === "sample").length,
    [records],
  );
  const userCount = useMemo(
    () => records.filter((record) => record.source === "user").length,
    [records],
  );

  return {
    records,
    status,
    isLoading,
    isRefreshing,
    error,
    refresh,
    addRecord,
    revenue,
    popularity,
    delivery,
    satisfaction,
    categoryRatings,
    summary,
    sampleCount,
    userCount,
  };
}
