"use client";

import Link from "next/link";
import {
  BarChart3,
  BookOpen,
  Code2,
  Gauge,
  HelpCircle,
  Rabbit,
  Snail,
  Timer,
} from "lucide-react";
import { AnalysisPageFrame, AnalysisSection } from "@/components/analysis/AnalysisPageFrame";
import { CategoryBarChart, type BarChartPoint } from "@/components/charts/CategoryBarChart";
import { CaveatNote, InsightPanel, StatTile } from "@/components/ui/StatTile";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/StateBlocks";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getCategoryColor } from "@/data/categories";
import { useFoodRecords } from "@/hooks/useFoodRecords";
import { formatMinutes, formatNumber, formatSignedMinutes } from "@/utils/format";

export default function DeliveryEfficiencyPage() {
  const { status, isLoading, error, refresh, delivery } = useFoodRecords();

  const chartData: BarChartPoint[] = delivery.byCategory.map((entry) => ({
    name: entry.category,
    value: entry.averageDeliveryTime,
    color: getCategoryColor(entry.category),
  }));

  return (
    <AnalysisPageFrame
      title="Delivery Efficiency Analysis"
      intro="Benchmarks transit and dispatch latency across categories against the platform-wide mean to isolate kitchen bottlenecks, evaluate fulfillment speed, and highlight categories that deviate significantly from standard delivery times."
      categoryTag="Dimension 03 • Operational Velocity"
      status={status}
    >
      {error ? <ErrorState message={error} onRetry={() => void refresh()} /> : null}
      {!error && isLoading ? <LoadingState label="Benchmarking delivery latencies..." /> : null}

      {!error && !isLoading && !delivery.hasData ? (
        <EmptyState
          title="No delivery times recorded"
          message="The active dataset contains no valid delivery times. Add an order record to calculate delivery efficiency."
          action={
            <Link href="/food-data" className="btn-primary">
              Add a food record
            </Link>
          }
        />
      ) : null}

      {!error && !isLoading && delivery.hasData ? (
        <>
          {/* Top 4 KPI Tiles with 2.5D depth */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ScrollReveal direction="up" delayMs={50}>
              <StatTile
                label="Dataset average latency"
                value={formatMinutes(delivery.overallAverageDeliveryTime)}
                hint={`Across ${formatNumber(delivery.eligibleOrders)} orders`}
                icon={Gauge}
                emptyMessage="No delivery times."
              />
            </ScrollReveal>
            <ScrollReveal direction="up" delayMs={100}>
              <StatTile
                label="Fastest category"
                value={delivery.fastestCategory ? delivery.fastestCategory.category : null}
                hint={
                  delivery.fastestCategory
                    ? `${formatMinutes(delivery.fastestCategory.averageDeliveryTime)} (${formatSignedMinutes(delivery.fastestCategory.differenceFromAverage)} vs avg)`
                    : undefined
                }
                icon={Rabbit}
                emptyMessage="No category has delivery times."
              />
            </ScrollReveal>
            <ScrollReveal direction="up" delayMs={150}>
              <StatTile
                label="Slowest category"
                value={delivery.slowestCategory ? delivery.slowestCategory.category : null}
                hint={
                  delivery.slowestCategory
                    ? `${formatMinutes(delivery.slowestCategory.averageDeliveryTime)} (${formatSignedMinutes(delivery.slowestCategory.differenceFromAverage)} vs avg)`
                    : undefined
                }
                icon={Snail}
                emptyMessage="No category has delivery times."
              />
            </ScrollReveal>
            <ScrollReveal direction="up" delayMs={200}>
              <StatTile
                label="Slower than average"
                value={formatNumber(delivery.slowerThanAverage.length)}
                hint={`Out of ${delivery.byCategory.length} total categories`}
                icon={Timer}
                emptyMessage="No categories to compare."
              />
            </ScrollReveal>
          </div>

          {/* 2.5D Dimensional Chart Stage */}
          <ScrollReveal direction="up" delayMs={150}>
            <AnalysisSection
              title="Average Delivery Time per Category"
              subtitle="Comparing category mean latencies against the dataset benchmark"
              badge="Mean Minutes"
            >
              <CategoryBarChart
                data={chartData}
                valueLabel="Average Delivery Time"
                formatValue={(value) => formatMinutes(value)}
                formatLabel={(value) => `${value.toFixed(1)}m`}
                valueAxisLabel="Minutes from Order to Doorstep"
                referenceValue={delivery.overallAverageDeliveryTime}
                referenceLabel={`Benchmark Average: ${delivery.overallAverageDeliveryTime.toFixed(1)} min`}
                height={420}
              />
              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-peach-deep/30 pt-3 text-xs text-brown-soft">
                <span>The dashed line marks the platform-wide average. Bars extending above the line exceed standard delivery times.</span>
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
                      <strong>The Variables:</strong> We examine delivery latency using{" "}
                      <code className="rounded bg-cream px-1.5 py-0.5 text-xs font-bold text-primary">delivery_time</code>{" "}
                      (measured in elapsed minutes from order confirmation to final drop-off) grouped across{" "}
                      <code className="rounded bg-cream px-1.5 py-0.5 text-xs font-bold text-primary">food_category</code>.
                    </p>
                    <p>
                      <strong>Why It Matters:</strong> Delivery latency is the single greatest operational friction point
                      in online food commerce. Extended wait times lead to cold food, customer frustration, rider churn,
                      and elevated support refund requests.
                    </p>
                    <p>
                      By segmenting times by food category, managers can immediately distinguish whether late deliveries
                      are systemic fleet issues or specific kitchen preparation bottlenecks unique to certain complex dishes.
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
                      <strong>Pandas Calculation:</strong> Missing and non-positive times are pruned. Category means and the
                      global benchmark mean are calculated:
                      <br />
                      <code className="mt-1 block rounded bg-onyx px-2.5 py-1 text-xs text-gold-soft font-mono">
                        category_means = df.groupby(&quot;food_category&quot;)[&quot;delivery_time&quot;].mean()
                        <br />
                        overall_mean = df[&quot;delivery_time&quot;].mean()
                      </code>
                      Difference from benchmark: <code className="rounded bg-cream px-1.5 py-0.5 text-xs">diff = category_mean - overall_mean</code>.
                    </p>
                    <p>
                      <strong>How to Read the Chart:</strong> The horizontal dashed line represents the global benchmark average.
                      Bars reaching above the line represent slower-than-average categories (positive variance), while bars below
                      represent efficient, faster-than-average fulfillment (negative variance).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Granular Breakdown Table */}
          <ScrollReveal direction="up" delayMs={220}>
            <AnalysisSection
              title="Category Latency Breakdown"
              subtitle="Mean transit minutes and deviation from dataset benchmark"
            >
              <div className="overflow-x-auto">
                <table className="w-full min-w-[550px] border-collapse text-left">
                  <caption className="sr-only">Average delivery time and variance per category</caption>
                  <thead>
                    <tr className="border-b-2 border-peach-deep/60">
                      <th scope="col" className="table-cell font-bold text-onyx">
                        Food Category
                      </th>
                      <th scope="col" className="table-cell text-right font-bold text-onyx">
                        Sample Orders
                      </th>
                      <th scope="col" className="table-cell text-right font-bold text-onyx">
                        Average Latency
                      </th>
                      <th scope="col" className="table-cell text-right font-bold text-onyx">
                        Variance vs Mean
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {delivery.byCategory.map((entry) => (
                      <tr key={entry.category} className="border-b border-peach-deep/30 hover:bg-cream/50 transition-colors">
                        <th scope="row" className="table-cell font-bold text-onyx">
                          {entry.category}
                        </th>
                        <td className="table-cell text-right font-semibold text-brown-soft">
                          {formatNumber(entry.orderCount)}
                        </td>
                        <td className="table-cell text-right font-semibold text-onyx">
                          {formatMinutes(entry.averageDeliveryTime)}
                        </td>
                        <td
                          className={`table-cell text-right font-extrabold ${
                            entry.differenceFromAverage > 0 ? "text-danger" : "text-success"
                          }`}
                        >
                          {formatSignedMinutes(entry.differenceFromAverage)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </AnalysisSection>
          </ScrollReveal>

          {/* Dynamic Insight & Practical Implications (Pillar 5) */}
          <ScrollReveal direction="up" delayMs={250}>
            <InsightPanel title="5. What We Learn From This Result (Operational Implications)">
              {delivery.fastestCategory && delivery.slowestCategory ? (
                <>
                  <p>
                    On average across the active dataset, orders require{" "}
                    <strong className="text-gold-light">{formatMinutes(delivery.overallAverageDeliveryTime)}</strong> to arrive.
                  </p>
                  <p>
                    The fastest category is{" "}
                    <strong className="text-gold-light">{delivery.fastestCategory.category}</strong> at{" "}
                    <strong className="text-gold-light">{formatMinutes(delivery.fastestCategory.averageDeliveryTime)}</strong>,
                    arriving{" "}
                    {formatSignedMinutes(delivery.fastestCategory.differenceFromAverage)} faster than the benchmark.
                    In contrast, the slowest category is{" "}
                    <strong className="text-gold-light">{delivery.slowestCategory.category}</strong> at{" "}
                    <strong className="text-gold-light">{formatMinutes(delivery.slowestCategory.averageDeliveryTime)}</strong>,
                    lagging{" "}
                    {formatSignedMinutes(delivery.slowestCategory.differenceFromAverage)} behind the benchmark.
                  </p>
                  <p>
                    The latency spread between the quickest and slowest category spans{" "}
                    <strong className="text-gold-light">
                      {formatMinutes(
                        delivery.slowestCategory.averageDeliveryTime -
                          delivery.fastestCategory.averageDeliveryTime,
                      )}
                    </strong>
                    . Exactly {formatNumber(delivery.slowerThanAverage.length)} out of{" "}
                    {formatNumber(delivery.byCategory.length)} categories exceed the average delivery threshold.
                  </p>
                  <p>
                    <strong>Actionable Recommendation:</strong> Rather than demanding faster driving speeds from dispatch riders,
                    operations teams should audit the prep stations for {delivery.slowestCategory.category}. Pre-cooking base sauces,
                    optimizing baking queue times, or staging packaging prior to peak hours directly shortens delivery lag.
                  </p>
                </>
              ) : null}
            </InsightPanel>
          </ScrollReveal>

          {/* Methodological Scope & Integrity */}
          <ScrollReveal direction="up" delayMs={280}>
            <CaveatNote>
              A higher average latency in a category indicates an observed statistical difference, not an isolated driver flaw.
              Cooking physics (e.g. oven baking vs ladle plating), container sealing time, dispatch batching, and peak ordering
              hours all compound delivery latency.
            </CaveatNote>
          </ScrollReveal>
        </>
      ) : null}
    </AnalysisPageFrame>
  );
}
