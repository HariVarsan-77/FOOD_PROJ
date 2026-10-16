"use client";

import Link from "next/link";
import { Scale, Star, ThumbsDown, ThumbsUp } from "lucide-react";
import { AnalysisPageFrame, AnalysisSection } from "@/components/analysis/AnalysisPageFrame";
import { CategoryBarChart, type BarChartPoint } from "@/components/charts/CategoryBarChart";
import { CaveatNote, InsightPanel, StatTile } from "@/components/ui/StatTile";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/StateBlocks";
import { useFoodRecords } from "@/hooks/useFoodRecords";
import { formatMinutes, formatNumber, formatRating } from "@/utils/format";

export default function CustomerSatisfactionPage() {
  const { status, isLoading, error, refresh, satisfaction } = useFoodRecords();

  const chartData: BarChartPoint[] = [
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

  return (
    <AnalysisPageFrame
      title="Customer Satisfaction Analysis"
      intro="This analysis splits the orders into two groups — those delivered faster than the overall
      average, and those delivered at the average time or slower — and compares the average customer
      rating of each group."
      status={status}
    >
      {error ? <ErrorState message={error} onRetry={() => void refresh()} /> : null}
      {!error && isLoading ? <LoadingState label="Comparing ratings..." /> : null}

      {!error && !isLoading && !satisfaction.hasData ? (
        <EmptyState
          title="Not enough data to compare"
          message="This comparison needs orders with both a delivery time and a customer rating in each group. The active dataset does not have enough of them yet."
          action={
            <Link href="/food-data" className="btn-primary">
              Add a food record
            </Link>
          }
        />
      ) : null}

      {!error && !isLoading && satisfaction.hasData ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatTile
              label="Faster than average"
              value={formatRating(satisfaction.fasterGroup.averageRating)}
              hint={`${formatNumber(satisfaction.fasterGroup.orderCount)} orders, under ${formatMinutes(satisfaction.overallAverageDeliveryTime)}`}
              icon={ThumbsUp}
              emptyMessage="No faster-than-average orders yet."
            />
            <StatTile
              label="Average or slower"
              value={formatRating(satisfaction.slowerGroup.averageRating)}
              hint={`${formatNumber(satisfaction.slowerGroup.orderCount)} orders, ${formatMinutes(satisfaction.overallAverageDeliveryTime)} or more`}
              icon={ThumbsDown}
              emptyMessage="No average-or-slower orders yet."
            />
            <StatTile
              label="Rating difference"
              value={`${satisfaction.difference >= 0 ? "+" : ""}${satisfaction.difference.toFixed(2)}`}
              hint="Faster group minus slower group"
              icon={Scale}
              emptyMessage="No difference to calculate."
            />
            <StatTile
              label="Orders compared"
              value={formatNumber(satisfaction.eligibleOrders)}
              hint="Orders with both a time and a rating"
              icon={Star}
              emptyMessage="No orders with both values."
            />
          </div>

          <AnalysisSection title="Average rating: faster deliveries vs slower deliveries">
            <CategoryBarChart
              data={chartData}
              valueLabel="Average rating"
              formatValue={(value) => formatRating(value)}
              valueAxisLabel="Average rating (out of 5)"
              valueDomain={[0, 5]}
              height={340}
            />
            <p className="mt-3 text-xs text-brown-soft">
              The vertical axis covers the full rating scale, so a small difference between the two
              bars still means a real difference in the average rating — it is not hidden by a
              shortened axis.
            </p>
          </AnalysisSection>

          <AnalysisSection title="How this is calculated">
            <ul className="space-y-2 text-sm leading-relaxed text-brown">
              <li>
                The overall average delivery time is calculated first (
                {formatMinutes(satisfaction.overallAverageDeliveryTime)} in the current dataset).
              </li>
              <li>
                Orders faster than that value form the &quot;faster than average&quot; group; all
                other orders form the &quot;average or slower&quot; group.
              </li>
              <li>
                The average customer rating of each group is then compared, and the difference is
                the faster group&apos;s rating minus the slower group&apos;s rating.
              </li>
              <li>
                Only orders that have both a delivery time and a rating are used, so an unknown value
                never distorts either group.
              </li>
            </ul>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[420px] border-collapse text-left">
                <caption className="sr-only">
                  Order count and average rating for the fast and slow delivery groups
                </caption>
                <thead>
                  <tr className="border-b border-peach-deep">
                    <th scope="col" className="table-cell font-bold text-brown">
                      Delivery group
                    </th>
                    <th scope="col" className="table-cell text-right font-bold text-brown">
                      Orders
                    </th>
                    <th scope="col" className="table-cell text-right font-bold text-brown">
                      Average rating
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-peach-deep/50">
                    <th scope="row" className="table-cell font-bold text-brown">
                      {satisfaction.fasterGroup.label}
                    </th>
                    <td className="table-cell text-right text-brown-soft">
                      {formatNumber(satisfaction.fasterGroup.orderCount)}
                    </td>
                    <td className="table-cell text-right text-brown">
                      {formatRating(satisfaction.fasterGroup.averageRating)}
                    </td>
                  </tr>
                  <tr className="border-b border-peach-deep/50">
                    <th scope="row" className="table-cell font-bold text-brown">
                      {satisfaction.slowerGroup.label}
                    </th>
                    <td className="table-cell text-right text-brown-soft">
                      {formatNumber(satisfaction.slowerGroup.orderCount)}
                    </td>
                    <td className="table-cell text-right text-brown">
                      {formatRating(satisfaction.slowerGroup.averageRating)}
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-peach-deep">
                    <th scope="row" className="table-cell font-extrabold text-primary">
                      Difference
                    </th>
                    <td className="table-cell text-right font-extrabold text-primary">—</td>
                    <td className="table-cell text-right font-extrabold text-primary">
                      {satisfaction.difference >= 0 ? "+" : ""}
                      {satisfaction.difference.toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </AnalysisSection>

          <InsightPanel>
            <p>
              Orders delivered faster than the average of{" "}
              <strong>{formatMinutes(satisfaction.overallAverageDeliveryTime)}</strong> are rated{" "}
              <strong>{formatRating(satisfaction.fasterGroup.averageRating)}</strong> on average,
              while orders delivered at the average time or slower are rated{" "}
              <strong>{formatRating(satisfaction.slowerGroup.averageRating)}</strong>.
            </p>
            <p>
              The difference is{" "}
              <strong>
                {satisfaction.difference >= 0 ? "+" : ""}
                {satisfaction.difference.toFixed(2)}
              </strong>{" "}
              rating points{" "}
              {satisfaction.difference > 0
                ? "in favour of the faster deliveries."
                : satisfaction.difference < 0
                  ? "in favour of the slower deliveries, which is unusual and worth checking."
                  : "— the two groups are rated the same."}
            </p>
            {satisfaction.difference > 0 ? (
              <p>
                This suggests that delivering an order faster tends to go together with a higher
                customer rating, which is an argument for treating delivery time as part of the
                customer experience rather than only as a cost.
              </p>
            ) : null}
          </InsightPanel>

          <CaveatNote>
            This is an association, not causation. The numbers show that faster orders and higher
            ratings occur together in this dataset; they do not prove that faster delivery causes the
            higher rating. Other things — the food being hot, correct items, a polite delivery
            partner — could explain the same pattern.
          </CaveatNote>
        </>
      ) : null}
    </AnalysisPageFrame>
  );
}
