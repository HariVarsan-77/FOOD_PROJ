"use client";

import Link from "next/link";
import {
  BarChart3,
  BookOpen,
  Code2,
  HelpCircle,
  IndianRupee,
  Lightbulb,
  ShoppingBag,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { AnalysisPageFrame, AnalysisSection } from "@/components/analysis/AnalysisPageFrame";
import { CategoryBarChart, type BarChartPoint } from "@/components/charts/CategoryBarChart";
import { getFoodIllustration } from "@/components/illustrations/foodRegistry";
import { CaveatNote, InsightPanel, StatTile } from "@/components/ui/StatTile";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/StateBlocks";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getCategoryColor } from "@/data/categories";
import { useFoodRecords } from "@/hooks/useFoodRecords";
import { formatCurrency, formatNumber, formatPercent } from "@/utils/format";

export default function RevenueAnalysisPage() {
  const { status, isLoading, error, refresh, revenue } = useFoodRecords();

  const chartData: BarChartPoint[] = revenue.byCategory.map((entry) => ({
    name: entry.category,
    value: entry.value,
    color: getCategoryColor(entry.category),
  }));

  const lowestCategory =
    revenue.byCategory.length > 0 ? revenue.byCategory[revenue.byCategory.length - 1] : null;

  return (
    <AnalysisPageFrame
      title="Revenue Analysis"
      intro="Aggregates cumulative sales volume across culinary categories to isolate revenue anchors, assess menu monetization, and determine where pricing adjustments have the largest financial impact."
      categoryTag="Dimension 01 • Financial Performance"
      status={status}
    >
      {error ? <ErrorState message={error} onRetry={() => void refresh()} /> : null}
      {!error && isLoading ? <LoadingState label="Aggregating financial metrics..." /> : null}

      {!error && !isLoading && !revenue.hasData ? (
        <EmptyState
          title="No revenue data available"
          message="None of the records in the active dataset contain a positive order value. Add an order record to calculate revenue distribution."
          action={
            <Link href="/food-data" className="btn-primary">
              Add a food record
            </Link>
          }
        />
      ) : null}

      {!error && !isLoading && revenue.hasData ? (
        <>
          {/* Top 4 KPI Tiles with 2.5D elevation */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ScrollReveal direction="up" delayMs={50}>
              <StatTile
                label="Total revenue"
                value={formatCurrency(revenue.totalRevenue)}
                hint={`Across ${formatNumber(revenue.eligibleOrders)} valid orders`}
                icon={IndianRupee}
                emptyMessage="No valid order values."
              />
            </ScrollReveal>
            <ScrollReveal direction="up" delayMs={100}>
              <StatTile
                label="Average order value"
                value={formatCurrency(revenue.averageOrderValue)}
                hint="Total revenue ÷ eligible orders"
                icon={TrendingUp}
                emptyMessage="No valid order values."
              />
            </ScrollReveal>
            <ScrollReveal direction="up" delayMs={150}>
              <StatTile
                label="Primary revenue driver"
                value={revenue.topCategory ? revenue.topCategory.category : null}
                hint={
                  revenue.topCategory
                    ? `${formatCurrency(revenue.topCategory.value)} (${formatPercent(revenue.topCategory.share)})`
                    : undefined
                }
                icon={getFoodIllustration(revenue.topCategory?.category)}
                emptyMessage="No category has revenue."
              />
            </ScrollReveal>
            <ScrollReveal direction="up" delayMs={200}>
              <StatTile
                label="Eligible orders"
                value={formatNumber(revenue.eligibleOrders)}
                hint="Records with order value > 0"
                icon={ShoppingBag}
                emptyMessage="No orders with valid value."
              />
            </ScrollReveal>
          </div>

          {/* 2.5D Dimensional Chart Stage */}
          <ScrollReveal direction="up" delayMs={150}>
            <AnalysisSection
              title="Revenue Distribution by Food Category"
              subtitle="Ordered in descending sequence from highest earning category to lowest"
              badge="Cumulative INR Sums"
            >
              <CategoryBarChart
                data={chartData}
                valueLabel="Revenue"
                formatValue={(value) => formatCurrency(value)}
                formatLabel={(value) => `₹${Math.round(value).toLocaleString("en-IN")}`}
                valueAxisLabel="Revenue (INR)"
                height={420}
              />
              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-peach-deep/30 pt-3 text-xs text-brown-soft">
                <span>Interactive: Hover over or tap any cylindrical bar for detailed rupee figures.</span>
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
                      <strong>The Variables:</strong> We examine two primary fields from each order:{" "}
                      <code className="rounded bg-cream px-1.5 py-0.5 text-xs font-bold text-primary">food_category</code>{" "}
                      (the categorical segment of the meal) and{" "}
                      <code className="rounded bg-cream px-1.5 py-0.5 text-xs font-bold text-primary">order_value</code>{" "}
                      (the final invoiced rupee amount).
                    </p>
                    <p>
                      <strong>Why It Matters:</strong> Total top-line revenue provides the operational foundation
                      for restaurant viability. However, relying on overall revenue alone conceals whether a business
                      is dangerously dependent on a single dish type or if cash flow is evenly diversified across categories.
                    </p>
                    <p>
                      Categorical revenue analysis identifies the <em>economic anchors</em> of the kitchen—dishes where
                      a minor 5% price adjustment or a 2% ingredient cost inflation causes substantial bottom-line variance.
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
                      <strong>Pandas Calculation:</strong> Records without an order value or with non-positive values
                      are filtered out first: <code className="rounded bg-cream px-1.5 py-0.5 text-xs">df[df[&quot;order_value&quot;] &gt; 0]</code>.
                      We then execute a grouped sum aggregation:
                      <br />
                      <code className="mt-1 block rounded bg-onyx px-2.5 py-1 text-xs text-gold-soft font-mono">
                        df.groupby(&quot;food_category&quot;)[&quot;order_value&quot;].sum().sort_values(ascending=False)
                      </code>
                    </p>
                    <p>
                      <strong>How to Read the Chart:</strong> Categories are sorted along the horizontal X-axis from
                      highest revenue on the left to lowest on the right. The vertical height of each 2.5D bar denotes
                      cumulative sales in Indian Rupees (₹).
                    </p>
                    <p className="text-xs text-brown-soft">
                      The steepness of the drop-off from the leftmost bar to the rightmost bar illustrates the degree
                      of revenue concentration across the menu.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Granular Breakdown Table */}
          <ScrollReveal direction="up" delayMs={220}>
            <AnalysisSection
              title="Category Revenue Breakdown"
              subtitle="Absolute sales and percentage share of total revenue"
            >
              <div className="overflow-x-auto">
                <table className="w-full min-w-[500px] border-collapse text-left">
                  <caption className="sr-only">Revenue and share of total revenue per category</caption>
                  <thead>
                    <tr className="border-b-2 border-peach-deep/60">
                      <th scope="col" className="table-cell font-bold text-onyx">
                        Food Category
                      </th>
                      <th scope="col" className="table-cell text-right font-bold text-onyx">
                        Cumulative Revenue
                      </th>
                      <th scope="col" className="table-cell text-right font-bold text-onyx">
                        Share of Total Sales
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {revenue.byCategory.map((entry) => (
                      <tr key={entry.category} className="border-b border-peach-deep/30 hover:bg-cream/50 transition-colors">
                        <th scope="row" className="table-cell font-bold text-onyx">
                          {entry.category}
                        </th>
                        <td className="table-cell text-right font-semibold text-onyx">
                          {formatCurrency(entry.value)}
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
                        {formatCurrency(revenue.totalRevenue)}
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
              {revenue.topCategory && lowestCategory ? (
                <>
                  <p>
                    The active order stream generates a total of{" "}
                    <strong className="text-gold-light">{formatCurrency(revenue.totalRevenue)}</strong> across{" "}
                    {formatNumber(revenue.eligibleOrders)} valid orders, yielding a platform-wide average order value (AOV) of{" "}
                    <strong className="text-gold-light">{formatCurrency(revenue.averageOrderValue)}</strong>.
                  </p>
                  <p>
                    The primary financial driver is{" "}
                    <strong className="text-gold-light">{revenue.topCategory.category}</strong>, contributing{" "}
                    <strong className="text-gold-light">{formatCurrency(revenue.topCategory.value)}</strong>, which
                    accounts for <strong className="text-gold-light">{formatPercent(revenue.topCategory.share)}</strong> of
                    all culinary revenue. Conversely, the lowest-earning segment is{" "}
                    <strong>{lowestCategory.category}</strong> with {formatCurrency(lowestCategory.value)} (
                    {formatPercent(lowestCategory.share)}).
                  </p>
                  <p>
                    <strong>Strategic Takeaway:</strong> Because {revenue.topCategory.category} represents such a substantial
                    proportion of gross turnover, kitchen procurement, supply agreements, and staffing should prioritize
                    uninterrupted availability for this category. Even a marginal 5% expansion in {revenue.topCategory.category} sales
                    yields substantially more net income than doubling the sales of lower-earning categories.
                  </p>
                </>
              ) : null}
            </InsightPanel>
          </ScrollReveal>

          {/* Methodological Scope & Integrity */}
          <ScrollReveal direction="up" delayMs={280}>
            <CaveatNote>
              This dataset records gross bill totals without explicit cancellation, promotional discount code,
              or customer refund columns. Consequently, all valid values are treated as completed transactions.
              In a commercial enterprise deployment, net realized revenue would be computed by subtracting refunds,
              commissions, and coupon discounts from this gross aggregate.
            </CaveatNote>
          </ScrollReveal>
        </>
      ) : null}
    </AnalysisPageFrame>
  );
}
