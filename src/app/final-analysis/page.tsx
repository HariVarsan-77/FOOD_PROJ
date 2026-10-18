"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import {
  BarChart3,
  CheckCircle2,
  Gauge,
  IndianRupee,
  Layers,
  Lightbulb,
  ListChecks,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Wallet,
} from "lucide-react";
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
import { ScrollReveal } from "@/components/ui/ScrollReveal";
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

/** 2.5D elevated rounded tile holding a food illustration. */
function IllustrationTile({ children }: { children: ReactNode }) {
  return (
    <span
      className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl p-3 transition-transform duration-300 hover:scale-105"
      style={{
        background: "linear-gradient(145deg, #ffffff 0%, #fffbf2 50%, #fef3dc 100%)",
        border: "1.5px solid rgba(212, 160, 23, 0.40)",
        boxShadow:
          "0 4px 12px -2px rgba(13, 10, 6, 0.08), inset 0 1px 0 rgba(255, 255, 255, 1)",
      }}
    >
      {children}
    </span>
  );
}

/** Professional descriptive text block adjacent to illustration. */
function SummaryText({ children }: { children: ReactNode }) {
  return <div className="space-y-2.5 text-sm leading-relaxed text-brown sm:text-base">{children}</div>;
}

/**
 * 2.5D Final Analysis & Synthesis Page.
 * Synthesizes all four quantitative calculations (Revenue, Popularity, Efficiency, Satisfaction)
 * into a unified executive report with holistic conclusions and dynamic business recommendations.
 */
