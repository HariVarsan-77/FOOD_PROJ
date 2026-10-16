"use client";

import Link from "next/link";
import { Gauge, Rabbit, Snail, Timer } from "lucide-react";
import { AnalysisPageFrame, AnalysisSection } from "@/components/analysis/AnalysisPageFrame";
import { CategoryBarChart, type BarChartPoint } from "@/components/charts/CategoryBarChart";
import { CaveatNote, InsightPanel, StatTile } from "@/components/ui/StatTile";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/StateBlocks";
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
      intro="This analysis compares the average delivery time of each food category with the overall
      average. It shows which categories reach customers faster, which take longer, and by how many
      minutes they differ from the average."
      status={status}
    >
      {error ? <ErrorState message={error} onRetry={() => void refresh()} /> : null}
      {!error && isLoading ? <LoadingState label="Calculating delivery times..." /> : null}

      {!error && !isLoading && !delivery.hasData ? (
        <EmptyState
          title="No delivery times to compare"
          message="The active dataset has no usable delivery times, so delivery efficiency cannot be calculated."
          action={
            <Link href="/food-data" className="btn-primary">
              Add a food record
            </Link>
          }
        />
      ) : null}

      {!error && !isLoading && delivery.hasData ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatTile
              label="Overall average delivery time"
              value={formatMinutes(delivery.overallAverageDeliveryTime)}
              hint={`Across ${formatNumber(delivery.eligibleOrders)} orders`}
              icon={Gauge}
              emptyMessage="No delivery times available."
            />
            <StatTile
              label="Fastest category"
              value={delivery.fastestCategory ? delivery.fastestCategory.category : null}
              hint={
                delivery.fastestCategory
                  ? `${formatMinutes(delivery.fastestCategory.averageDeliveryTime)} (${formatSignedMinutes(delivery.fastestCategory.differenceFromAverage)} vs average)`
                  : undefined
              }
              icon={Rabbit}
              emptyMessage="No category has delivery times."
            />
            <StatTile
              label="Slowest category"
              value={delivery.slowestCategory ? delivery.slowestCategory.category : null}
              hint={
                delivery.slowestCategory
                  ? `${formatMinutes(delivery.slowestCategory.averageDeliveryTime)} (${formatSignedMinutes(delivery.slowestCategory.differenceFromAverage)} vs average)`
                  : undefined
              }
              icon={Snail}
              emptyMessage="No category has delivery times."
            />
            <StatTile
              label="Categories slower than average"
              value={formatNumber(delivery.slowerThanAverage.length)}
              hint="The rest are faster than average"
              icon={Timer}
              emptyMessage="No categories to compare."
            />
          </div>

          <AnalysisSection title="Average delivery time per food category">
            <CategoryBarChart
              data={chartData}
              valueLabel="Average delivery time"
              formatValue={(value) => formatMinutes(value)}
              formatLabel={(value) => `${value.toFixed(1)}m`}
              valueAxisLabel="Minutes"
              referenceValue={delivery.overallAverageDeliveryTime}
              referenceLabel={`Average ${delivery.overallAverageDeliveryTime.toFixed(1)} min`}
            />
            <p className="mt-3 text-xs text-brown-soft">
              The dashed line marks the overall average delivery time. A bar above the line means that
              category is slower than the dataset average; a bar below it means faster.
            </p>
          </AnalysisSection>

          <AnalysisSection title="How this is calculated">
            <ul className="space-y-2 text-sm leading-relaxed text-brown">
              <li>
                Orders with a missing delivery time are removed before averaging, so an unknown time
                never pulls the average down.
              </li>
              <li>
                Average delivery time per category = the delivery times of that category added
                together ÷ how many orders it has — the same result as{" "}
                <code className="rounded bg-cream px-1.5 py-0.5">
                  groupby(&quot;food_category&quot;)[&quot;delivery_time&quot;].mean()
                </code>{" "}
                in Pandas.
              </li>
              <li>
                The overall average is the mean delivery time of every remaining order, and the
                dashed line on the chart.
              </li>
              <li>
                Difference from average = category average − overall average. A negative number means
                faster; a positive number means slower.
              </li>
            </ul>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[520px] border-collapse text-left">
                <caption className="sr-only">
                  Average delivery time and difference from the overall average per category
                </caption>
                <thead>
                  <tr className="border-b border-peach-deep">
                    <th scope="col" className="table-cell font-bold text-brown">
                      Food category
                    </th>
                    <th scope="col" className="table-cell text-right font-bold text-brown">
                      Orders
                    </th>
                    <th scope="col" className="table-cell text-right font-bold text-brown">
                      Average delivery time
                    </th>
                    <th scope="col" className="table-cell text-right font-bold text-brown">
                      Difference from average
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {delivery.byCategory.map((entry) => (
                    <tr key={entry.category} className="border-b border-peach-deep/50">
                      <th scope="row" className="table-cell font-bold text-brown">
                        {entry.category}
                      </th>
                      <td className="table-cell text-right text-brown-soft">
                        {formatNumber(entry.orderCount)}
                      </td>
                      <td className="table-cell text-right text-brown">
                        {formatMinutes(entry.averageDeliveryTime)}
                      </td>
                      <td
                        className={`table-cell text-right font-bold ${
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

          <InsightPanel>
            {delivery.fastestCategory && delivery.slowestCategory ? (
              <>
                <p>
                  On average an order arrives in{" "}
                  <strong>{formatMinutes(delivery.overallAverageDeliveryTime)}</strong>.
                </p>
                <p>
                  <strong>{delivery.fastestCategory.category}</strong> is the fastest category at{" "}
                  <strong>{formatMinutes(delivery.fastestCategory.averageDeliveryTime)}</strong>,{" "}
                  {formatSignedMinutes(delivery.fastestCategory.differenceFromAverage)} against the
                  overall average. <strong>{delivery.slowestCategory.category}</strong> is the
                  slowest at{" "}
                  <strong>{formatMinutes(delivery.slowestCategory.averageDeliveryTime)}</strong>,{" "}
                  {formatSignedMinutes(delivery.slowestCategory.differenceFromAverage)} against the
                  average.
                </p>
                <p>
                  The difference between the fastest and the slowest category is{" "}
                  <strong>
                    {formatMinutes(
                      delivery.slowestCategory.averageDeliveryTime -
                        delivery.fastestCategory.averageDeliveryTime,
                    )}
                  </strong>
                  . The slower categories are the ones worth looking at first when trying to speed up
                  deliveries.
                </p>
              </>
            ) : null}
          </InsightPanel>

          <CaveatNote>
            A slower average in one category does not prove the category itself causes the delay.
            Preparation complexity, distance, time of day or how busy the kitchen was all influence
            delivery time. Treat the slower categories as places to investigate, not as the proven
            cause of late deliveries.
          </CaveatNote>
        </>
      ) : null}
    </AnalysisPageFrame>
  );
}
