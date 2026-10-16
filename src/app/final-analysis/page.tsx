"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Gauge, IndianRupee, ListChecks, Star, Wallet } from "lucide-react";
import { AnalysisPageFrame, AnalysisSection } from "@/components/analysis/AnalysisPageFrame";
import { CategoryBarChart, type BarChartPoint } from "@/components/charts/CategoryBarChart";
import {
  BurgerIllustration,
  DeliveryBagIllustration,
  DessertIllustration,
  DrinkIllustration,
  FriesIllustration,
  FoodLogoMark,
  NoodlesIllustration,
  PizzaIllustration,
  SaladIllustration,
} from "@/components/illustrations/FoodIllustrations";
import { CaveatNote, InsightPanel, StatTile } from "@/components/ui/StatTile";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/StateBlocks";
import { getCategoryColor } from "@/data/categories";
import { useFoodRecords } from "@/hooks/useFoodRecords";
import {
  formatCurrency,
  formatMinutes,
  formatNumber,
  formatPercent,
  formatRating,
  formatSignedMinutes,
} from "@/utils/format";

/** Rounded tile that holds one cartoon food illustration. */
function IllustrationTile({ children }: { children: ReactNode }) {
  return (
    <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl border border-peach-deep/60 bg-cream p-2.5">
      {children}
    </span>
  );
}

/** Paragraph text block used next to an illustration. */
function SummaryText({ children }: { children: ReactNode }) {
  return <div className="space-y-2 text-sm leading-relaxed text-brown">{children}</div>;
}

/**
 * The closing page of the project.
 *
 * It repeats the four calculations on one screen - each with its result in
 * words, its plot and an illustration - and ends with the overall conclusions
 * and the recommendations that follow from them.
 */
