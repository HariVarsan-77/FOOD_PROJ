import type {
  CategoryMetric,
  CategoryRatingMetric,
  CategoryRatingsAnalysis,
  DeliveryAnalysis,
  DeliveryCategoryMetric,
  PopularityAnalysis,
  RevenueAnalysis,
  SatisfactionAnalysis,
  SummaryStats,
} from "@/types/analysis";
import type { FoodRecord } from "@/types/records";

/**
 * The four analyses of this project, written as plain functions.
 *
 * They are the JavaScript equivalent of the Pandas calculations from the
 * original notebook:
 *   groupby("food_category")["order_value"].sum()   -> revenue by category
 *   value_counts()                                 -> orders by category
 *   groupby("food_category")["delivery_time"].mean() -> delivery time by category
 *   two groups split on the average delivery time   -> ratings comparison
 *
 * Every function takes an array of records and returns a plain object, so the
 * pages and charts never need to know how the numbers were produced.
 */

/* ------------------------------------------------------------------ */
/* Helpers: which records can be used for which calculation            */
/* ------------------------------------------------------------------ */

/** A record has a usable order value (a real, positive number). */
export function hasValidOrderValue(record: FoodRecord): boolean {
  return Number.isFinite(record.orderValue) && record.orderValue > 0;
}

/** A record has a usable delivery time (a real, positive number of minutes). */
export function hasValidDeliveryTime(record: FoodRecord): boolean {
  return Number.isFinite(record.deliveryTime) && record.deliveryTime > 0;
}

/** A record has a usable customer rating (1 to 5). */
export function hasValidRating(record: FoodRecord): boolean {
  return Number.isFinite(record.customerRating) && record.customerRating >= 1 && record.customerRating <= 5;
}

/** A record that can be used by all four analyses. */
export function isValidRecord(record: FoodRecord): boolean {
  return hasValidOrderValue(record) && hasValidDeliveryTime(record) && hasValidRating(record);
}

