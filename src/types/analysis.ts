/**
 * Result types returned by the calculation functions in `src/utils/analysis.ts`.
 * The UI and the chart components only read these objects, so the calculations
 * stay independent from the pages.
 */

/** One bar in a "value per category" chart. */
export interface CategoryMetric {
  category: string;
  value: number;
  /** Percentage of the total (0-100). */
  share: number;
}

export interface RevenueAnalysis {
  eligibleOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  byCategory: CategoryMetric[];
  topCategory: CategoryMetric | null;
  hasData: boolean;
}

export interface PopularityAnalysis {
  eligibleOrders: number;
  byCategory: CategoryMetric[];
  topCategory: CategoryMetric | null;
  hasData: boolean;
}

/** One bar in the delivery-time chart. */
export interface DeliveryCategoryMetric {
  category: string;
  averageDeliveryTime: number;
  orderCount: number;
  /** average of this category minus the overall average (positive = slower). */
  differenceFromAverage: number;
}

export interface DeliveryAnalysis {
  eligibleOrders: number;
  overallAverageDeliveryTime: number;
  byCategory: DeliveryCategoryMetric[];
  fastestCategory: DeliveryCategoryMetric | null;
  slowestCategory: DeliveryCategoryMetric | null;
  slowerThanAverage: DeliveryCategoryMetric[];
  fasterThanAverage: DeliveryCategoryMetric[];
  hasData: boolean;
}

/** One bar in the satisfaction chart. */
export interface RatingGroup {
  label: string;
  orderCount: number;
  averageRating: number;
}

export interface SatisfactionAnalysis {
  eligibleOrders: number;
  overallAverageDeliveryTime: number;
  fasterGroup: RatingGroup;
  slowerGroup: RatingGroup;
  /** faster average rating minus slower average rating (0 when a group is empty). */
  difference: number;
  /** false when one of the two groups has no valid records. */
  hasData: boolean;
}

/** One category in the category ratings ranking. */
export interface CategoryRatingMetric {
  category: string;
  averageRating: number;
  orderCount: number;
}

export interface CategoryRatingsAnalysis {
  eligibleOrders: number;
  byCategory: CategoryRatingMetric[];
  highestRatedCategory: CategoryRatingMetric | null;
  lowestRatedCategory: CategoryRatingMetric | null;
  hasData: boolean;
}

/** Numbers shown on the home page. `null` means "no valid data for this metric". */
export interface SummaryStats {
  validOrders: number;
  totalRevenue: number | null;
  averageDeliveryTime: number | null;
  averageRating: number | null;
}