export default function FinalAnalysisPage() {
  const {
    status,
    isLoading,
    error,
    refresh,
    revenue,
    popularity,
    delivery,
    satisfaction,
    summary,
    sampleCount,
    userCount,
  } = useFoodRecords();

  const hasAnyData =
    revenue.hasData || popularity.hasData || delivery.hasData || satisfaction.hasData;

  /* Same charts as the four analysis pages, built from the same calculations. */
  const revenueChart: BarChartPoint[] = revenue.byCategory.map((entry) => ({
    name: entry.category,
    value: entry.value,
    color: getCategoryColor(entry.category),
  }));

  // Categories arrive sorted from most to least ordered, so bar 0 is the winner.
  const popularityChart: BarChartPoint[] = popularity.byCategory.map((entry, index) => ({
    name: entry.category,
    value: entry.value,
    color: index === 0 ? "#C1440E" : "#EDC884",
  }));

  const deliveryChart: BarChartPoint[] = delivery.byCategory.map((entry) => ({
    name: entry.category,
    value: entry.averageDeliveryTime,
    color: getCategoryColor(entry.category),
  }));

  const satisfactionChart: BarChartPoint[] = [
    {
      name: satisfaction.fasterGroup.label,
      value: satisfaction.fasterGroup.averageRating,
      color: "#4F8A5B",
    },
    {
      name: satisfaction.slowerGroup.label,
      value: satisfaction.slowerGroup.averageRating,
      color: "#C1440E",
    },
  ];

  const lowestRevenue =
    revenue.byCategory.length > 0 ? revenue.byCategory[revenue.byCategory.length - 1] : null;
  const leastOrdered =
    popularity.byCategory.length > 0
      ? popularity.byCategory[popularity.byCategory.length - 1]
      : null;

  return (
    <AnalysisPageFrame
      title="Final Analysis"
      intro="Every calculation of this project on one page: what the dataset earns, which food
      categories customers order most, how long deliveries take and how delivery speed goes together
      with customer ratings. Each result is shown as a sentence, a plot and the numbers behind it,
      followed by the overall conclusions and the recommendations."
      status={status}
    >
      {error ? <ErrorState message={error} onRetry={() => void refresh()} /> : null}
      {!error && isLoading ? <LoadingState label="Summarising all calculations..." /> : null}

      {!error && !isLoading && !hasAnyData ? (
        <EmptyState
          title="There is nothing to summarise yet"
          message="The active dataset has no usable order values, delivery times or ratings, so the summary cannot be calculated."
          action={
            <Link href="/food-data" className="btn-primary">
              Add a food record
            </Link>
          }
        />
      ) : null}

      {!error && !isLoading && hasAnyData ? (
        <>
          {/* ------------------------------------------------ dataset ---------- */}
          <AnalysisSection title="Dataset at a glance">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <IllustrationTile>
                <NoodlesIllustration className="h-full w-full" />
              </IllustrationTile>
              <SummaryText>
                <p>
                  All numbers below are recalculated from the records currently in the active dataset
                  — <strong>{formatNumber(sampleCount)} sample rows</strong> plus{" "}
                  <strong>{formatNumber(userCount)} rows you added</strong>. Nothing on this page is
                  written by hand, so the summary always matches the four analysis pages.
                </p>
                <p>
                  A record is used for a calculation only when it has the value that calculation
                  needs: a missing rating is skipped instead of being counted as a zero, and a
                  missing delivery time never pulls an average down. The four calculations are the
                  same ones as in the Python notebook — the category sums, the order counts, the
                  category means and the two-group rating comparison.
                </p>
              </SummaryText>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <StatTile
                label="Orders analysed"
                value={formatNumber(summary.validOrders)}
                hint="Records with a value, a time and a rating"
                icon={ListChecks}
                emptyMessage="No complete records yet."
              />
              <StatTile
                label="Total revenue"
                value={
                  summary.totalRevenue === null ? null : formatCurrency(summary.totalRevenue)
                }
                hint="Orders with a usable order value"
                icon={Wallet}
                emptyMessage="Order values are missing, so revenue cannot be calculated."
              />
              <StatTile
                label="Average order value"
                value={
                  summary.totalRevenue === null || summary.validOrders === 0
                    ? null
                    : formatCurrency(summary.totalRevenue / summary.validOrders)
                }
                hint="Total revenue ÷ orders analysed"
                icon={IndianRupee}
                emptyMessage="No order values to average."
              />
              <StatTile
                label="Average delivery time"
                value={
                  summary.averageDeliveryTime === null
                    ? null
                    : formatMinutes(summary.averageDeliveryTime)
                }
                hint="Across the orders analysed"
                icon={Gauge}
                emptyMessage="Delivery times are missing."
              />
              <StatTile
                label="Average customer rating"
                value={summary.averageRating === null ? null : formatRating(summary.averageRating)}
                hint="Out of 5"
                icon={Star}
                emptyMessage="Ratings are missing."
              />
              <div className="panel-tight flex items-center justify-around gap-2" aria-hidden="true">
                <FriesIllustration className="h-14 w-14" />
                <DrinkIllustration className="h-14 w-14" />
                <SaladIllustration className="h-14 w-14" />
              </div>
            </div>
          </AnalysisSection>

          {/* ------------------------------------------------ 1. revenue -------- */}
          {revenue.hasData ? (
            <AnalysisSection title="1. Revenue result">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                <IllustrationTile>
                  <PizzaIllustration className="h-full w-full" />
                </IllustrationTile>
                <SummaryText>
                  <p>
                    The orders that carry a real order value add up to{" "}
                    <strong>{formatCurrency(revenue.totalRevenue)}</strong> of revenue across{" "}
                    {formatNumber(revenue.eligibleOrders)} orders. An average order is worth{" "}
                    <strong>{formatCurrency(revenue.averageOrderValue)}</strong>.
                  </p>
                  {revenue.topCategory && lowestRevenue ? (
                    <p>
                      <strong>{revenue.topCategory.category}</strong> is the highest-earning category
                      with <strong>{formatCurrency(revenue.topCategory.value)}</strong>, which is{" "}
                      <strong>{formatPercent(revenue.topCategory.share)}</strong> of all revenue.{" "}
                      {lowestRevenue.category} earns the least at{" "}
                      {formatCurrency(lowestRevenue.value)} (
                      {formatPercent(lowestRevenue.share)}), so the range between the best and the
                      weakest category is{" "}
                      {formatCurrency(revenue.topCategory.value - lowestRevenue.value)}.
                    </p>
                  ) : null}
                </SummaryText>
              </div>

              <div className="mt-5">
                <CategoryBarChart
                  data={revenueChart}
                  valueLabel="Revenue"
                  formatValue={(value) => formatCurrency(value)}
                  formatLabel={(value) => `₹${formatNumber(value / 1000, 1)}k`}
                  valueAxisLabel="Revenue (INR)"
                  height={360}
                />
                <p className="mt-3 text-xs text-brown-soft">
                  Revenue per food category, sorted from the highest to the lowest. Of every eligible
                  order, the order value is counted as a real sale because the dataset has no
                  cancellation, refund or discount column.
                </p>
              </div>
            </AnalysisSection>
          ) : null}

          {/* ------------------------------------------------ 2. popularity ----- */}
          {popularity.hasData ? (
            <AnalysisSection title="2. Popular food category result">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                <IllustrationTile>
                  <BurgerIllustration className="h-full w-full" />
                </IllustrationTile>
                <SummaryText>
                  {popularity.topCategory ? (
                    <p>
                      Out of {formatNumber(popularity.eligibleOrders)} eligible orders,{" "}
                      <strong>{popularity.topCategory.category}</strong> is ordered most often:{" "}
                      <strong>{formatNumber(popularity.topCategory.value)} orders</strong>, a share of{" "}
                      <strong>{formatPercent(popularity.topCategory.share)}</strong> of all orders.
                    </p>
                  ) : null}
                  {leastOrdered ? (
                    <p>
                      {leastOrdered.category} is ordered least often with{" "}
                      {formatNumber(leastOrdered.value)} orders ({formatPercent(leastOrdered.share)}
                      ). The share of a category is its orders ÷ the total orders × 100, the same
                      result as <code className="rounded bg-cream px-1.5 py-0.5">value_counts()</code>{" "}
                      in Pandas.
                    </p>
                  ) : null}
                </SummaryText>
              </div>

              <div className="mt-5">
                <CategoryBarChart
                  data={popularityChart}
                  valueLabel="Orders"
                  formatValue={(value) => formatNumber(value)}
                  valueAxisLabel="Number of orders"
                  height={360}
                />
                <p className="mt-3 text-xs text-brown-soft">
                  Orders per food category. The most ordered category is drawn in the strong orange
                  colour, the other categories stay muted.
                </p>
              </div>
            </AnalysisSection>
          ) : null}

          {/* ------------------------------------------------ 3. delivery ------- */}
          {delivery.hasData ? (
            <AnalysisSection title="3. Delivery efficiency result">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                <IllustrationTile>
                  <DeliveryBagIllustration className="h-full w-full" />
                </IllustrationTile>
                <SummaryText>
                  <p>
                    An order takes <strong>{formatMinutes(delivery.overallAverageDeliveryTime)}</strong>{" "}
                    on average across {formatNumber(delivery.eligibleOrders)} orders.
                  </p>
                  {delivery.fastestCategory && delivery.slowestCategory ? (
                    <p>
                      <strong>{delivery.fastestCategory.category}</strong> is the fastest category at{" "}
                      {formatMinutes(delivery.fastestCategory.averageDeliveryTime)} (
                      {formatSignedMinutes(delivery.fastestCategory.differenceFromAverage)} against
                      the average) and <strong>{delivery.slowestCategory.category}</strong> is the
                      slowest at {formatMinutes(delivery.slowestCategory.averageDeliveryTime)} (
                      {formatSignedMinutes(delivery.slowestCategory.differenceFromAverage)}). The gap
                      between the two is{" "}
                      {formatMinutes(
                        delivery.slowestCategory.averageDeliveryTime -
                          delivery.fastestCategory.averageDeliveryTime,
                      )}
                      , and {formatNumber(delivery.slowerThanAverage.length)} of the{" "}
                      {formatNumber(delivery.byCategory.length)} categories are slower than the
                      dataset average.
                    </p>
                  ) : null}
                </SummaryText>
              </div>

              <div className="mt-5">
                <CategoryBarChart
                  data={deliveryChart}
                  valueLabel="Average delivery time"
                  formatValue={(value) => formatMinutes(value)}
                  formatLabel={(value) => `${value.toFixed(1)}m`}
                  valueAxisLabel="Minutes"
                  referenceValue={delivery.overallAverageDeliveryTime}
                  referenceLabel={`Average ${delivery.overallAverageDeliveryTime.toFixed(1)} min`}
                  height={360}
                />
                <p className="mt-3 text-xs text-brown-soft">
                  Average delivery time per category. The dashed line is the overall average: bars
                  above it are slower than the dataset, bars below it are faster.
                </p>
              </div>
            </AnalysisSection>
          ) : null}

          {/* ------------------------------------------------ 4. satisfaction --- */}
          {satisfaction.hasData ? (
            <AnalysisSection title="4. Customer satisfaction result">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                <IllustrationTile>
                  <DessertIllustration className="h-full w-full" />
                </IllustrationTile>
                <SummaryText>
                  <p>
                    {formatNumber(satisfaction.eligibleOrders)} orders have both a delivery time and a
                    rating. Orders that arrived faster than the average of{" "}
                    {formatMinutes(satisfaction.overallAverageDeliveryTime)} are rated{" "}
                    <strong>{formatRating(satisfaction.fasterGroup.averageRating)}</strong> on average
                    (from {formatNumber(satisfaction.fasterGroup.orderCount)} orders), while orders
                    that arrived at the average time or slower are rated{" "}
                    <strong>{formatRating(satisfaction.slowerGroup.averageRating)}</strong> (from{" "}
                    {formatNumber(satisfaction.slowerGroup.orderCount)} orders).
                  </p>
                  <p>
                    The difference is{" "}
                    <strong>
                      {satisfaction.difference >= 0 ? "+" : ""}
                      {satisfaction.difference.toFixed(2)}
                    </strong>{" "}
                    rating points in favour of{" "}
                    {satisfaction.difference >= 0 ? "the faster deliveries" : "the slower deliveries"}.
                  </p>
                </SummaryText>
              </div>

              <div className="mt-5">
                <CategoryBarChart
                  data={satisfactionChart}
                  valueLabel="Average rating"
                  formatValue={(value) => formatRating(value)}
                  valueAxisLabel="Average rating (out of 5)"
                  valueDomain={[0, 5]}
                  height={320}
                />
                <p className="mt-3 text-xs text-brown-soft">
                  The axis covers the full 0–5 rating scale, so the size of the difference is visible
                  and not exaggerated by a shortened axis.
                </p>
              </div>
            </AnalysisSection>
          ) : null}

          {/* ------------------------------------------------ conclusions ------- */}
          <AnalysisSection title="Overall conclusions">
            <div className="space-y-3 text-sm leading-relaxed text-brown">
              <p>
                <strong>1. How much revenue does the dataset generate?</strong>{" "}
                {revenue.hasData ? (
                  <>
                    {formatCurrency(revenue.totalRevenue)} across {formatNumber(revenue.eligibleOrders)}{" "}
                    eligible orders, an average of {formatCurrency(revenue.averageOrderValue)} per
                    order. The revenue is not spread evenly:{" "}
                    {revenue.topCategory
                      ? `${revenue.topCategory.category} alone brings in ${formatPercent(revenue.topCategory.share)} of it.`
                      : "no single category stands out."}
                  </>
                ) : (
                  "The active dataset has no usable order values, so revenue cannot be summarised."
                )}
              </p>

              <p>
                <strong>2. Which food categories are the most popular?</strong>{" "}
                {popularity.hasData && popularity.topCategory ? (
                  <>
                    {popularity.topCategory.category} is ordered most often with{" "}
                    {formatNumber(popularity.topCategory.value)} orders (
                    {formatPercent(popularity.topCategory.share)} of all orders).{" "}
                    {revenue.topCategory &&
                    revenue.topCategory.category === popularity.topCategory.category
                      ? "It is also the highest-earning category, so demand and revenue point at the same part of the menu — the one that deserves the closest attention in stock planning."
                      : "The highest-earning category is a different one, so demand and revenue point at two different parts of the menu."}
                  </>
                ) : (
                  "The active dataset has no eligible orders to count."
                )}
              </p>

              <p>
                <strong>3. How efficient are the deliveries?</strong>{" "}
                {delivery.hasData && delivery.fastestCategory && delivery.slowestCategory ? (
                  <>
                    The average order arrives in{" "}
                    {formatMinutes(delivery.overallAverageDeliveryTime)}.{" "}
                    {delivery.fastestCategory.category} is the fastest at{" "}
                    {formatMinutes(delivery.fastestCategory.averageDeliveryTime)} and{" "}
                    {delivery.slowestCategory.category} the slowest at{" "}
                    {formatMinutes(delivery.slowestCategory.averageDeliveryTime)} — a difference of{" "}
                    {formatMinutes(
                      delivery.slowestCategory.averageDeliveryTime -
                        delivery.fastestCategory.averageDeliveryTime,
                    )}
                    . The slower categories are the first places to look at, but the category itself is
                    not the proven cause: preparation time, distance and traffic can all explain the
                    same numbers.
                  </>
                ) : (
                  "The active dataset has no usable delivery times."
                )}
              </p>

              <p>
                <strong>4. Does delivery speed affect customer satisfaction?</strong>{" "}
                {satisfaction.hasData ? (
                  <>
                    Yes, in this dataset faster orders are rated higher:{" "}
                    {formatRating(satisfaction.fasterGroup.averageRating)} against{" "}
                    {formatRating(satisfaction.slowerGroup.averageRating)}, a difference of{" "}
                    {satisfaction.difference.toFixed(2)} rating points. This is an association, not
                    proof — it shows that speed and satisfaction move together, not that speed is the
                    only reason for a good rating.
                  </>
                ) : (
                  "There are not enough orders with both a delivery time and a rating to compare the two groups."
                )}
              </p>
            </div>

            <div className="mt-5">
              <InsightPanel title="What the numbers say overall">
                <p>
                  The dataset tells one consistent story: a small number of categories carries most of
                  the demand and most of the money, delivery times differ noticeably between those
                  categories, and the orders that arrive quickly are the ones customers rate highest.
                </p>
                <p>
                  Because every figure on this page is recalculated from the active dataset, adding a
                  record on the Food Data page changes this summary immediately — the conclusions
                  always describe the data you are actually looking at.
                </p>
              </InsightPanel>
            </div>
          </AnalysisSection>

          {/* ------------------------------------------------ recommendations --- */}
          <AnalysisSection title="Recommendations">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <IllustrationTile>
                <FoodLogoMark className="h-full w-full" />
              </IllustrationTile>
              <ol className="list-decimal space-y-3 pl-5 text-sm leading-relaxed text-brown">
                <li>
                  <strong>Protect the strongest category.</strong>{" "}
                  {revenue.hasData && revenue.topCategory
                    ? `${revenue.topCategory.category} brings in ${formatPercent(revenue.topCategory.share)} of the revenue, so keeping it available, well staffed and promoted protects the largest part of the business.`
                    : "Keep the highest-earning category available and well promoted, because it carries the largest part of the revenue."}
                </li>
                <li>
                  <strong>Investigate the slowest categories, do not blame them.</strong>{" "}
                  {delivery.hasData && delivery.slowestCategory
                    ? `${delivery.slowestCategory.category} averages ${formatMinutes(delivery.slowestCategory.averageDeliveryTime)}, ${formatSignedMinutes(delivery.slowestCategory.differenceFromAverage)} against the dataset average. Check preparation time, distance and the busiest hours before changing anything.`
                    : "Compare the average delivery time of each category and look at preparation time and distance before making changes."}
                </li>
                <li>
                  <strong>Treat delivery time as part of the customer experience.</strong>{" "}
                  {satisfaction.hasData
                    ? `Orders faster than ${formatMinutes(satisfaction.overallAverageDeliveryTime)} are rated ${satisfaction.difference.toFixed(2)} points higher on average, so shortening the slowest deliveries is a realistic way to improve ratings.`
                    : "Track delivery time and customer rating together, so improvements in speed can be measured against satisfaction."}
                </li>
              </ol>
            </div>
          </AnalysisSection>

          <CaveatNote>
            These results describe the active dataset only, and the demo dataset is sample data, not
            real delivery records. The satisfaction result is an association: faster deliveries and
            higher ratings appear together, which does not prove that speed causes the rating. The
            revenue figures count every eligible order value as a sale, because the dataset has no
            cancellation, refund or discount column to subtract.
          </CaveatNote>
        </>
      ) : null}
    </AnalysisPageFrame>
  );
}
