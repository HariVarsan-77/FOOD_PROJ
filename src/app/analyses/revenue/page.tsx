"use client";

import Link from "next/link";
import { IndianRupee, ShoppingBag, Sparkles, TrendingUp } from "lucide-react";
import { AnalysisPageFrame, AnalysisSection } from "@/components/analysis/AnalysisPageFrame";
import { CategoryBarChart, type BarChartPoint } from "@/components/charts/CategoryBarChart";
import { CaveatNote, InsightPanel, StatTile } from "@/components/ui/StatTile";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/StateBlocks";
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

  return (
    <AnalysisPageFrame
      title="Revenue Analysis"
      intro="This analysis adds up the money each food category earns. It answers two questions a restaurant
      always asks: how much revenue are we making in total, and which food category brings in the most?"
      status={status}
    >
      {error ? <ErrorState message={error} onRetry={() => void refresh()} /> : null}
      {!error && isLoading ? <LoadingState label="Calculating revenue..." /> : null}

      {!error && !isLoading && !revenue.hasData ? (
        <EmptyState
          title="No revenue to calculate"
          message="None of the records in the active dataset have an order value, so total revenue cannot be worked out."
          action={
            <Link href="/food-data" className="btn-primary">
              Add a food record
            </Link>
          }
        />
      ) : null}

      {!error && !isLoading && revenue.hasData ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatTile
              label="Total revenue"
              value={formatCurrency(revenue.totalRevenue)}
              hint={`From ${formatNumber(revenue.eligibleOrders)} orders`}
              icon={IndianRupee}
              emptyMessage="No usable order values."
            />
            <StatTile
              label="Average order value"
              value={formatCurrency(revenue.averageOrderValue)}
              hint="Total revenue ÷ number of orders"
              icon={TrendingUp}
              emptyMessage="No usable order values."
            />
            <StatTile
              label="Top category by revenue"
              value={revenue.topCategory ? revenue.topCategory.category : null}
              hint={
                revenue.topCategory
                  ? `${formatCurrency(revenue.topCategory.value)} of revenue`
                  : undefined
              }
              icon={Sparkles}
              emptyMessage="No category has revenue yet."
            />
            <StatTile
              label="Orders counted"
              value={formatNumber(revenue.eligibleOrders)}
              hint="Orders with a valid order value"
              icon={ShoppingBag}
              emptyMessage="No orders with a valid value."
            />
          </div>

          <AnalysisSection title="Revenue by food category">
            <CategoryBarChart
              data={chartData}
              valueLabel="Revenue"
              formatValue={(value) => formatCurrency(value)}
              formatLabel={(value) => `₹${Math.round(value).toLocaleString("en-IN")}`}
              valueAxisLabel="Revenue (INR)"
            />
            <p className="mt-3 text-xs text-brown-soft">
              Bars are ordered from the highest earning category on the left to the lowest on the
              right. Hover or tap a bar to see the exact amount.
            </p>
          </AnalysisSection>

          <AnalysisSection title="How this is calculated">
            <ul className="space-y-2 text-sm leading-relaxed text-brown">
              <li>
                Rows without an order value are dropped first, so a missing price never counts as
                zero revenue.
              </li>
              <li>
                Total revenue = the order value of every remaining order added together.
              </li>
              <li>
                Revenue per category = the order values of that category added together — the same
                result as <code className="rounded bg-cream px-1.5 py-0.5">groupby(&quot;food_category&quot;)[&quot;order_value&quot;].sum()</code> in
                Pandas.
              </li>
              <li>
                Average order value = total revenue ÷ number of orders with a valid value.
              </li>
            </ul>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[420px] border-collapse text-left">
                <caption className="sr-only">Revenue and share of total revenue per category</caption>
                <thead>
                  <tr className="border-b border-peach-deep">
                    <th scope="col" className="table-cell font-bold text-brown">
                      Food category
                    </th>
                    <th scope="col" className="table-cell text-right font-bold text-brown">
                      Revenue
                    </th>
                    <th scope="col" className="table-cell text-right font-bold text-brown">
                      Share of total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {revenue.byCategory.map((entry) => (
                    <tr key={entry.category} className="border-b border-peach-deep/50">
                      <th scope="row" className="table-cell font-bold text-brown">
                        {entry.category}
                      </th>
                      <td className="table-cell text-right text-brown">
                        {formatCurrency(entry.value)}
                      </td>
                      <td className="table-cell text-right text-brown-soft">
                        {formatPercent(entry.share)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-peach-deep">
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

          <InsightPanel>
            {revenue.topCategory ? (
              <>
                <p>
                  The dataset earns <strong>{formatCurrency(revenue.totalRevenue)}</strong> in
                  total, at an average of{" "}
                  <strong>{formatCurrency(revenue.averageOrderValue)}</strong> per order.
                </p>
                <p>
                  <strong>{revenue.topCategory.category}</strong> earns the most with{" "}
                  <strong>{formatCurrency(revenue.topCategory.value)}</strong>, which is{" "}
                  <strong>{formatPercent(revenue.topCategory.share)}</strong> of all revenue. The
                  lowest earning category in the list is{" "}
                  <strong>{revenue.byCategory[revenue.byCategory.length - 1].category}</strong> with{" "}
                  {formatCurrency(revenue.byCategory[revenue.byCategory.length - 1].value)}.
                </p>
                <p>
                  The gap between the first and last bar shows how unevenly the revenue is spread
                  across categories. Category{" "}
                  <strong>{revenue.topCategory.category}</strong> is where a small menu change,
                  a promotion or a price adjustment has the largest effect on total revenue.
                </p>
              </>
            ) : null}
          </InsightPanel>

          <CaveatNote>
            This dataset has no cancellation, refund or discount field, so every order value is
            treated as a completed sale. If you later store cancelled orders, filter them out before
            comparing categories.
          </CaveatNote>
        </>
      ) : null}
    </AnalysisPageFrame>
  );
}
