"use client";

import Link from "next/link";
import { Crown, Hash, Percent, UtensilsCrossed } from "lucide-react";
import { AnalysisPageFrame, AnalysisSection } from "@/components/analysis/AnalysisPageFrame";
import { CategoryBarChart, type BarChartPoint } from "@/components/charts/CategoryBarChart";
import { InsightPanel, StatTile } from "@/components/ui/StatTile";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/StateBlocks";
import { useFoodRecords } from "@/hooks/useFoodRecords";
import { formatNumber, formatPercent } from "@/utils/format";

export default function PopularCategoriesPage() {
  const { status, isLoading, error, refresh, popularity } = useFoodRecords();

  // Bars are sorted from most to least ordered, so the first bar is the winner.
  // It is drawn in the strong primary colour to highlight it; the rest stay muted.
  const chartData: BarChartPoint[] = popularity.byCategory.map((entry, index) => ({
    name: entry.category,
    value: entry.value,
    color: index === 0 ? "#C1440E" : "#EDC884",
  }));

  const lowestCategory =
    popularity.byCategory.length > 0
      ? popularity.byCategory[popularity.byCategory.length - 1]
      : null;

  return (
    <AnalysisPageFrame
      title="Popular Food Categories"
      intro="This analysis counts how many orders belong to each food category. It shows which categories
      customers order most often, and what share of all orders each one represents."
      status={status}
    >
      {error ? <ErrorState message={error} onRetry={() => void refresh()} /> : null}
      {!error && isLoading ? <LoadingState label="Counting orders..." /> : null}

      {!error && !isLoading && !popularity.hasData ? (
        <EmptyState
          title="No orders to count"
          message="The active dataset has no usable orders, so popularity cannot be compared between categories."
          action={
            <Link href="/food-data" className="btn-primary">
              Add a food record
            </Link>
          }
        />
      ) : null}

      {!error && !isLoading && popularity.hasData ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatTile
              label="Total orders"
              value={formatNumber(popularity.eligibleOrders)}
              hint="Orders counted in this analysis"
              icon={Hash}
              emptyMessage="No orders to count."
            />
            <StatTile
              label="Most ordered category"
              value={popularity.topCategory ? popularity.topCategory.category : null}
              hint={
                popularity.topCategory
                  ? `${formatNumber(popularity.topCategory.value)} orders`
                  : undefined
              }
              icon={Crown}
              emptyMessage="No category has orders yet."
            />
            <StatTile
              label="Share of the winner"
              value={popularity.topCategory ? formatPercent(popularity.topCategory.share) : null}
              hint="Share of all orders"
              icon={Percent}
              emptyMessage="No share to calculate."
            />
            <StatTile
              label="Least ordered category"
              value={lowestCategory ? lowestCategory.category : null}
              hint={lowestCategory ? `${formatNumber(lowestCategory.value)} orders` : undefined}
              icon={UtensilsCrossed}
              emptyMessage="No category has orders yet."
            />
          </div>

          <AnalysisSection title="Number of orders per food category">
            <CategoryBarChart
              data={chartData}
              valueLabel="Orders"
              formatValue={(value) => formatNumber(value)}
              valueAxisLabel="Number of orders"
            />
            <p className="mt-3 text-xs text-brown-soft">
              The dark orange bar is the most ordered category. Small differences between two bars
              mean the two categories are ordered almost equally often.
            </p>
          </AnalysisSection>

          <AnalysisSection title="How this is calculated">
            <ul className="space-y-2 text-sm leading-relaxed text-brown">
              <li>
                Each order adds 1 to the count of its category — the same result as{" "}
                <code className="rounded bg-cream px-1.5 py-0.5">
                  df[&quot;food_category&quot;].value_counts()
                </code>{" "}
                in Pandas.
              </li>
              <li>
                Percentage share ={" "}
                <code className="rounded bg-cream px-1.5 py-0.5">
                  (orders in a category ÷ total orders) × 100
                </code>
                . Every category&apos;s share added together gives 100%.
              </li>
              <li>
                Calculations only run when the dataset changes — either you add a record yourself or
                you refresh the page.
              </li>
            </ul>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[420px] border-collapse text-left">
                <caption className="sr-only">Number of orders and share of all orders per category</caption>
                <thead>
                  <tr className="border-b border-peach-deep">
                    <th scope="col" className="table-cell font-bold text-brown">
                      Food category
                    </th>
                    <th scope="col" className="table-cell text-right font-bold text-brown">
                      Orders
                    </th>
                    <th scope="col" className="table-cell text-right font-bold text-brown">
                      Percentage share
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {popularity.byCategory.map((entry) => (
                    <tr key={entry.category} className="border-b border-peach-deep/50">
                      <th scope="row" className="table-cell font-bold text-brown">
                        {entry.category}
                      </th>
                      <td className="table-cell text-right text-brown">
                        {formatNumber(entry.value)}
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
                      {formatNumber(popularity.eligibleOrders)}
                    </td>
                    <td className="table-cell text-right font-extrabold text-primary">100.00%</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </AnalysisSection>

          <InsightPanel>
            {popularity.topCategory && lowestCategory ? (
              <>
                <p>
                  Customers order <strong>{popularity.topCategory.category}</strong> more than
                  anything else: <strong>{formatNumber(popularity.topCategory.value)}</strong> orders,
                  or <strong>{formatPercent(popularity.topCategory.share)}</strong> of all{" "}
                  {formatNumber(popularity.eligibleOrders)} orders.
                </p>
                <p>
                  The least ordered category is{" "}
                  <strong>{lowestCategory.category}</strong> with{" "}
                  {formatNumber(lowestCategory.value)} orders (
                  {formatPercent(lowestCategory.share)} of all orders).
                </p>
                <p>
                  Popularity says how often a category is ordered, not how much money it makes. Since{" "}
                  <strong>{popularity.topCategory.category}</strong> is ordered most often, small
                  problems in this category — a slow item, a missing option on the menu — are felt by
                  the largest number of customers.
                </p>
              </>
            ) : null}
          </InsightPanel>
        </>
      ) : null}
    </AnalysisPageFrame>
  );
}
