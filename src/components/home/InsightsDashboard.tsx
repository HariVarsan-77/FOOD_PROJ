"use client";

import Link from "next/link";
import { ArrowRight, ListChecks, ShoppingBag, Star, Timer, Wallet } from "lucide-react";
import { MiniBarPreview } from "@/components/charts/MiniBarPreview";
import { DataSourceNotice } from "@/components/ui/DataSourceBadge";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/StateBlocks";
import { StatTile } from "@/components/ui/StatTile";
import { ANALYSIS_LIST } from "@/data/analysisMeta";
import { useFoodRecords } from "@/hooks/useFoodRecords";
import { formatCurrency, formatMinutes, formatNumber, formatRating } from "@/utils/format";

/**
 * The "Business Insights Dashboard": four analysis cards, the headline numbers
 * of the active dataset and the demo / live database indicator.
 *
 * Every number below comes from `useFoodRecords()`, which recalculates from the
 * records currently loaded. Nothing is hardcoded, so adding a record on the
 * Food Data page immediately changes these tiles.
 */
export function InsightsDashboard() {
  const { status, isLoading, error, refresh, summary, sampleCount, userCount } = useFoodRecords();

  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-primary sm:text-3xl">
            Business Insights Dashboard
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-brown-soft">
            Four simple analyses that turn the order data into decisions a restaurant can act on.
          </p>
        </div>
        <Link href="/food-data" className="btn-ghost">
          <ListChecks className="h-4 w-4" aria-hidden="true" />
          Manage food data
        </Link>
      </div>

      {error ? (
        <div className="mt-6">
          <ErrorState message={error} onRetry={() => void refresh()} />
        </div>
      ) : null}

      {!error && isLoading ? (
        <div className="mt-6">
          <LoadingState label="Calculating insights..." />
        </div>
      ) : null}

      {!error && !isLoading ? (
        <>
          {/* The four analysis cards */}
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ANALYSIS_LIST.map((analysis) => {
              const Icon = analysis.icon;

              return (
                <article
                  key={analysis.slug}
                  className="panel flex flex-col justify-between transition duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
                >
                  <div>
                    <span
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl ${analysis.iconClass}`}
                    >
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 font-display text-lg leading-tight font-bold text-brown">
                      {analysis.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-brown-soft">{analysis.summary}</p>
                  </div>

                  <div className="mt-4 rounded-2xl border border-peach-deep/60 bg-cream px-4 py-3">
                    <MiniBarPreview
                      variant={analysis.previewVariant}
                      className="h-12 w-full"
                    />
                  </div>

                  <Link href={analysis.href} className="btn-primary mt-5 w-full">
                    Explore Analysis
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </article>
              );
            })}
          </div>

          {/* Headline numbers of the active dataset */}
          <div className="mt-10">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <h3 className="font-display text-xl font-extrabold text-brown">
                Dataset summary
              </h3>
              <p className="text-xs text-brown-soft">
                {formatNumber(sampleCount)} sample records + {formatNumber(userCount)} record
                {userCount === 1 ? "" : "s"} you added
              </p>
            </div>

            {summary.validOrders === 0 ? (
              <div className="mt-4">
                <EmptyState
                  title="No records to summarise yet"
                  message="The active dataset has no usable orders. Add a food record to see the revenue, delivery time and rating totals calculated here."
                  action={
                    <Link href="/food-data" className="btn-primary">
                      Add a food record
                    </Link>
                  }
                />
              </div>
            ) : (
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatTile
                  label="Valid orders"
                  value={formatNumber(summary.validOrders)}
                  hint="Orders with a usable order value"
                  icon={ShoppingBag}
                  emptyMessage="No valid orders in this dataset."
                />
                <StatTile
                  label="Total revenue"
                  value={summary.totalRevenue === null ? null : formatCurrency(summary.totalRevenue)}
                  hint={
                    summary.totalRevenue === null
                      ? undefined
                      : `Average order ${formatCurrency(summary.totalRevenue / summary.validOrders)}`
                  }
                  icon={Wallet}
                  emptyMessage="Order values are missing, so revenue cannot be calculated."
                />
                <StatTile
                  label="Average delivery time"
                  value={
                    summary.averageDeliveryTime === null
                      ? null
                      : formatMinutes(summary.averageDeliveryTime)
                  }
                  hint="Across every category"
                  icon={Timer}
                  emptyMessage="Delivery times are missing in this dataset."
                />
                <StatTile
                  label="Average customer rating"
                  value={summary.averageRating === null ? null : formatRating(summary.averageRating)}
                  hint="Out of 5.00"
                  icon={Star}
                  emptyMessage="Ratings are missing in this dataset."
                />
              </div>
            )}
          </div>

          {/* Demo vs live database indicator */}
          <div className="mt-8">
            <DataSourceNotice status={status} />
          </div>
        </>
      ) : null}
    </section>
  );
}
