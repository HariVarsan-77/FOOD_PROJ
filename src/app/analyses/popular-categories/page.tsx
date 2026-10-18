"use client";

import Link from "next/link";
import {
  BarChart3,
  BookOpen,
  Code2,
  Crown,
  Hash,
  HelpCircle,
  Percent,
  UtensilsCrossed,
} from "lucide-react";
import { AnalysisPageFrame, AnalysisSection } from "@/components/analysis/AnalysisPageFrame";
import { CategoryBarChart, type BarChartPoint } from "@/components/charts/CategoryBarChart";
import { InsightPanel, StatTile } from "@/components/ui/StatTile";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/StateBlocks";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useFoodRecords } from "@/hooks/useFoodRecords";
import { formatNumber, formatPercent } from "@/utils/format";

export default function PopularCategoriesPage() {
  const { status, isLoading, error, refresh, popularity } = useFoodRecords();

  // Highlight the winner bar in vibrant primary flame orange; secondary bars in balanced gold tones.
  const chartData: BarChartPoint[] = popularity.byCategory.map((entry, index) => ({
    name: entry.category,
    value: entry.value,
    color: index === 0 ? "#e85d04" : "#d4a017",
  }));

  const lowestCategory =
    popularity.byCategory.length > 0
      ? popularity.byCategory[popularity.byCategory.length - 1]
      : null;

  return (
    <AnalysisPageFrame
      title="Popular Food Categories"
      intro="Evaluates customer order volumes across culinary categories to isolate consumer preferences, quantify demand distribution, and discover which menu items generate the highest operational kitchen throughput."
      categoryTag="Dimension 02 • Customer Demand & Volume"
      status={status}
    >
      {error ? <ErrorState message={error} onRetry={() => void refresh()} /> : null}
      {!error && isLoading ? <LoadingState label="Computing order frequency distributions..." /> : null}

      {!error && !isLoading && !popularity.hasData ? (
        <EmptyState
          title="No orders to evaluate"
          message="The active dataset has no usable records. Add an order record to calculate popularity distribution."
          action={
            <Link href="/food-data" className="btn-primary">
              Add a food record
            </Link>
          }
        />
      ) : null}

      {!error && !isLoading && popularity.hasData ? (
        <>
          {/* Top 4 KPI Tiles with 2.5D depth */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ScrollReveal direction="up" delayMs={50}>
              <StatTile
                label="Total orders"
                value={formatNumber(popularity.eligibleOrders)}
                hint="Analyzed order volume"
                icon={Hash}
                emptyMessage="No orders counted."
              />
            </ScrollReveal>
            <ScrollReveal direction="up" delayMs={100}>
              <StatTile
                label="Most ordered category"
                value={popularity.topCategory ? popularity.topCategory.category : null}
                hint={
                  popularity.topCategory
                    ? `${formatNumber(popularity.topCategory.value)} orders (${formatPercent(popularity.topCategory.share)})`
                    : undefined
                }
                icon={Crown}
                emptyMessage="No category has orders."
              />
            </ScrollReveal>
            <ScrollReveal direction="up" delayMs={150}>
              <StatTile
                label="Winner demand share"
                value={popularity.topCategory ? formatPercent(popularity.topCategory.share) : null}
                hint="Share of entire order stream"
                icon={Percent}
                emptyMessage="No share calculated."
              />
            </ScrollReveal>
            <ScrollReveal direction="up" delayMs={200}>
              <StatTile
                label="Least ordered category"
                value={lowestCategory ? lowestCategory.category : null}
                hint={lowestCategory ? `${formatNumber(lowestCategory.value)} orders` : undefined}
                icon={UtensilsCrossed}
                emptyMessage="No category has orders."
              />
            </ScrollReveal>
          </div>

          {/* 2.5D Dimensional Chart Stage */}
          <ScrollReveal direction="up" delayMs={150}>
            <AnalysisSection
              title="Order Volume by Food Category"
              subtitle="Ordered in descending sequence from most frequently ordered to least"
              badge="Discrete Order Frequency"
            >
              <CategoryBarChart
                data={chartData}
                valueLabel="Orders"
                formatValue={(value) => formatNumber(value)}
                valueAxisLabel="Number of Orders"
                height={420}
              />
              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-peach-deep/30 pt-3 text-xs text-brown-soft">
                <span>The flame-orange bar denotes the top consumer choice; gold bars represent secondary categories.</span>
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
                      <strong>The Variables:</strong> We analyze the categorical distribution of orders across the
                      dataset using the <code className="rounded bg-cream px-1.5 py-0.5 text-xs font-bold text-primary">food_category</code> variable.
                      Each record increments the total transaction count for its respective culinary family.
                    </p>
                    <p>
                      <strong>Why It Matters:</strong> Volume indicates operational velocity. While revenue reveals where money
                      enters the business, order frequency reveals where kitchen labor, packaging materials, and delivery bags
                      are most heavily utilized.
                    </p>
                    <p>
                      A high-frequency category demands rapid assembly line throughput. Any operational hitch or ingredient
                      shortage in this category immediately impacts a large fraction of the customer base.
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
                      <strong>Pandas Calculation:</strong> In Python, this is computed via the categorical frequency method:
                      <br />
                      <code className="mt-1 block rounded bg-onyx px-2.5 py-1 text-xs text-gold-soft font-mono">
                        df[&quot;food_category&quot;].value_counts()
                      </code>
                      Percentage share is derived by dividing category count by total valid records:
                      <br />
                      <code className="mt-1 block rounded bg-onyx px-2.5 py-1 text-xs text-gold-soft font-mono">
                        (df[&quot;food_category&quot;].value_counts(normalize=True) * 100).round(2)
                      </code>
                    </p>
                    <p>
                      <strong>How to Read the Chart:</strong> The horizontal X-axis shows categories ranked from left to
                      right in order of popularity. The vertical Y-axis measures total completed order counts.
                    </p>
                    <p className="text-xs text-brown-soft">
                      Comparing the heights of adjacent bars shows whether customer preference is monopolized by a single
                      dish or evenly split among competing alternatives.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Granular Breakdown Table */}
          <ScrollReveal direction="up" delayMs={220}>
            <AnalysisSection
              title="Order Volume Breakdown"
              subtitle="Order counts and percentage share of customer demand"
            >
              <div className="overflow-x-auto">
                <table className="w-full min-w-[500px] border-collapse text-left">
                  <caption className="sr-only">Number of orders and share of all orders per category</caption>
                  <thead>
                    <tr className="border-b-2 border-peach-deep/60">
                      <th scope="col" className="table-cell font-bold text-onyx">
                        Food Category
                      </th>
                      <th scope="col" className="table-cell text-right font-bold text-onyx">
                        Completed Orders
                      </th>
                      <th scope="col" className="table-cell text-right font-bold text-onyx">
                        Percentage Share
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {popularity.byCategory.map((entry) => (
                      <tr key={entry.category} className="border-b border-peach-deep/30 hover:bg-cream/50 transition-colors">
                        <th scope="row" className="table-cell font-bold text-onyx">
                          {entry.category}
                        </th>
                        <td className="table-cell text-right font-semibold text-onyx">
                          {formatNumber(entry.value)}
                        </td>
                        <td className="table-cell text-right font-semibold text-brown-soft">
                          {formatPercent(entry.share)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-primary/50 bg-cream/40">
                      <th scope="row" className="table-cell font-extrabold text-primary">
                        Total
                      </th>
                      <td className="table-cell text-right font-extrabold text-primary">
                        {formatNumber(popularity.eligibleOrders)}
                      </td>
                      <td className="table-cell text-right font-extrabold text-primary">100.00%</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </AnalysisSection>
          </ScrollReveal>

          {/* Dynamic Insight & Practical Implications (Pillar 5) */}
          <ScrollReveal direction="up" delayMs={250}>
            <InsightPanel title="5. What We Learn From This Result (Operational Implications)">
              {popularity.topCategory && lowestCategory ? (
                <>
                  <p>
                    Out of {formatNumber(popularity.eligibleOrders)} total orders, customers choose{" "}
                    <strong className="text-gold-light">{popularity.topCategory.category}</strong> most frequently:{" "}
                    <strong className="text-gold-light">{formatNumber(popularity.topCategory.value)} orders</strong>, representing{" "}
                    <strong className="text-gold-light">{formatPercent(popularity.topCategory.share)}</strong> of all
                    transactions.
                  </p>
                  <p>
                    In comparison, the lowest volume category is{" "}
                    <strong>{lowestCategory.category}</strong> with {formatNumber(lowestCategory.value)} orders (
                    {formatPercent(lowestCategory.share)}). The spread demonstrates the degree of consumer clustering
                    around favorite comfort foods.
                  </p>
                  <p>
                    <strong>Operational Implication:</strong> High-frequency categories are the brand touchpoints where
                    service consistency matters most. A small prep bottleneck or packaging leak in {popularity.topCategory.category} damages
                    reputation across {formatPercent(popularity.topCategory.share)} of all diners, whereas low-volume categories
                    can serve as niche testing grounds for new menu concepts.
                  </p>
                </>
              ) : null}
            </InsightPanel>
          </ScrollReveal>
        </>
      ) : null}
    </AnalysisPageFrame>
  );
}