export function FinalAnalysisPage() {
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

  /* Dimensional 2.5D bar chart data sets */
  const revenueChart: BarChartPoint[] = revenue.byCategory.map((entry) => ({
    name: entry.category,
    value: entry.value,
    color: getCategoryColor(entry.category),
  }));

  const popularityChart: BarChartPoint[] = popularity.byCategory.map((entry, index) => ({
    name: entry.category,
    value: entry.value,
    color: index === 0 ? "#e85d04" : "#d4a017",
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
      color: "#2d7a4b",
    },
    {
      name: satisfaction.slowerGroup.label,
      value: satisfaction.slowerGroup.averageRating,
      color: "#e85d04",
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
      intro="A comprehensive synthesis uniting all four analytical dimensions: cumulative revenue distribution, consumer volume popularity, operational delivery latencies, and empirical customer satisfaction correlations."
      categoryTag="Executive Synthesis • Complete Findings"
      status={status}
    >
      {error ? <ErrorState message={error} onRetry={() => void refresh()} /> : null}
      {!error && isLoading ? <LoadingState label="Synthesizing cross-dimensional analytics..." /> : null}

      {!error && !isLoading && !hasAnyData ? (
        <EmptyState
          title="There is nothing to summarise yet"
          message="The active dataset has no usable order values, delivery times, or ratings. Add records to compile the final analysis."
          action={
            <Link href="/food-data" className="btn-primary">
              Add a food record
            </Link>
          }
        />
      ) : null}

      {!error && !isLoading && hasAnyData ? (
        <>
          {/* Section 0: Dataset At A Glance */}
          <ScrollReveal direction="up">
            <AnalysisSection
              title="Active Dataset Architecture"
              subtitle="Baseline sample transactions combined with real-time synchronized records"
              badge="Source Telemetry"
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                <IllustrationTile>
                  <NoodlesIllustration className="h-full w-full" />
                </IllustrationTile>
                <SummaryText>
                  <p>
                    All metrics and visualizations compiled across this report are computed dynamically
                    from the current active dataset:{" "}
                    <strong className="text-onyx">{formatNumber(sampleCount)} baseline sample orders</strong> plus{" "}
                    <strong className="text-onyx">{formatNumber(userCount)} custom user records</strong>.
                    Every summary metric is derived in real-time to guarantee perfect mathematical alignment with the
                    individual deep-dive modules.
                  </p>
                  <p className="text-xs text-brown-soft sm:text-sm">
                    Rigorous data integrity rules are enforced across all operations: records missing a price are omitted
                    from revenue totals rather than skewing averages toward zero, and missing delivery times are dropped
                    prior to latency averaging.
                  </p>
                </SummaryText>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <StatTile
                  label="Orders evaluated"
                  value={formatNumber(summary.validOrders)}
                  hint="Complete with value, time, and rating"
                  icon={ListChecks}
                  emptyMessage="No complete records."
                />
                <StatTile
                  label="Total revenue"
                  value={
                    summary.totalRevenue === null ? null : formatCurrency(summary.totalRevenue)
                  }
                  hint="Cumulative monetary turnover"
                  icon={Wallet}
                  emptyMessage="Order values missing."
                />
                <StatTile
                  label="Platform AOV"
                  value={
                    summary.totalRevenue === null || summary.validOrders === 0
                      ? null
                      : formatCurrency(summary.totalRevenue / summary.validOrders)
                  }
                  hint="Average order invoice"
                  icon={IndianRupee}
                  emptyMessage="No values to average."
                />
                <StatTile
                  label="Average delivery latency"
                  value={
                    summary.averageDeliveryTime === null
                      ? null
                      : formatMinutes(summary.averageDeliveryTime)
                  }
                  hint="Across all valid orders"
                  icon={Gauge}
                  emptyMessage="Delivery times missing."
                />
                <StatTile
                  label="Mean customer rating"
                  value={summary.averageRating === null ? null : formatRating(summary.averageRating)}
                  hint="Out of 5.00 stars"
                  icon={Star}
                  emptyMessage="Ratings missing."
                />
                <div
                  className="flex items-center justify-around gap-2 rounded-2xl p-4"
                  style={{
                    background: "linear-gradient(145deg, #fffcf5 0%, #fff7eb 100%)",
                    border: "1px solid rgba(212, 160, 23, 0.30)",
                    boxShadow: "0 2px 6px rgba(13,10,6,0.04)",
                  }}
                  aria-hidden="true"
                >
                  <FriesIllustration className="h-12 w-12" />
                  <DrinkIllustration className="h-12 w-12" />
                  <SaladIllustration className="h-12 w-12" />
                </div>
              </div>
            </AnalysisSection>
          </ScrollReveal>

          {/* Section 1: Revenue Findings */}
          {revenue.hasData ? (
            <ScrollReveal direction="up" delayMs={100}>
              <AnalysisSection
                title="1. Revenue Analysis Synthesis"
                subtitle="Cumulative revenue generation and category sales concentration"
                badge="Dimension 01"
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                  <IllustrationTile>
                    <PizzaIllustration className="h-full w-full" />
                  </IllustrationTile>
                  <SummaryText>
                    <p>
                      The order volume yields{" "}
                      <strong>{formatCurrency(revenue.totalRevenue)}</strong> across{" "}
                      {formatNumber(revenue.eligibleOrders)} eligible transactions, resulting in an average ticket of{" "}
                      <strong>{formatCurrency(revenue.averageOrderValue)}</strong>.
                    </p>
                    {revenue.topCategory && lowestRevenue ? (
                      <p>
                        <strong>{revenue.topCategory.category}</strong> dominates revenue generation with{" "}
                        <strong>{formatCurrency(revenue.topCategory.value)}</strong>, capturing{" "}
                        <strong>{formatPercent(revenue.topCategory.share)}</strong> of gross platform income.
                        The lowest grossing category is {lowestRevenue.category} at{" "}
                        {formatCurrency(lowestRevenue.value)} ({formatPercent(lowestRevenue.share)}), establishing a
                        cross-menu revenue variance of {formatCurrency(revenue.topCategory.value - lowestRevenue.value)}.
                      </p>
                    ) : null}
                  </SummaryText>
                </div>

                <div className="mt-6">
                  <CategoryBarChart
                    data={revenueChart}
                    valueLabel="Revenue"
                    formatValue={(value) => formatCurrency(value)}
                    formatLabel={(value) => `₹${formatNumber(value / 1000, 1)}k`}
                    valueAxisLabel="Revenue (INR)"
                    height={380}
                  />
                </div>
              </AnalysisSection>
            </ScrollReveal>
          ) : null}

          {/* Section 2: Popularity Findings */}
          {popularity.hasData ? (
            <ScrollReveal direction="up" delayMs={120}>
              <AnalysisSection
                title="2. Popular Category Volume Synthesis"
                subtitle="Consumer order frequency and market share by culinary category"
                badge="Dimension 02"
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                  <IllustrationTile>
                    <BurgerIllustration className="h-full w-full" />
                  </IllustrationTile>
                  <SummaryText>
                    {popularity.topCategory ? (
                      <p>
                        Out of {formatNumber(popularity.eligibleOrders)} analyzed orders,{" "}
                        <strong>{popularity.topCategory.category}</strong> is ordered most frequently:{" "}
                        <strong>{formatNumber(popularity.topCategory.value)} orders</strong>, commanding a{" "}
                        <strong>{formatPercent(popularity.topCategory.share)}</strong> share of all culinary orders.
                      </p>
                    ) : null}
                    {leastOrdered ? (
                      <p>
                        In comparison, {leastOrdered.category} is ordered least often with{" "}
                        {formatNumber(leastOrdered.value)} orders ({formatPercent(leastOrdered.share)}).
                        Analyzing volume alongside revenue highlights whether top-selling items rely on high margins or sheer volume velocity.
                      </p>
                    ) : null}
                  </SummaryText>
                </div>

                <div className="mt-6">
                  <CategoryBarChart
                    data={popularityChart}
                    valueLabel="Orders"
                    formatValue={(value) => formatNumber(value)}
                    valueAxisLabel="Completed Orders"
                    height={380}
                  />
                </div>
              </AnalysisSection>
            </ScrollReveal>
          ) : null}

          {/* Section 3: Delivery Efficiency Findings */}
          {delivery.hasData ? (
            <ScrollReveal direction="up" delayMs={140}>
              <AnalysisSection
                title="3. Delivery Efficiency & Latency Synthesis"
                subtitle="Benchmarking fulfillment times against the platform average"
                badge="Dimension 03"
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                  <IllustrationTile>
                    <DeliveryBagIllustration className="h-full w-full" />
                  </IllustrationTile>
                  <SummaryText>
                    <p>
                      Platform fulfillment averages{" "}
                      <strong>{formatMinutes(delivery.overallAverageDeliveryTime)}</strong> across{" "}
                      {formatNumber(delivery.eligibleOrders)} orders.
                    </p>
                    {delivery.fastestCategory && delivery.slowestCategory ? (
                      <p>
                        <strong>{delivery.fastestCategory.category}</strong> achieves the quickest doorstep transit at{" "}
                        {formatMinutes(delivery.fastestCategory.averageDeliveryTime)} (
                        {formatSignedMinutes(delivery.fastestCategory.differenceFromAverage)} vs benchmark). Conversely,{" "}
                        <strong>{delivery.slowestCategory.category}</strong> registers the longest latency at{" "}
                        {formatMinutes(delivery.slowestCategory.averageDeliveryTime)} (
                        {formatSignedMinutes(delivery.slowestCategory.differenceFromAverage)} vs benchmark).
                        The latency delta between extremes spans{" "}
                        {formatMinutes(
                          delivery.slowestCategory.averageDeliveryTime -
                            delivery.fastestCategory.averageDeliveryTime,
                        )}
                        , with {formatNumber(delivery.slowerThanAverage.length)} categories exceeding the platform mean.
                      </p>
                    ) : null}
                  </SummaryText>
                </div>

                <div className="mt-6">
                  <CategoryBarChart
                    data={deliveryChart}
                    valueLabel="Average Delivery Time"
                    formatValue={(value) => formatMinutes(value)}
                    formatLabel={(value) => `${value.toFixed(1)}m`}
                    valueAxisLabel="Elapsed Minutes"
                    referenceValue={delivery.overallAverageDeliveryTime}
                    referenceLabel={`Benchmark: ${delivery.overallAverageDeliveryTime.toFixed(1)} min`}
                    height={380}
                  />
                </div>
              </AnalysisSection>
            </ScrollReveal>
          ) : null}

          {/* Section 4: Customer Satisfaction Findings */}
          {satisfaction.hasData ? (
            <ScrollReveal direction="up" delayMs={160}>
              <AnalysisSection
                title="4. Customer Satisfaction Correlation Synthesis"
                subtitle="Evaluating the empirical impact of delivery speed on review scores"
                badge="Dimension 04"
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                  <IllustrationTile>
                    <DessertIllustration className="h-full w-full" />
                  </IllustrationTile>
                  <SummaryText>
                    <p>
                      Cross-referencing {formatNumber(satisfaction.eligibleOrders)} orders that record both latency and rating scores
                      reveals a clear pattern: orders delivered under the benchmark latency of{" "}
                      {formatMinutes(satisfaction.overallAverageDeliveryTime)} receive an average rating of{" "}
                      <strong>{formatRating(satisfaction.fasterGroup.averageRating)}</strong> (from{" "}
                      {formatNumber(satisfaction.fasterGroup.orderCount)} orders).
                    </p>
                    <p>
                      Orders delivered at or above benchmark latency receive an average of{" "}
                      <strong>{formatRating(satisfaction.slowerGroup.averageRating)}</strong> (from{" "}
                      {formatNumber(satisfaction.slowerGroup.orderCount)} orders). The empirical delta is{" "}
                      <strong>
                        {satisfaction.difference >= 0 ? "+" : ""}
                        {satisfaction.difference.toFixed(2)}
                      </strong>{" "}
                      stars in favor of rapid fulfillment.
                    </p>
                  </SummaryText>
                </div>

                <div className="mt-6">
                  <CategoryBarChart
                    data={satisfactionChart}
                    valueLabel="Average Rating"
                    formatValue={(value) => formatRating(value)}
                    valueAxisLabel="Customer Rating (0 to 5 Stars)"
                    valueDomain={[0, 5]}
                    height={340}
                  />
                </div>
              </AnalysisSection>
            </ScrollReveal>
          ) : null}

          {/* Section 5: Holistic Conclusions */}
          <ScrollReveal direction="up" delayMs={180}>
            <AnalysisSection
              title="Holistic Analytical Conclusions"
              subtitle="Synthesized answers to core business intelligence inquiries"
              badge="Executive Summary"
            >
              <div className="space-y-4 text-sm leading-relaxed text-brown sm:text-base">
                <div className="rounded-2xl p-4 bg-white/70 border border-peach-deep/30">
                  <p>
                    <strong>1. Financial Concentration:</strong>{" "}
                    {revenue.hasData ? (
                      <>
                        Gross turnover stands at {formatCurrency(revenue.totalRevenue)} across{" "}
                        {formatNumber(revenue.eligibleOrders)} valid orders, with an average ticket of{" "}
                        {formatCurrency(revenue.averageOrderValue)}. The dataset demonstrates clear revenue concentration:{" "}
                        {revenue.topCategory
                          ? `${revenue.topCategory.category} generates ${formatPercent(revenue.topCategory.share)} of total turnover alone.`
                          : "sales are distributed across categories without single-item dependency."}
                      </>
                    ) : (
                      "No valid financial order data recorded."
                    )}
                  </p>
                </div>

                <div className="rounded-2xl p-4 bg-white/70 border border-peach-deep/30">
                  <p>
                    <strong>2. Demand Alignment:</strong>{" "}
                    {popularity.hasData && popularity.topCategory ? (
                      <>
                        Consumer preference clusters around {popularity.topCategory.category} with{" "}
                        {formatNumber(popularity.topCategory.value)} orders (
                        {formatPercent(popularity.topCategory.share)} of all orders).{" "}
                        {revenue.topCategory &&
                        revenue.topCategory.category === popularity.topCategory.category
                          ? "Because the top volume driver is also the highest revenue earner, demand and income align directly on the same menu family."
                          : "Because top volume and top revenue differ, the menu relies on a high-volume anchor distinct from its premium ticket items."}
                      </>
                    ) : (
                      "No eligible order frequency recorded."
                    )}
                  </p>
                </div>

                <div className="rounded-2xl p-4 bg-white/70 border border-peach-deep/30">
                  <p>
                    <strong>3. Fulfillment Velocity:</strong>{" "}
                    {delivery.hasData && delivery.fastestCategory && delivery.slowestCategory ? (
                      <>
                        Mean fulfillment latency is {formatMinutes(delivery.overallAverageDeliveryTime)}.{" "}
                        {delivery.fastestCategory.category} achieves peak speed at{" "}
                        {formatMinutes(delivery.fastestCategory.averageDeliveryTime)}, while{" "}
                        {delivery.slowestCategory.category} lags at{" "}
                        {formatMinutes(delivery.slowestCategory.averageDeliveryTime)}—an operational delta of{" "}
                        {formatMinutes(
                          delivery.slowestCategory.averageDeliveryTime -
                            delivery.fastestCategory.averageDeliveryTime,
                        )}
                        . These slower categories represent immediate opportunities for prep optimization.
                      </>
                    ) : (
                      "No delivery latency data available."
                    )}
                  </p>
                </div>

                <div className="rounded-2xl p-4 bg-white/70 border border-peach-deep/30">
                  <p>
                    <strong>4. Experience Impact:</strong>{" "}
                    {satisfaction.hasData ? (
                      <>
                        Prompt deliveries achieve a {satisfaction.difference.toFixed(2)} star rating premium over delayed
                        orders ({formatRating(satisfaction.fasterGroup.averageRating)} vs{" "}
                        {formatRating(satisfaction.slowerGroup.averageRating)}). This confirms that delivery promptness
                        is deeply linked to perceived quality and guest satisfaction.
                      </>
                    ) : (
                      "Insufficient paired data to correlate latency with review scores."
                    )}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <InsightPanel title="Unified Analytical Narrative">
                  <p>
                    Across all four dimensions, the data tells an interconnected story: operational success hinges
                    on protecting high-volume, high-turnover menu anchors, actively resolving preparation bottlenecks
                    in slower categories, and recognizing that fulfillment speed is fundamentally a customer experience
                    multiplier.
                  </p>
                </InsightPanel>
              </div>
            </AnalysisSection>
          </ScrollReveal>

          {/* Section 6: Actionable Recommendations */}
          <ScrollReveal direction="up" delayMs={200}>
            <AnalysisSection
              title="Strategic Operations Recommendations"
              subtitle="Evidence-based managerial guidance derived directly from the calculations"
              badge="Action Plan"
            >
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                <IllustrationTile>
                  <FoodLogoMark className="h-full w-full" />
                </IllustrationTile>
                <div className="space-y-4 text-sm leading-relaxed text-brown sm:text-base flex-1">
                  <div className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-ivory text-xs font-bold mt-0.5">
                      1
                    </span>
                    <div>
                      <strong className="text-onyx">Fortify Supply Chain for the Leading Category:</strong>{" "}
                      {revenue.hasData && revenue.topCategory
                        ? `Ensure absolute ingredient availability, prep staffing, and packaging inventory for ${revenue.topCategory.category}, which secures ${formatPercent(revenue.topCategory.share)} of all revenue.`
                        : "Prioritize operational readiness and staff allocation around the primary revenue engine."}
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-ivory text-xs font-bold mt-0.5">
                      2
                    </span>
                    <div>
                      <strong className="text-onyx">Optimize Kitchen Prep for Slower Menu Items:</strong>{" "}
                      {delivery.hasData && delivery.slowestCategory
                        ? `${delivery.slowestCategory.category} averages ${formatMinutes(delivery.slowestCategory.averageDeliveryTime)}, running ${formatSignedMinutes(delivery.slowestCategory.differenceFromAverage)} behind benchmark. Audit prep staging, batch cooking, and station handoffs.`
                        : "Investigate preparation workflows for categories that exceed standard delivery latency benchmarks."}
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-ivory text-xs font-bold mt-0.5">
                      3
                    </span>
                    <div>
                      <strong className="text-onyx">Leverage Fulfillment Speed as a Retention Lever:</strong>{" "}
                      {satisfaction.hasData
                        ? `Compressing transit times yields a direct ${satisfaction.difference.toFixed(2)} rating boost. Treat dispatch velocity as a key driver of 5-star customer reviews and repeat order frequency.`
                        : "Monitor transit times alongside review scores to preserve high customer satisfaction ratings."}
                    </div>
                  </div>
                </div>
              </div>
            </AnalysisSection>
          </ScrollReveal>

          {/* Methodological Scope */}
          <ScrollReveal direction="up" delayMs={220}>
            <CaveatNote>
              Analytical integrity statement: All conclusions and recommendations above are derived exclusively from the
              active dataset calculations. The satisfaction findings describe an empirical association rather than isolated
              causation. Revenue totals represent gross values without adjustment for discounts or refunds.
            </CaveatNote>
          </ScrollReveal>
        </>
      ) : null}
    </AnalysisPageFrame>
  );
}

export default FinalAnalysisPage;
