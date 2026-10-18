"use client";

import Link from "next/link";
import {
  ArrowRight,
  Database,
  Layers,
  ListChecks,
  ShoppingBag,
  Star,
  Timer,
  Wallet,
  Sparkles,
} from "lucide-react";
import { MiniBarPreview } from "@/components/charts/MiniBarPreview";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/StateBlocks";
import { StatTile } from "@/components/ui/StatTile";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ANALYSIS_LIST } from "@/data/analysisMeta";
import { useFoodRecords } from "@/hooks/useFoodRecords";
import { formatCurrency, formatMinutes, formatNumber, formatRating } from "@/utils/format";

/**
 * 2.5D Executive Insights Dashboard.
 * Presents dataset KPIs, four core analytical modules, and live dynamic summaries.
 * Redundant database banners have been replaced with a discreet, professional telemetry bar.
 */
export function InsightsDashboard() {
  const { status, isLoading, error, refresh, summary, sampleCount, userCount } = useFoodRecords();

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <ScrollReveal direction="up">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Real-Time Intelligence</span>
            </div>
            <h2 className="mt-1 font-display text-2xl font-extrabold text-onyx sm:text-3xl lg:text-4xl">
              Executive Insights Dashboard
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-brown-soft sm:text-base">
              Four analytical dimensions that transform order streams into operational decisions.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <Link href="/final-analysis" className="btn-secondary">
              <Layers className="h-4 w-4" aria-hidden="true" />
              <span>Full Synthesis</span>
            </Link>
            <Link href="/food-data" className="btn-ghost">
              <ListChecks className="h-4 w-4" aria-hidden="true" />
              <span>Manage Data</span>
            </Link>
          </div>
        </div>
      </ScrollReveal>

      {error ? (
        <div className="mt-6">
          <ErrorState message={error} onRetry={() => void refresh()} />
        </div>
      ) : null}

      {!error && isLoading ? (
        <div className="mt-6">
          <LoadingState label="Calculating real-time analytics..." />
        </div>
      ) : null}

      {!error && !isLoading ? (
        <>
          {/* Active Dataset Headline KPI Numbers */}
          <div className="mt-8">
            <ScrollReveal direction="up" delayMs={50}>
              <div className="flex flex-wrap items-end justify-between gap-3 border-b border-peach-deep/30 pb-3">
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4 text-primary" />
                  <h3 className="font-display text-lg font-bold text-onyx sm:text-xl">
                    Active Dataset Telemetry
                  </h3>
                </div>
                <p className="text-xs font-semibold text-brown-soft">
                  {formatNumber(sampleCount)} baseline sample records + {formatNumber(userCount)} record
                  {userCount === 1 ? "" : "s"} added
                </p>
              </div>
            </ScrollReveal>

            {summary.validOrders === 0 ? (
              <div className="mt-4">
                <EmptyState
                  title="No records to summarise yet"
                  message="The active dataset has no usable orders. Add a food record to see revenue, delivery time, and rating totals calculated dynamically."
                  action={
                    <Link href="/food-data" className="btn-primary">
                      Add a food record
                    </Link>
                  }
                />
              </div>
            ) : (
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <ScrollReveal direction="up" delayMs={100}>
                  <StatTile
                    label="Valid orders"
                    value={formatNumber(summary.validOrders)}
                    hint="Eligible for analytical calculation"
                    icon={ShoppingBag}
                    emptyMessage="No valid orders in dataset."
                  />
                </ScrollReveal>
                <ScrollReveal direction="up" delayMs={150}>
                  <StatTile
                    label="Total revenue"
                    value={
                      summary.totalRevenue === null ? null : formatCurrency(summary.totalRevenue)
                    }
                    hint={
                      summary.totalRevenue === null
                        ? undefined
                        : `Avg ticket ${formatCurrency(summary.totalRevenue / summary.validOrders)}`
                    }
                    icon={Wallet}
                    emptyMessage="Order values missing in dataset."
                  />
                </ScrollReveal>
                <ScrollReveal direction="up" delayMs={200}>
                  <StatTile
                    label="Average delivery time"
                    value={
                      summary.averageDeliveryTime === null
                        ? null
                        : formatMinutes(summary.averageDeliveryTime)
                    }
                    hint="Benchmark across all categories"
                    icon={Timer}
                    emptyMessage="Delivery times missing in dataset."
                  />
                </ScrollReveal>
                <ScrollReveal direction="up" delayMs={250}>
                  <StatTile
                    label="Average customer rating"
                    value={
                      summary.averageRating === null ? null : formatRating(summary.averageRating)
                    }
                    hint="Out of 5.00 customer stars"
                    icon={Star}
                    emptyMessage="Ratings missing in dataset."
                  />
                </ScrollReveal>
              </div>
            )}
          </div>

          {/* The Four Analytical Deep Dive Cards */}
          <div className="mt-12">
            <ScrollReveal direction="up" delayMs={100}>
              <div className="mb-6">
                <h3 className="font-display text-xl font-extrabold text-onyx sm:text-2xl">
                  Analytical Deep Dives
                </h3>
                <p className="mt-1 text-xs text-brown-soft sm:text-sm">
                  Click any module to inspect methodology, Pandas calculations, and dimensional charts.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {ANALYSIS_LIST.map((analysis, index) => {
                const Icon = analysis.icon;

                return (
                  <ScrollReveal
                    key={analysis.slug}
                    direction="up"
                    delayMs={120 + index * 60}
                    className="h-full"
                  >
                    <article
                      className="group flex h-full flex-col justify-between rounded-3xl p-6 transition-all duration-300 hover:-translate-y-2"
                      style={{
                        background:
                          "linear-gradient(155deg, #ffffff 0%, #fffbf2 50%, #fef3dc 100%)",
                        border: "1.5px solid rgba(212, 160, 23, 0.35)",
                        boxShadow:
                          "0 4px 14px -3px rgba(13, 10, 6, 0.06), 0 16px 32px -8px rgba(13, 10, 6, 0.08), inset 0 1px 0 rgba(255, 255, 255, 1)",
                      }}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span
                            className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-105 ${analysis.iconClass}`}
                            style={{
                              boxShadow: "0 2px 8px -2px rgba(0,0,0,0.1)",
                            }}
                          >
                            <Icon className="h-6 w-6" aria-hidden="true" />
                          </span>
                          <span className="text-[11px] font-extrabold uppercase tracking-widest text-primary/80">
                            0{index + 1}
                          </span>
                        </div>

                        <h4 className="mt-4 font-display text-lg font-bold leading-tight text-onyx group-hover:text-primary transition-colors">
                          {analysis.title}
                        </h4>
                        <p className="mt-2 text-xs leading-relaxed text-brown-soft">
                          {analysis.summary}
                        </p>
                      </div>

                      <div className="mt-5">
                        {/* 2.5D Mini Chart Preview Stage */}
                        <div
                          className="rounded-2xl p-3.5 transition-transform duration-300 group-hover:scale-[1.02]"
                          style={{
                            background:
                              "linear-gradient(145deg, #24170b 0%, #120c06 100%)",
                            border: "1px solid rgba(212, 160, 23, 0.35)",
                            boxShadow:
                              "inset 0 1px 3px rgba(0,0,0,0.6), 0 4px 12px rgba(0,0,0,0.2)",
                          }}
                        >
                          <MiniBarPreview
                            variant={analysis.previewVariant}
                            className="h-12 w-full"
                          />
                        </div>

                        <Link
                          href={analysis.href}
                          className="btn-primary mt-4.5 w-full text-xs font-bold"
                        >
                          <span>Explore Analysis</span>
                          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                        </Link>
                      </div>
                    </article>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>

          {/* Discreet telemetry footnote */}
          <ScrollReveal direction="up" delayMs={200}>
            <div
              className="mt-12 flex flex-wrap items-center justify-between gap-3 rounded-2xl px-5 py-3.5 text-xs"
              style={{
                background: "linear-gradient(145deg, #fffcf5 0%, #fff7eb 100%)",
                border: "1px solid rgba(212, 160, 23, 0.25)",
              }}
            >
              <div className="flex items-center gap-2 text-brown-soft">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="font-semibold text-onyx">Continuous Recalculation Engine:</span>
                <span>Active ({status.label})</span>
              </div>
              <Link
                href="/food-data"
                className="font-bold text-primary hover:underline"
              >
                Insert custom order data →
              </Link>
            </div>
          </ScrollReveal>
        </>
      ) : null}
    </section>
  );
}