/** Average of a list of numbers, or 0 for an empty list. */
function average(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

/** Groups records by category and returns a Map of category -> records. */
function groupByCategory(records: FoodRecord[]): Map<string, FoodRecord[]> {
  const groups = new Map<string, FoodRecord[]>();
  for (const record of records) {
    const group = groups.get(record.category);
    if (group) {
      group.push(record);
    } else {
      groups.set(record.category, [record]);
    }
  }
  return groups;
}

/* ------------------------------------------------------------------ */
/* 1. Revenue analysis                                                 */
/* ------------------------------------------------------------------ */

/**
 * Total revenue, revenue per category, average order value and the
 * highest earning category.
 *
 * Only records with a valid order value are counted. This dataset has no
 * cancellation / refund / discount field, so every eligible order value is
 * treated as a real sale (see the note on the Revenue Analysis page).
 */
export function analyzeRevenue(records: FoodRecord[]): RevenueAnalysis {
  const eligible = records.filter(hasValidOrderValue);
  const totalRevenue = eligible.reduce((sum, record) => sum + record.orderValue, 0);
  const averageOrderValue = eligible.length > 0 ? totalRevenue / eligible.length : 0;

  const byCategory: CategoryMetric[] = [];
  for (const [category, group] of groupByCategory(eligible)) {
    const value = group.reduce((sum, record) => sum + record.orderValue, 0);
    byCategory.push({
      category,
      value,
      share: totalRevenue > 0 ? (value / totalRevenue) * 100 : 0,
    });
  }
  byCategory.sort((a, b) => b.value - a.value);

  return {
    eligibleOrders: eligible.length,
    totalRevenue,
    averageOrderValue,
    byCategory,
    topCategory: byCategory[0] ?? null,
    hasData: eligible.length > 0,
  };
}

/* ------------------------------------------------------------------ */
/* 2. Popular food categories                                          */
/* ------------------------------------------------------------------ */

/** Number of orders per category, the most popular category and its share. */
export function analyzePopularity(records: FoodRecord[]): PopularityAnalysis {
  const eligible = records.filter(hasValidOrderValue);
  const totalOrders = eligible.length;

  const byCategory: CategoryMetric[] = [];
  for (const [category, group] of groupByCategory(eligible)) {
    byCategory.push({
      category,
      value: group.length,
      share: totalOrders > 0 ? (group.length / totalOrders) * 100 : 0,
    });
  }
  byCategory.sort((a, b) => b.value - a.value);

  return {
    eligibleOrders: totalOrders,
    byCategory,
    topCategory: byCategory[0] ?? null,
    hasData: totalOrders > 0,
  };
}

/* ------------------------------------------------------------------ */
/* 3. Delivery efficiency                                              */
/* ------------------------------------------------------------------ */

/**
 * Overall and per-category average delivery time, the fastest and slowest
 * category, and the difference of every category from the overall average.
 */
export function analyzeDelivery(records: FoodRecord[]): DeliveryAnalysis {
  const eligible = records.filter(hasValidDeliveryTime);
  const overallAverageDeliveryTime = average(eligible.map((record) => record.deliveryTime));

  const byCategory: DeliveryCategoryMetric[] = [];
  for (const [category, group] of groupByCategory(eligible)) {
    const categoryAverage = average(group.map((record) => record.deliveryTime));
    byCategory.push({
      category,
      averageDeliveryTime: categoryAverage,
      orderCount: group.length,
      differenceFromAverage: categoryAverage - overallAverageDeliveryTime,
    });
  }
  byCategory.sort((a, b) => a.averageDeliveryTime - b.averageDeliveryTime);

  return {
    eligibleOrders: eligible.length,
    overallAverageDeliveryTime,
    byCategory,
    fastestCategory: byCategory[0] ?? null,
    slowestCategory: byCategory.length > 0 ? byCategory[byCategory.length - 1] : null,
    fasterThanAverage: byCategory.filter((entry) => entry.differenceFromAverage < 0),
    slowerThanAverage: [...byCategory]
      .filter((entry) => entry.differenceFromAverage > 0)
      .sort((a, b) => b.differenceFromAverage - a.differenceFromAverage),
    hasData: eligible.length > 0,
  };
}

/* ------------------------------------------------------------------ */
/* 4. Customer satisfaction                                            */
/* ------------------------------------------------------------------ */

/**
 * Splits the orders into "faster than the overall average" and
 * "average or slower" groups and compares their average rating.
 */
export function analyzeSatisfaction(records: FoodRecord[]): SatisfactionAnalysis {
  const eligible = records.filter(
    (record) => hasValidDeliveryTime(record) && hasValidRating(record),
  );

  const overallAverageDeliveryTime = average(eligible.map((record) => record.deliveryTime));
  const faster = eligible.filter((record) => record.deliveryTime < overallAverageDeliveryTime);
  const slower = eligible.filter((record) => record.deliveryTime >= overallAverageDeliveryTime);

  const fasterGroup = {
    label: "Faster than average",
    orderCount: faster.length,
    averageRating: average(faster.map((record) => record.customerRating)),
  };
  const slowerGroup = {
    label: "Average or slower",
    orderCount: slower.length,
    averageRating: average(slower.map((record) => record.customerRating)),
  };

  const hasData = fasterGroup.orderCount > 0 && slowerGroup.orderCount > 0;

  return {
    eligibleOrders: eligible.length,
    overallAverageDeliveryTime,
    fasterGroup,
    slowerGroup,
    difference: hasData ? fasterGroup.averageRating - slowerGroup.averageRating : 0,
    hasData,
  };
}

/* ------------------------------------------------------------------ */
/* Summary numbers for the home page                                   */
/* ------------------------------------------------------------------ */

/**
 * Headline metrics for the currently selected dataset.
 * A metric is `null` when there is no valid data for it, so the UI can show an
 * empty-state message instead of a misleading zero.
 */
export function getSummaryStats(records: FoodRecord[]): SummaryStats {
  const valid = records.filter(isValidRecord);

  return {
    validOrders: valid.length,
    totalRevenue: valid.length > 0 ? valid.reduce((sum, record) => sum + record.orderValue, 0) : null,
    averageDeliveryTime:
      valid.length > 0 ? average(valid.map((record) => record.deliveryTime)) : null,
    averageRating:
      valid.length > 0 ? average(valid.map((record) => record.customerRating)) : null,
  };
}

/* ------------------------------------------------------------------ */
/* 5. Category ratings analysis (Highest and Lowest Rated)            */
/* ------------------------------------------------------------------ */

/**
 * Average customer satisfaction rating per category, ordered from highest
 * to lowest rated. Uses existing rating validity criteria and average calculation.
 */
export function analyzeCategoryRatings(records: FoodRecord[]): CategoryRatingsAnalysis {
  const eligible = records.filter(hasValidRating);
  const byCategory: CategoryRatingMetric[] = [];

  for (const [category, group] of groupByCategory(eligible)) {
    const ratings = group.map((record) => record.customerRating);
    byCategory.push({
      category,
      averageRating: average(ratings),
      orderCount: group.length,
    });
  }

  // Sort descending by average rating; use order volume as tie-breaker
  byCategory.sort((a, b) => b.averageRating - a.averageRating || b.orderCount - a.orderCount);

  return {
    eligibleOrders: eligible.length,
    byCategory,
    highestRatedCategory: byCategory[0] ?? null,
    lowestRatedCategory: byCategory.length > 0 ? byCategory[byCategory.length - 1] : null,
    hasData: eligible.length > 0,
  };
}

