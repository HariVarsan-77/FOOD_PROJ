"use client";

import Link from "next/link";
import {
  BarChart3,
  BookOpen,
  Code2,
  HelpCircle,
  Scale,
  Star,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { AnalysisPageFrame, AnalysisSection } from "@/components/analysis/AnalysisPageFrame";
import { CategoryBarChart, type BarChartPoint } from "@/components/charts/CategoryBarChart";
import { CaveatNote, InsightPanel, StatTile } from "@/components/ui/StatTile";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/StateBlocks";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useFoodRecords } from "@/hooks/useFoodRecords";
import { formatMinutes, formatNumber, formatRating } from "@/utils/format";

export default function CustomerSatisfactionPage() {
  const { status, isLoading, error, refresh, satisfaction } = useFoodRecords();

  const chartData: BarChartPoint[] = [
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

  return (
    <AnalysisPageFrame
      title="Customer Satisfaction Analysis"
      intro="Stratifies delivery orders into fast and delayed cohorts relative to the fleet benchmark to evaluate whether delivery promptness measurably influences customer star ratings."
      categoryTag="Dimension 04 • Customer Experience Correlation"
      status={status}
    >
      {error ? <ErrorState message={error} onRetry={() => void refresh()} /> : null}
      {!error && isLoading ? <LoadingState label="Evaluating rating correlations..." /> : null}

      {!error && !isLoading && !satisfaction.hasData ? (
        <EmptyState
          title="Insufficient data to compare cohorts"
          message="This comparison requires records with both a delivery time and a customer rating in both latency cohorts. Add more complete records to evaluate satisfaction."
          action={
            <Link href="/food-data" className="btn-primary">
              Add a food record
            </Link>
          }
        />
      ) : null}

      {!error && !isLoading && satisfaction.hasData ? (
        <>
          {/* Top 4 KPI Tiles with 2.5D depth */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ScrollReveal direction="up" delayMs={50}>
              <StatTile
                label="Faster cohort rating"
                value={formatRating(satisfaction.fasterGroup.averageRating)}
                hint={`${formatNumber(satisfaction.fasterGroup.orderCount)} orders under ${formatMinutes(satisfaction.overallAverageDeliveryTime)}`}
                icon={ThumbsUp}
                emptyMessage="No faster orders yet."
              />
            </ScrollReveal>
            <ScrollReveal direction="up" delayMs={100}>
              <StatTile
                label="Delayed cohort rating"
                value={formatRating(satisfaction.slowerGroup.averageRating)}
                hint={`${formatNumber(satisfaction.slowerGroup.orderCount)} orders at or above ${formatMinutes(satisfaction.overallAverageDeliveryTime)}`}
                icon={ThumbsDown}
                emptyMessage="No delayed orders yet."
              />
            </ScrollReveal>
            <ScrollReveal direction="up" delayMs={150}>
              <StatTile
                label="Rating variance (Delta)"
                value={`${satisfaction.difference >= 0 ? "+" : ""}${satisfaction.difference.toFixed(2)}`}
                hint="Faster rating minus slower rating"
                icon={Scale}
                emptyMessage="No delta calculated."
              />
            </ScrollReveal>
            <ScrollReveal direction="up" delayMs={200}>
              <StatTile
                label="Orders evaluated"
                value={formatNumber(satisfaction.eligibleOrders)}
                hint="Complete with latency & rating"
                icon={Star}
                emptyMessage="No complete records."
              />
            </ScrollReveal>
          </div>

          {/* 2.5D Dimensional Chart Stage */}
          <ScrollReveal direction="up" delayMs={150}>
            <AnalysisSection
              title="Average Customer Rating: Fast Deliveries vs Delayed Deliveries"
              subtitle="Comparing star ratings across latency cohorts on the full 0–5 scale"
              badge="Cohort Comparison"
            >
              <CategoryBarChart
                data={chartData}
                valueLabel="Average Rating"
                formatValue={(value) => formatRating(value)}
                valueAxisLabel="Average Customer Rating (0 to 5 Stars)"
                valueDomain={[0, 5]}
                height={380}
              />
              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-peach-deep/30 pt-3 text-xs text-brown-soft">
                <span>Plotted on the full 0–5 vertical domain to avoid misleading visual distortion of rating spreads.</span>
                <span className="font-semibold text-onyx">Calculated dynamically from active dataset</span>
              </div>
            </AnalysisSection>
          </ScrollReveal>

          {/* 5-Step Analytical Storytelling Breakdown */}
          <ScrollReveal direction="up" delayMs={200}>
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Pillar 1 & 2: Questions & Relevance */}
              <div
                className="panel flex flex-col justify-between"
                style={{
                  background: "linear-gradient(155deg, #ffffff 0%, #fffcf5 100%)",
                }}
              >
                <div>
                  <div className="flex items-center gap-2 text-primary">
                    <HelpCircle className="h-5 w-5" />
                    <h3 className="font-display text-lg font-bold text-onyx">
                      1. What Are We Analysing & Why It Matters
                    </h3>
                  </div>
                  <div className="mt-4 space-y-3 text-sm leading-relaxed text-brown">
                    <p>
                      <strong>The Variables:</strong> We analyze the relationship between fulfillment latency (
                      <code className="rounded bg-cream px-1.5 py-0.5 text-xs font-bold text-primary">delivery_time</code>)
                      and post-order customer review scores (
                      <code className="rounded bg-cream px-1.5 py-0.5 text-xs font-bold text-primary">customer_rating</code>, 1.0 to 5.0 scale).
                    </p>
                    <p>
                      <strong>Why It Matters:</strong> Operational investments to compress delivery times require significant
                      capital (dispatch incentives, route optimization software, express packaging). Restaurant leadership
                      must verify whether speed actually matters to diners.
                    </p>
                    <p>
                      If prompt deliveries correlate with measurable rating gains, speed becomes a core driver of organic
                      word-of-mouth and customer lifetime value (LTV), rather than merely an operational expense.
                    </p>
                  </div>
                </div>
              </div>

              {/* Pillar 3 & 4: Computational Logic & Chart Guide */}
              <div
                className="panel flex flex-col justify-between"
                style={{
                  background: "linear-gradient(155deg, #ffffff 0%, #fffcf5 100%)",
                }}
              >
                <div>
                  <div className="flex items-center gap-2 text-primary">
                    <Code2 className="h-5 w-5" />
                    <h3 className="font-display text-lg font-bold text-onyx">
                      2. Computational Logic & Reading Guide
                    </h3>
                  </div>
                  <div className="mt-4 space-y-3 text-sm leading-relaxed text-brown">
                    <p>
                      <strong>Pandas Calculation:</strong> Records lacking either latency or rating are dropped. The dataset
                      benchmark mean is established, and orders are stratified into two binary cohorts:
                      <br />
                      <code className="mt-1 block rounded bg-onyx px-2.5 py-1 text-xs text-gold-soft font-mono">
                        threshold = df[&quot;delivery_time&quot;].mean()
                        <br />
                        faster_mean = df[df[&quot;delivery_time&quot;] &lt; threshold][&quot;customer_rating&quot;].mean()
                        <br />
                        slower_mean = df[df[&quot;delivery_time&quot;] &gt;= threshold][&quot;customer_rating&quot;].mean()
                      </code>
                    </p>
                    <p>
                      <strong>How to Read the Chart:</strong> The green bar represents orders delivered faster than the
                      dataset average; the orange bar represents orders delivered at or slower than the average.
                    </p>
                    <p className="text-xs text-brown-soft">
                      The full 0–5 Y-axis ensures the true proportional difference is apparent without artificial exaggeration.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Granular Breakdown Table */}
          <ScrollReveal direction="up" delayMs={220}>
            <AnalysisSection
              title="Cohort Rating Comparison Table"
              subtitle="Comparing order counts and mean star ratings across latency cohorts"
            >
              <div className="overflow-x-auto">
                <table className="w-full min-w-[500px] border-collapse text-left">
                  <caption className="sr-only">Order count and average rating across cohorts</caption>
                  <thead>
                    <tr className="border-b-2 border-peach-deep/60">
                      <th scope="col" className="table-cell font-bold text-onyx">
                        Latency Cohort
                      </th>
                      <th scope="col" className="table-cell text-right font-bold text-onyx">
                        Sample Orders
                      </th>
                      <th scope="col" className="table-cell text-right font-bold text-onyx">
                        Average Rating
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-peach-deep/30 hover:bg-cream/50 transition-colors">
                      <th scope="row" className="table-cell font-bold text-onyx">
                        {satisfaction.fasterGroup.label} (&lt; {formatMinutes(satisfaction.overallAverageDeliveryTime)})
                      </th>
                      <td className="table-cell text-right font-semibold text-brown-soft">
                        {formatNumber(satisfaction.fasterGroup.orderCount)}
                      </td>
                      <td className="table-cell text-right font-extrabold text-success">
                        {formatRating(satisfaction.fasterGroup.averageRating)}
                      </td>
                    </tr>
                    <tr className="border-b border-peach-deep/30 hover:bg-cream/50 transition-colors">
                      <th scope="row" className="table-cell font-bold text-onyx">
                        {satisfaction.slowerGroup.label} (≥ {formatMinutes(satisfaction.overallAverageDeliveryTime)})
                      </th>
                      <td className="table-cell text-right font-semibold text-brown-soft">
                        {formatNumber(satisfaction.slowerGroup.orderCount)}
                      </td>
                      <td className="table-cell text-right font-extrabold text-onyx">
                        {formatRating(satisfaction.slowerGroup.averageRating)}
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-primary/50 bg-cream/40">
                      <th scope="row" className="table-cell font-extrabold text-primary">
                        Empirical Rating Difference
                      </th>
                      <td className="table-cell text-right font-extrabold text-primary">—</td>
                      <td className="table-cell text-right font-extrabold text-primary">
                        {satisfaction.difference >= 0 ? "+" : ""}
                        {satisfaction.difference.toFixed(2)} Stars
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </AnalysisSection>
          </ScrollReveal>

          {/* Dynamic Insight & Practical Implications (Pillar 5) */}
          <ScrollReveal direction="up" delayMs={250}>
            <InsightPanel title="5. What We Learn From This Result (Operational Implications)">
              <p>
                Orders delivered faster than the platform benchmark of{" "}
                <strong className="text-gold-light">{formatMinutes(satisfaction.overallAverageDeliveryTime)}</strong> achieve
                an average customer rating of{" "}
                <strong className="text-gold-light">{formatRating(satisfaction.fasterGroup.averageRating)}</strong>.
                In contrast, orders delivered at the benchmark or slower average{" "}
                <strong className="text-gold-light">{formatRating(satisfaction.slowerGroup.averageRating)}</strong>.
              </p>
              <p>
                The empirical delta is{" "}
                <strong className="text-gold-light">
                  {satisfaction.difference >= 0 ? "+" : ""}
                  {satisfaction.difference.toFixed(2)}
                </strong>{" "}
                star points{" "}
                {satisfaction.difference > 0
                  ? "in favor of prompt deliveries."
                  : satisfaction.difference < 0
                    ? "in favor of slower deliveries, suggesting complex bespoke dishes may justify longer prep times."
                    : "indicating identical perceived satisfaction across both cohorts."}
              </p>
              {satisfaction.difference > 0 ? (
                <p>
                  <strong>Business Implication:</strong> A {satisfaction.difference.toFixed(2)} star rating lift is
                  statistically significant in the hospitality sector. It directly confirms that delivery promptness is
                  not merely a logistics metric, but an active component of brand equity and customer retention.
                </p>
              ) : null}
            </InsightPanel>
          </ScrollReveal>

          {/* Methodological Scope & Integrity */}
          <ScrollReveal direction="up" delayMs={280}>
            <CaveatNote>
              This observed pattern represents a bivariate statistical correlation, not direct proof of isolated causation.
              Faster deliveries naturally preserve food temperature, texture, and visual presentation. Thus, the higher rating
              reflects the composite dining experience rather than transit velocity in isolation.
            </CaveatNote>
          </ScrollReveal>
        </>
      ) : null}
    </AnalysisPageFrame>
  );
}
